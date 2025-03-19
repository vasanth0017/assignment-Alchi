import Razorpay from "razorpay";
import crypto from "crypto";
import exp from "constants";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const handler = async (req: any, res: any) => {
  if (req.method === "POST") {
    try {
      const { orderId, paymentId, signature } = req.body;
        console.log("orderId", orderId);
        console.log("paymentId", paymentId);    
        console.log("signature", signature);
      // Verify payment signature
      const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
        .update(`${orderId}|${paymentId}`)
        .digest("hex");

      if (generatedSignature !== signature) {
        return res.status(400).json({ error: "Invalid signature" });
      }

      // Fetch payment details
      const payment = await razorpay.payments.fetch(paymentId);
      //   await performTransfer(payment);

      res.status(200).json({ message: "Transfer successful" });
    } catch (error) {
      console.error("Transfer completion error:", error);
      res.status(500).json({ error: "Transfer completion failed" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
export default handler;