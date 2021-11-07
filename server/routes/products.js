const _ = require("lodash");
const express = require("express");
const multer = require("multer");
const path = require("path");

const { Product, validate } = require("../models/product");
const validateObjectId = require("../middlewares/validateObjectId");

var storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "public/uploads/productImages");
  },
  filename: function (_req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
// 5,000,000 = 5mb
var upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("productImages");

function checkFileType(file, cb) {
  // Allowed extensions
  const fileTypes = /jpeg|jpg|png|gif/;
  // Check extension
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) return cb(null, true);
  return cb("Error: Images only!");
}

const router = express.Router();

router.get("/", async (_req, res) => {
  const products = await Product.find().sort({ date: -1 });

  return res.send(products);
});

router.get("/:id", validateObjectId, async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).send("The product with the given ID was not found!");

  res.send(product);
});

router.post("/", async (req, res) => {
  // upload product image
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    // validate req.body.product
    const { error } = validate(JSON.parse(req.body.product));
    if (error) return res.status(400).send(error.details[0].message);

    const { title, description, category } = JSON.parse(req.body.product);
    const images = req.file.filename;

    // saving the product
    const product = new Product({
      title,
      description,
      category,
      images,
    });

    await product.save();

    return res.status(200).send(product);
  });
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const checkProduct = await Product.findById(req.body.productId);
  if (!checkProduct) return res.status(400).send("Invalid product.");

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
    },
    {
      new: true,
    }
  );

  if (!product)
    return res.status(404).send("The product with the given ID was not found!");

  res.send(product);
});

router.delete("/:id", async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product)
    return res.status(404).send("The product with the given ID was not found!");

  res.send(product);
});

module.exports = router;
