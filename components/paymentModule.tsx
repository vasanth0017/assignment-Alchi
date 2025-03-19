"use client";

import React, { useState, useEffect } from "react";
import { completePay, sendPayment } from "@/services/apicall";

interface TransferProps {
  userId: string; // Recipient's user ID
}

const MoneyTransfer = () => {
  const [amounts, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState<boolean>(false);
  useEffect(() => {
    // Dynamically load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const handleTransfer = async () => {
    // Validate amount
    if (amounts < 100) {
      setError("Minimum transfer amount is ₹100");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Step 1: Create a transfer order on your backend
      const recipientUserId = 123;
      const amount = amounts * 100;
      const response:any = await sendPayment({ amount, recipientUserId });
      console.log("responsesdssd", response);
        console.log("response", response.orderId);
      // Step 2: Initialize Razorpay payment
      const options = {
        key: process.env.RAZORPAY_KEY_ID, // Your Razorpay key ID
        amount: amount * 100, // Amount in paise
        currency: "INR",
        name: "Kridar paints",
        description: "Money Transfer",
        order_id: response?.orderId,
        handler: async (response: any) => {
            console.log("try to load hanlder from fontend", response);
          const orderId = response.razorpay_order_id;
          const paymentId = response.razorpay_payment_id;
          const signature = response.razorpay_signature;
          const completepay = await completePay({
            orderId,
            paymentId,
            signature,
          });
          console.log("completepay", completepay);

          alert("Transfer Successful!");
        },
        prefill: {
          // Optional user details
          name: "Vasanth",
          email: "vansath@example.com",
        },
      };

      const rzp =  (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      setError("Transfer failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  if (!razorpayLoaded) {
    setError('Razorpay is still loading. Please try again.');
    return;
  }
  return (
    <div className="w-full max-w-md">
      <div>
        <div>Money Transfer</div>
      </div>
      <div>
        <div className="space-y-4">
          <input
           
            placeholder="Enter amount (₹)"
            value={amounts}
            onChange={(e) => setAmount(Number(e.target.value))}
            min={100}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            onClick={handleTransfer}
            disabled={loading || amounts < 100}
            className="w-full cursor-pointer"
          >
            {loading ? "Processing..." : "Transfer Money"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoneyTransfer;
