import React from "react";
import { useProducts } from "./productsContext";
import ProductItem from "./productItem";

export default function ProductList() {
  const { products } = useProducts(); // Получаем список продуктов из контекста
  return (
    <>
      <h2>Продукты</h2>
      <div className="row">
        {Array.isArray(products) && products.map((el) => (
          <ProductItem key={el.id} product={el} />
        ))}
      </div>
    </>
  );
}