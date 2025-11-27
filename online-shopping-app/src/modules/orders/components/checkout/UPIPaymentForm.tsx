/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { CartUtil } from "../../../../util/CartUtil";
import { makeStripePayment } from "../../../../redux/orders/order.slice";
import type { AppDispatch } from "../../../../redux/store";
import "./CheckoutPaymentForm.css";

interface Props {
  cartItems: any[];
  totalAmount: number;
  navigate: any;
  dispatch: AppDispatch;
}

const UPIPaymentForm: React.FC<Props> = ({
  cartItems,
  totalAmount,
  navigate,
  dispatch,
}) => {
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const validateUPI = (id: string): boolean => {
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/;
    return upiRegex.test(id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!validateUPI(upiId)) {
      setErrorMsg("Invalid UPI ID format. Use format: username@bankname");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : {};

      const response = await fetch("http://localhost:5000/api/payments/upi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token || "",
        },
        body: JSON.stringify({
          upiId,
          amount: totalAmount,
          email: user.email,
          userName: user.name,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const items = cartItems.map((c) => ({
          name: c.name,
          brand: c.brand,
          price: c.price,
          qty: c.qty,
        }));

        const order = {
          items,
          tax: CartUtil.calcTax(cartItems),
          total: CartUtil.calcTotal(cartItems),
          paymentMethod: "upi",
          paymentStatus: "completed",
        };

        dispatch(makeStripePayment({ order, navigate }));
      } else {
        setErrorMsg(data.message || "UPI payment failed");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <label className="form-label">UPI ID</label>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="username@bankname (e.g., john@okhdfcbank)"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value.toLowerCase())}
        required
      />

      <div className="info-box mb-2">
        <small>
          💡 Common UPI providers: @okaxis, @okhdfcbank, @okicici, @oksbi,
          @okbank
        </small>
      </div>

      {errorMsg && <p className="error-text">{errorMsg}</p>}

      <button type="submit" className="pay-btn" disabled={loading}>
        {loading ? "Processing..." : `Pay ₹${totalAmount / 100}`}
      </button>
    </form>
  );
};

export default UPIPaymentForm;
