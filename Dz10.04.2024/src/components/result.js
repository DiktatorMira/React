import React from 'react';
import ProductPlate from './product-plate';
import './result.css';
import { productList } from './products';

export default function Result() {
	const productsList = productList.map((product, index) => (
		<ProductPlate key={index} product={product} />
	));
	const totalBillPrice = productList.reduce((acc, product) => acc + product.price * product.quantity, 0);
	return (
		<div className="result-container">
			<h1 className="title">Сумма чека: {totalBillPrice} грн.</h1>
			<div className="product-list">{productsList}</div>
		</div>
	);
}