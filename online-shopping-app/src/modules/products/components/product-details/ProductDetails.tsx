import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../layout/components/spinner/Spinner";
import { getProduct } from "../../../../redux/products/product.slice";
import { addToCart } from "../../../../redux/orders/order.slice";
import type { RootState, AppDispatch } from "../../../../redux/store";
import "./ProductDetails.css";

type URLParamsType = {
  productId?: string;
};

const ProductDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { productId } = useParams<URLParamsType>();
  const [qty, setQty] = useState<string>("");

  const { loading, product, errorMessage } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (productId) dispatch(getProduct(productId));
  }, [productId, dispatch]);

  const updateQtyInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQty(event.target.value);
  };

  const submitAddToCart = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!product) return;

    dispatch(addToCart({ product, qty: Number(qty) }));
    navigate("/orders/cart");
  };

  if (loading) return <Spinner />;

  if (errorMessage) {
    return (
      <div className="page-container">
        <div className="error-alert">{errorMessage}</div>
      </div>
    );
  }

  return (
    <>
      {/* Premium Gradient Header */}
      <section className="product-header">
        <div className="header-content">
          <h1 className="product-title">
            <i className="fas fa-tag"></i> Product Details
          </h1>
          <p className="product-subtitle">
            Explore high-quality fashion with premium details
          </p>
        </div>
      </section>

      {product && (
        <div className="details-container">
          <div className="details-wrapper">
            {/* Left – Image */}
            <div className="image-section">
              <img src={product.image} alt={product.name} className="main-img" />
            </div>

            {/* Right – Info */}
            <div className="info-section">
              <h2 className="detail-name">{product.name}</h2>

              <span className="brand-badge">{product.brand}</span>

              <h3 className="detail-price">
                ₹{product.price.toFixed(2)}
              </h3>

              <form onSubmit={submitAddToCart} className="qty-form">
                <label className="qty-label">Select Quantity</label>

                <select
                  className="qty-select"
                  value={qty}
                  onChange={updateQtyInput}
                  required
                >
                  <option value="">-- Select Qty --</option>
                  {[1, 2, 3, 4, 5].map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </select>

                <button type="submit" className="cart-btn">
                  <i className="fas fa-shopping-cart"></i> Add to Cart
                </button>
              </form>

              <div className="description-section">
                {product.usage && <p>{product.usage}</p>}
                {product.description && <p>{product.description}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
