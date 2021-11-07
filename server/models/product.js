const Joi = require("joi");
const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 250,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 50,
      maxlength: 1000,
    },
    category: {
      type: String,
      required: true,
    },
    images: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  })
);

function validateProduct(product) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(250).required(),
    description: Joi.string().min(50).max(1000).required(),
    category: Joi.string().required(),
  });

  return schema.validate(product);
}

exports.Product = Product;
exports.validate = validateProduct;
