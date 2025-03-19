import db from "@/prisma/db";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
const handler = async (req: any, res: any) => {
    if (req.method === 'POST') {
        try {
          const { amount, recipientUserId } = req.body;
            console.log("amount", amount);
            console.log("recipientUserId", recipientUserId);
          // Create Razorpay order
          const options = {
            amount: amount, // amount in paise
            currency: 'INR',
            receipt: `transfer_${recipientUserId}_${Date.now()}`,
            payment_capture: 1
          };
    
          const order = await razorpay.orders.create(options);
          console.log('Order created:', order);
          res.status(200).json({
            orderId: order.id
          });
        } catch (error) {
          console.error('Transfer creation error:', error);
          res.status(500).json({ error: 'Transfer creation failed' });
        }
      }
};
export default handler; 