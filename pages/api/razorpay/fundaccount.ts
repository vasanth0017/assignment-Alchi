import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userUPIID, contactId } = req.body;
    console.log("req.body", userUPIID);
    // Razorpay API credentials
    const RAZORPAYX_KEY_ID = process.env.RAZORPAY_KEY_ID!;
    const RAZORPAYX_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;

    // Create fund account request
    const fundAccountResponse = await axios.post(
        "https://api.razorpay.com/v1/fund_accounts",
        {
          contact_id: contactId, 
          account_type: "vpa",
          vpa: {
            address: userUPIID, // User's UPI ID
          },
        },
        {
          auth: {
            username: RAZORPAYX_KEY_ID,
            password: RAZORPAYX_KEY_SECRET,
          },
        }
      );

    res.status(200).json({ success: true, fundAccountId: fundAccountResponse.data.id });
  } catch (error: any) {
    console.error("Fund Account Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to create fund account." });
  }
}
