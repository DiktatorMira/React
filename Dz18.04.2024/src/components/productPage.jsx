import React from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "./productsContext";

export default function ProductPage() {
  const { id } = useParams();
  console.log(id);
  console.log(typeof id);
  const el = useProducts().find((el) => el.id === parseInt(id, 10));

  const { title, price } = el;

  return (
    <div className="container">
      <p>{title}:</p>
      <p>{price} грн</p>
    </div>
  );
}