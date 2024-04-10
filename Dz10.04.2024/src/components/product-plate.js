import React from 'react';
import './product-plate.css';

export default function ProductPlate({ product }) {
	const totalProductPrice = product.price * product.quantity;
	return (
		<div className="product-card">
			<h2 className="product-name">{product.name}</h2>
			<p className="product-price">Цена за 1шт: {product.price} грн.</p>
			<p className="product-quantity">Кол-во: {product.quantity}</p>
			<p className="total-product-price">Цена: {totalProductPrice} грн.</p>
		</div>
	);
}