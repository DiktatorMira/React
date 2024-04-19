import React from "react"; // npm i react-router-dom
import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Contact from "./pages/contact";
import About from "./pages/about";
import NotFound from "./pages/notFound";
import Layout from "./components/layout";
import ProductPage from "./components/productPage";
import { ProductProvider } from "./components/productsContext";

export default function App() {
  const router = createBrowserRouter([ {
      path: "/",
      element: (
        <ProductProvider>
          <Layout />
        </ProductProvider>
      ),
      children: [ {
          path: "/",
          element: <Home />,
        }, {
          path: "/Contact",
          element: <Contact />,
        }, {
          path: "/About",
          element: <About />,
        }, {
          path: "/product/:id",
          element: <ProductPage />,
        }, {
          path: "*",
          element: <NotFound />,
        },
      ],
    }, {},
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}