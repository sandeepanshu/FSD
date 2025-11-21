import React, { useEffect, useState } from "react";
import axios from "axios";
import type { IProduct } from "../IProduct";
import "./productStyles.css";
import ProductSkeleton from "./ProductSkeleton";
import ProductCard from "./ProductCard";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:5000/api/products");
      setProducts(data.products);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-light py-5 mb-4 text-center">
        <div className="container">
          <h1 className="display-5 fw-bold text-success">
            <i className="fas fa-shopping-basket me-2"></i>Product List
          </h1>
          <p className="lead text-muted">
            Discover high-quality and affordable products.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="pb-5">
        <div className="container">
          {loading && <ProductSkeleton />}

          {!loading && products.length > 0 && (
            <div className="row g-4">
              {products.map((product, index) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="text-center py-5">
              <i className="fas fa-box-open fa-4x text-muted mb-3"></i>
              <h4>No Products Found</h4>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductList;
