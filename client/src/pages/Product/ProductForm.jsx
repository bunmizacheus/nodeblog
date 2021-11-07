import React from "react";
import { default as Container } from "components/Container/Container";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import NavBar from "components/NavBar/NavBar";
import {
  TextField,
  MenuItem,
  FormControl,
  Stack,
  Select,
  Button,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { toast } from "react-toastify";
import { saveProduct } from "helpers/product.helper";

const Input = styled("input")({
  display: "none",
});

const ProductSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Too Short!")
    .max(250, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(50, "Too Short!")
    .max(1000, "Too Long!")
    .required("Required"),
  category: Yup.string().required("Required"),
  images: Yup.string().required("Please select an image."),
});

function ProductForm() {
  const history = useHistory();

  const doSubmit = async (product) => {
    try {
      const data = new FormData();
      data.append("productImages", product.images);

      // remove image from product
      delete product.images;

      const newStateData = { ...product };
      data.set("product", JSON.stringify(newStateData));

      await saveProduct(data);

      // show toast notification of success
      toast.success("Product Uploaded");

      history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      <Container>
        <h1>Upload Product</h1>
        <Formik
          initialValues={{
            title: "",
            description: "",
            category: "",
            images: "",
          }}
          validationSchema={ProductSchema}
          onSubmit={async (values, { resetForm }) => {
            doSubmit(values);
            resetForm();
          }}
        >
          {({ errors, touched, handleChange, setFieldValue }) => (
            <Form>
              <FormControl sx={{ mt: 3, mb: 3, width: "100%" }}>
                <TextField
                  onChange={handleChange}
                  label="Title"
                  variant="standard"
                  name="title"
                />
                {errors.title && touched.title ? (
                  <div>{errors.title}</div>
                ) : null}
              </FormControl>

              <FormControl sx={{ mt: 3, mb: 3, width: "100%" }}>
                <TextField
                  multiline
                  onChange={handleChange}
                  rows={4}
                  label="Description"
                  variant="standard"
                  name="description"
                />
                {errors.description && touched.description ? (
                  <div>{errors.description}</div>
                ) : null}
              </FormControl>
              <FormControl sx={{ mt: 3, mb: 3, width: "100%" }}>
                <Select
                  name="category"
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Electronics">Electronics</MenuItem>
                  <MenuItem value="Phones">Phones</MenuItem>
                  <MenuItem value="Clothes">Clothes</MenuItem>
                </Select>
                {errors.category && touched.category ? (
                  <div>{errors.category}</div>
                ) : null}
              </FormControl>
              <FormControl sx={{ mt: 3, mb: 3, width: "100%" }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <label>Click to upload image(s)</label>
                  <label htmlFor="icon-button-file">
                    <Input
                      accept="image/*"
                      id="icon-button-file"
                      name="images"
                      onChange={(event) => {
                        setFieldValue("images", event.currentTarget.files[0]);
                      }}
                      type="file"
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </Stack>
                {errors.images && touched.images ? (
                  <div>{errors.images}</div>
                ) : null}
              </FormControl>
              <FormControl sx={{ mt: 3, mb: 3, width: "20%" }}>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </FormControl>
            </Form>
          )}
        </Formik>
      </Container>
    </React.Fragment>
  );
}

export default ProductForm;
