import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getWomenProductsCollection } from "../../../../redux/products/product.slice";
import { addToCart } from "../../../../redux/orders/order.slice";
import { type AppDispatch, type RootState } from "../../../../redux/store";
import Spinner from "../../../layout/components/spinner/Spinner";
import { type IProduct } from "../../models/IProduct";
import "./WomenCollection.css";

const WomensCollection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, products, errorMessage } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(getWomenProductsCollection());
  }, [dispatch]);

  const clickAddToCart = (product: IProduct) => {
    dispatch(addToCart({ product, qty: 1 }));
    navigate("/orders/cart");
  };

  return (
    <>
      <section className="collection-header">
        <div className="header-content">
          <div className="breadcrumb-section">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/" className="breadcrumb-link">
                    <i className="fas fa-home"></i> Home
                  </Link>
                </li>
                <li className="breadcrumb-item active">Women's Collection</li>
              </ol>
            </nav>
          </div>
          <div className="header-text">
            <h1 className="collection-title">
              <i className="fas fa-female"></i> Women's Collection
            </h1>
            <p className="collection-subtitle">
              Elegant and stylish fashion for women
            </p>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <>
          {errorMessage && (
            <div className="container py-4">
              <div className="error-alert">
                <i className="fas fa-exclamation-circle"></i>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          <section className="collection-section">
            <div className="container">
              {products.length === 0 ? (
                <div className="empty-state">
                  <i className="fas fa-box-open"></i>
                  <h3>No products available</h3>
                  <p>Check back soon for new arrivals!</p>
                </div>
              ) : (
                <div className="products-grid">
                  {products.map((product) => (
                    <div key={product._id} className="product-item">
                      <div className="product-card">
                        <Link
                          to={`/products/${product._id}`}
                          className="image-container"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="product-img"
                          />
                          <div className="image-overlay">
                            <button className="quick-view-btn">
                              <i className="fas fa-eye"></i>
                              <span>Quick View</span>
                            </button>
                          </div>
                        </Link>

                        <div className="product-info">
                          <span className="brand-badge">{product.brand}</span>

                          <h3 className="product-name">
                            <Link to={`/products/${product._id}`}>
                              {product.name}
                            </Link>
                          </h3>

                          <div className="rating">
                            <span className="stars">
                              {[...Array(4)].map((_, i) => (
                                <i key={i} className="fas fa-star"></i>
                              ))}
                              <i className="far fa-star"></i>
                            </span>
                            <span className="rating-text">(4.0)</span>
                          </div>

                          <div className="product-footer">
                            <h4 className="price">
                              ₹{product.price.toFixed(2)}
                            </h4>
                            <button
                              className="add-cart-btn"
                              onClick={() => clickAddToCart(product)}
                            >
                              <i className="fas fa-shopping-cart"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default WomensCollection;
