"use client";

import React, { useState, useEffect } from "react";
import { completePay, sendPayment } from "@/services/apicall";

interface TransferProps {
  userId: string; // Recipient's user ID
}

const MoneyTransfer = () => {
 
  return (
    <div className="w-full max-w-md">
      <div>
        <div>Money Transfer</div>
      </div>
    </div>
  );
};

export default MoneyTransfer;
