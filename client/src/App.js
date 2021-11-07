import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const Product = React.lazy(() => import("./pages/Product/Product"));
const ProductForm = React.lazy(() => import("./pages/Product/ProductForm"));

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <main>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/">
              <Product />
            </Route>
            <Route path="/add-product">
              <ProductForm />
            </Route>
            <Redirect to="/" />
          </Switch>
        </React.Suspense>
      </main>
    </React.Fragment>
  );
}

export default App;
