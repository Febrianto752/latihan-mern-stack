import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../config/api";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await axios.get(`${api.baseUrl}/products`);
    setProducts(response.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProductById = async (id) => {
    try {
      await axios.delete(`${api.baseUrl}/products/${id}`);
      await getProducts();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="container py-4">
        <div className="row mb-4">
          <div className="col">
            <h1 className="text-center mb-4">Products List</h1>
            <Link
              to={"/products/add"}
              className="btn btn-success"
              style={{ width: "fit-content" }}
            >
              Add Product
            </Link>
          </div>
        </div>

        <div className="row ">
          {products.length !== 0
            ? products.map((product, index) => {
                return (
                  <div
                    className="col-12 col-sm-6 col-lg-3"
                    key={`product-${index}`}
                  >
                    <div className="card shadow-sm mb-3">
                      <img
                        src={product.url}
                        alt="product"
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <h3 className="card-title">{product.name}</h3>
                        <Link
                          to={`/products/edit/${product.id}`}
                          className="btn btn-warning me-2"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => deleteProductById(product.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
};

export default ProductsList;
