import React, { useEffect, useState } from "react";
import "../../Css/product.css";
import Product from "./Product";
import { useParams } from "react-router-dom";
import { asynsingleshopproducts } from "../../store/userActions";
import { useDispatch, useSelector } from "react-redux";
const ShopProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleshop_products } = useSelector((state) => state.user);
  useEffect(() => {
    if (id) {
      dispatch(asynsingleshopproducts(id));
    }
  }, []);
  return (
    <div className="product">
      <h1>Products</h1>
      <div className="productlap">
        {singleshop_products.map((e, i) => (
          <Product data={e} key={i} />
        ))}
      </div>
    </div>
  );
};

export default ShopProduct;
