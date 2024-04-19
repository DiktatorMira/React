import React from "react";
import ProductItem from "./productItem";
import { useProducts } from "./productsContext";

export default function ProductList() {
  const products = useProducts();
  return (
    <>
      <h2>Продукты</h2>
      <div className="row">
        {products.map((el) => (
          <ProductItem key={el.id}product={el} />
        ))}
      </div>
    </>
  );
}