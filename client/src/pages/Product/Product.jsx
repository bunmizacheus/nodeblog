import React from "react";
import Grid from "@mui/material/Grid";
import Card from "components/Card/Card";
import { default as Container } from "components/Container/Container";
import Pagination from "components/Pagination/Pagination";
import { getProducts, deleteProduct } from "helpers/product.helper";
import { paginate } from "utils/paginate";
import NavBar from "components/NavBar/NavBar";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { toast } from "react-toastify";
import { Categories } from "constants/index";

import useStyles from "./Product.styles.js";

function Product() {
  const classes = useStyles();

  const [products, setProducts] = React.useState([]);
  const [searchParams, setSearchParams] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = React.useState(0);
  const [selectedCategory, setSelectedCategory] = React.useState({
    title: "",
  });

  React.useEffect(() => {
    async function fetchData() {
      const data = await loadProducts();
      setProducts(data);
    }
    fetchData();
  }, []);

  const loadProducts = async () => {
    const result = await getProducts();
    setPageSize(4);

    return result.data;
  };

  const handleDelete = async (product) => {
    const originalProducts = await loadProducts();
    const products = originalProducts.filter((p) => p._id !== product._id);
    setProducts(products);

    try {
      await deleteProduct(product._id);
      // show toast notification of success
      toast.success("Product Deleted");
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.error(ex.response.data);

      setProducts(originalProducts);
    }
  };

  const handleCategorySelect = ({ target }) => {
    setSelectedCategory({
      title: target.value,
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPagedData = () => {
    const allProducts = products;
    let filtered = allProducts;

    if (selectedCategory && selectedCategory.title) {
      filtered = allProducts.filter(
        (m) => m.category === selectedCategory.title
      );
    }

    let sorted = filtered;

    if (searchParams !== "") {
      sorted = allProducts.filter((product) => {
        let productLowerCase = product.title.toLowerCase();
        let searchTermLowercase = searchParams.toLowerCase();
        return productLowerCase.indexOf(searchTermLowercase) > -1;
      });
    }

    const filterProductList = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: filterProductList };
  };

  const { totalCount, data: filteredProducts } = getPagedData();

  const paginationData = {
    count: totalCount,
    pageSize,
    currentPage,
    onPageChange: handlePageChange,
  };

  return (
    <React.Fragment>
      <NavBar searchParams={searchParams} setSearchParams={setSearchParams} />
      <Container>
        <br />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Filter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCategory.title}
            label="Category"
            onChange={handleCategorySelect}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {Categories.map((item, index) => {
              return (
                <MenuItem key={index} value={item.name}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <br />
        <br />
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
          className={classes.grid}
        >
          {filteredProducts.map((product, index) => (
            <Card handleDelete={handleDelete} product={product} key={index} />
          ))}
        </Grid>
        <br />
        <Pagination pageData={paginationData} />
        <br />
      </Container>
    </React.Fragment>
  );
}

export default Product;
