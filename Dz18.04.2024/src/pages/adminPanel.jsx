import React, { useState } from "react";
import { useProducts } from "../components/productsContext";

export default function AdminPanel() {
    const [newProduct, setNewProduct] = useState({ title: "", price: "" });
    const { products, addProduct } = useProducts();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
        ...newProduct,
        [name]: value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newProduct.title || !newProduct.price) return;
        const id = products.length > 0 ? products[products.length - 1].id + 1 : 0;
        const newProductWithId = { ...newProduct, id };
        console.log("Добавлен новый продукт:", newProductWithId);
        addProduct(newProductWithId);
        setNewProduct({ title: "", price: "" });
    };
    return (
        <>
            <h1>Панель админа</h1>
            <h2>Добавить новый продукт</h2>
            <form className="admin-form" onSubmit={handleSubmit}>
                <input className="inputs" type="text" name="title" value={newProduct.title} onChange={handleInputChange} placeholder="Название продукта"/>
                <input className="inputs" type="number" name="price" value={newProduct.price} onChange={handleInputChange} placeholder="Цена"/>
                <button type="submit">Добавить</button>
            </form>
        </>
    );
}