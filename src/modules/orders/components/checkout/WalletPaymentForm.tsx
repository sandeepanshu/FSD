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

const WalletPaymentForm: React.FC<Props> = ({
  cartItems,
  totalAmount,
  navigate,
  dispatch,
}) => {
  const [walletType, setWalletType] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const wallets = [
    { code: "PAYTM", name: "Paytm Wallet", icon: "🎫" },
    { code: "GOOGLEPAY", name: "Google Pay", icon: "🔵" },
    { code: "PHONEPE", name: "PhonePe", icon: "💜" },
    { code: "AMAZONPAY", name: "Amazon Pay", icon: "🟠" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!walletType) {
      setErrorMsg("Please select a wallet");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY);

      const user = localStorage.getItem("user")
        ? (JSON.parse(localStorage.getItem("user")!) as any)
        : {};

      // 🔥 FIX: Use LIVE backend server (Render)
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/payments/wallet`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token || "",
          },
          body: JSON.stringify({
            walletType,
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

        // 🔥 FIX: Include required fields
        const order = {
          name: user?.name ?? "",
          email: user?.email ?? "",
          mobile: user?.mobile ?? "",
          items,
          tax: CartUtil.calcTax(cartItems),
          total: CartUtil.calcTotal(cartItems),
          paymentMethod: "wallet",
          paymentStatus: "completed",
        };

        // 🔥 FIX: paymentIntentId REQUIRED
        dispatch(
          makeStripePayment({
            paymentIntentId: "wallet-payment",
            order,
          })
        );

        navigate("/orders/success");
      } else {
        setErrorMsg(data.message || "Wallet payment failed");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <label className="form-label">Select Your Wallet</label>

      <div className="wallet-options mb-3">
        {wallets.map((wallet) => (
          <label key={wallet.code} className="wallet-radio">
            <input
              type="radio"
              name="wallet"
              value={wallet.code}
              checked={walletType === wallet.code}
              onChange={(e) => setWalletType(e.target.value)}
            />
            <span>
              {wallet.icon} {wallet.name}
            </span>
          </label>
        ))}
      </div>

      <div className="info-box mb-2">
        <small>👛 Fast & Secure. Get cashback on select wallets</small>
      </div>

      {errorMsg && <p className="error-text">{errorMsg}</p>}

      <button type="submit" className="pay-btn" disabled={loading}>
        {loading ? "Processing..." : `Pay ₹${totalAmount / 100}`}
      </button>
    </form>
  );
};

export default WalletPaymentForm;
