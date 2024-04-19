import React, { createContext, useContext } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const products = [
    {
      title: "Мандарин",
      price: 70,
      id: 0,
    },
    {
      title: "Плов",
      price: 55,
      id: 1,
    },
    {
      title: "Красная рыба",
      price: 225,
      id: 2,
    },
  ];

  return (
    <ProductContext.Provider value={products}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};