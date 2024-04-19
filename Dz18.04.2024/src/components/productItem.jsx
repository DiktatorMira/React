import React from "react";
import { Link } from "react-router-dom";

export default function ProductItem(props) {
  const { id, title, price } = props.product;
  return (
    <Link className="Link" to={`/product/${id}`}>
      <div className="item">
        <h3>{title}</h3>
        <p>{price}</p>
      </div>
    </Link>
  );
}