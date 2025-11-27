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
      setErrorMsg("Invalid UPI ID format. Use: username@bankname");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY);

      // FIX: user with correct typing
      const user = localStorage.getItem("user")
        ? (JSON.parse(localStorage.getItem("user")!) as any)
        : {};

      // FIX: Use Render backend URL
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/payments/upi`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token || "",
          },
          body: JSON.stringify({
            upiId,
            amount: totalAmount,
            email: user?.email ?? "",
            userName: user?.name ?? "",
            mobile: user?.mobile ?? "",
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        const items = cartItems.map((c) => ({
          name: c.name,
          brand: c.brand,
          price: c.price,
          qty: c.qty,
        }));

        // FIX: Required fields + placeholder paymentIntentId
        const order = {
          name: user?.name ?? "",
          email: user?.email ?? "",
          mobile: user?.mobile ?? "",
          items,
          tax: CartUtil.calcTax(cartItems),
          total: CartUtil.calcTotal(cartItems),
          paymentMethod: "upi",
          paymentStatus: "completed",
        };

        dispatch(
          makeStripePayment({
            paymentIntentId: "upi-payment",
            order,
          })
        );

        navigate("/orders/success");
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
          💡 Common UPI providers: @okaxis, @okhdfcbank, @okicici, @oksbi, @okbank
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
