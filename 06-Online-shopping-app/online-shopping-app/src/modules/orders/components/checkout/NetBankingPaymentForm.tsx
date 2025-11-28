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

const NetBankingPaymentForm: React.FC<Props> = ({
  cartItems,
  totalAmount,
  navigate,
  dispatch,
}) => {
  const [bankCode, setBankCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const banks = [
    { code: "HDFC", name: "HDFC Bank" },
    { code: "ICIC", name: "ICICI Bank" },
    { code: "SBI", name: "State Bank of India" },
    { code: "AXIS", name: "Axis Bank" },
    { code: "KUVS", name: "Kotak Mahindra Bank" },
    { code: "INDB", name: "IndusInd Bank" },
    { code: "UTIB", name: "Axis Bank" },
    { code: "UBIN", name: "Union Bank of India" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!bankCode) {
      setErrorMsg("Please select a bank");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : {};

      const response = await fetch(
        "http://localhost:5000/api/payments/netbanking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token || "",
          },
          body: JSON.stringify({
            bankCode,
            amount: totalAmount,
            email: user.email,
            userName: user.name,
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

        const order = {
          items,
          tax: CartUtil.calcTax(cartItems),
          total: CartUtil.calcTotal(cartItems),
          paymentMethod: "netbanking",
          paymentStatus: "completed",
        };

        dispatch(makeStripePayment({ order, navigate }));
      } else {
        setErrorMsg(data.message || "Net Banking payment failed");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <label className="form-label">Select Your Bank</label>
      <select
        className="form-control mb-3"
        value={bankCode}
        onChange={(e) => setBankCode(e.target.value)}
        required
      >
        <option value="">Choose your bank...</option>
        {banks.map((bank) => (
          <option key={bank.code} value={bank.code}>
            {bank.name}
          </option>
        ))}
      </select>

      <div className="info-box mb-2">
        <small>
          🏦 You will be redirected to your bank's secure login page
        </small>
      </div>

      {errorMsg && <p className="error-text">{errorMsg}</p>}

      <button type="submit" className="pay-btn" disabled={loading}>
        {loading ? "Redirecting to Bank..." : `Pay ₹${totalAmount / 100}`}
      </button>
    </form>
  );
};

export default NetBankingPaymentForm;
