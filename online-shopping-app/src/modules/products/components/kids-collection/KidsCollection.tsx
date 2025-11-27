import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getKidsProductsCollection } from "../../../../redux/products/product.slice";
import { addToCart } from "../../../../redux/orders/order.slice";
import { type AppDispatch, type RootState } from "../../../../redux/store";
import Spinner from "../../../layout/components/spinner/Spinner";
import { type IProduct } from "../../models/IProduct";

const KidsCollection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Get Products info from Redux Store
  const { loading, products, errorMessage } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(getKidsProductsCollection());
  }, [dispatch]);

  // Click Add to Cart
  const clickAddToCart = (product: IProduct) => {
    const defaultQty: number = 1;
    dispatch(addToCart({ product, qty: defaultQty }));
    navigate("/orders/cart");
  };

  return (
    <>
      {/* Header Section */}
      <section
        className="text-white py-4 mb-4"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-2">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-white text-decoration-none">
                      <i className="fas fa-home me-1"></i>Home
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item active text-white-50"
                    aria-current="page"
                  >
                    Kids's Collection
                  </li>
                </ol>
              </nav>
              <h2 className="fw-bold mb-0">
                <i className="fas fa-child me-2"></i>
                Kids's Collection
              </h2>
              <p className="mb-0 text-white-50">
                Adorable styles for your little ones
              </p>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <>
          {errorMessage && (
            <div className="container mb-4">
              <div className="alert alert-danger" role="alert">
                <i className="fas fa-exclamation-triangle me-2"></i>
                {errorMessage}
              </div>
            </div>
          )}

          <section className="py-4">
            <div className="container">
              {products.length === 0 ? (
                <div className="text-center py-5">
                  <i className="fas fa-box-open fa-4x text-muted mb-3"></i>
                  <h4 className="text-muted">No products available</h4>
                  <p className="text-muted">
                    Check back soon for new arrivals!
                  </p>
                </div>
              ) : (
                <div className="row g-4">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="col-lg-3 col-md-4 col-sm-6"
                    >
                      <div className="card h-100 product-card shadow-2-strong border-0">
                        {/* Product Image */}
                        <Link
                          to={`/products/${product._id}`}
                          className="product-image-wrapper"
                        >
                          <div className="position-relative overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="card-img-top product-image"
                              style={{
                                height: "350px",
                                objectFit: "cover",
                                width: "100%",
                              }}
                            />
                            <div className="product-overlay">
                              <button className="btn btn-light btn-sm rounded-pill">
                                <i className="fas fa-eye me-1"></i>
                                Quick View
                              </button>
                            </div>
                          </div>
                        </Link>

                        {/* Product Details */}
                        <div className="card-body d-flex flex-column">
                          <div className="mb-2">
                            <span className="badge bg-light text-dark mb-2">
                              {product.brand}
                            </span>
                          </div>

                          <h5 className="card-title mb-2">
                            <Link
                              to={`/products/${product._id}`}
                              className="text-dark text-decoration-none product-title"
                            >
                              {product.name}
                            </Link>
                          </h5>

                          <div className="mb-2">
                            <span className="text-warning">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="far fa-star"></i>
                            </span>
                            <span className="text-muted small ms-1">(4.0)</span>
                          </div>

                          <div className="d-flex justify-content-between align-items-center mt-auto">
                            <h5 className="text-primary fw-bold mb-0">
                              ₹{product.price.toFixed(2)}
                            </h5>
                            <button
                              className="btn btn-sm px-3 add-to-cart-btn"
                              onClick={() => clickAddToCart(product)}
                              style={{
                                background:
                                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                color: "white",
                                border: "none",
                                borderRadius: "20px",
                              }}
                            >
                              <i className="fas fa-shopping-cart me-1"></i>
                              Add to Cart
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

export default KidsCollection;
