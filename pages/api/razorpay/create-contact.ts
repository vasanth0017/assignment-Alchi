import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userName, userEmail, userContact } = req.body;
    console.log("req.body",userName );
    // Razorpay API credentials
    const RAZORPAYX_KEY_ID = process.env.RAZORPAY_KEY_ID!;
    const RAZORPAYX_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;


    // Step 1: Create Contact
    const contactResponse = await axios.post(
      "https://api.razorpay.com/v1/contacts",
      {
        name: userName,
        email: userEmail,
        contact: userContact,
        type: "customer",
      },
      {
        auth: {
          username: RAZORPAYX_KEY_ID,
          password: RAZORPAYX_KEY_SECRET,
        },
      }
    );

    const contactId = contactResponse.data.id; // Get the contact_id
    console.log("contactId", contactId);
    res.status(200).json({ success: true, contactId });
  } catch (error: any) {
    console.error("Contact Creation Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to create contact." });
  }
}
