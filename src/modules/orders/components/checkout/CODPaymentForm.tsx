/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { CartUtil } from "../../../../util/CartUtil";
import type { AppDispatch } from "../../../../redux/store";
import "./CheckoutPaymentForm.css";

interface Props {
  cartItems: any[];
  totalAmount: number;
  navigate: any;
  dispatch: AppDispatch;
}

const CODPaymentForm: React.FC<Props> = ({
  cartItems,
  totalAmount,
  navigate,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [agreedToCOD, setAgreedToCOD] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!agreedToCOD) {
      setErrorMsg("Please agree to the terms and conditions");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY);

      // 🔥 FIX: user must include name, email, mobile
      const user = localStorage.getItem("user")
        ? (JSON.parse(localStorage.getItem("user")!) as any)
        : {};

      const items = cartItems.map((c) => ({
        name: c.name,
        brand: c.brand,
        price: c.price,
        qty: c.qty,
      }));

      // 🔥 FIX: Use LIVE backend URL (Render)
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/payments/cod`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token || "",
          },
          body: JSON.stringify({
            amount: totalAmount,
            email: user?.email ?? "",
            userName: user?.name ?? "",
            mobile: user?.mobile ?? "",
            items: items,
            tax: CartUtil.calcTax(cartItems),
            total: CartUtil.calcTotal(cartItems),
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "COD order creation failed");
      }

      // On success → redirect
      navigate("/orders/success");
    } catch (err: any) {
      setErrorMsg(err.message || "Order creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <div className="cod-info mb-3 p-3 bg-light rounded">
        <p className="mb-2">
          <strong>💵 Pay on Delivery</strong>
        </p>
        <p className="mb-0">
          <small>
            You'll pay <strong>₹{totalAmount / 100}</strong> to the delivery
            partner when your order arrives at your doorstep.
          </small>
        </p>
      </div>

      <div className="cod-benefits mb-3 p-3 border-left-accent">
        <p className="mb-2">
          <small>✓ No upfront payment required</small>
        </p>
        <p className="mb-2">
          <small>✓ Verify your order before payment</small>
        </p>
        <p className="mb-0">
          <small>✓ Secure & convenient payment method</small>
        </p>
      </div>

      <label className="cod-agreement mb-3">
        <input
          type="checkbox"
          checked={agreedToCOD}
          onChange={(e) => setAgreedToCOD(e.target.checked)}
        />
        <span className="agreement-text">
          I agree to pay ₹{totalAmount / 100} on delivery
        </span>
      </label>

      {errorMsg && <p className="error-text">{errorMsg}</p>}

      <button
        type="submit"
        className="pay-btn"
        disabled={loading || !agreedToCOD}
      >
        {loading
          ? "Creating Order..."
          : `Confirm Order - ₹${totalAmount / 100}`}
      </button>

      <p className="cod-note mt-2">
        <small className="text-muted">
          Note: COD may not be available for all locations
        </small>
      </p>
    </form>
  );
};

export default CODPaymentForm;
