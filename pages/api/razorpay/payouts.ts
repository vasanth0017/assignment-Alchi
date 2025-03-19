import Razorpay from 'razorpay';

const razorpay: any = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const sendReward = async (req: any, res: any) => {
  try {
    const amount = 50;
    const user = "cocpraveen0max@okaxis";

    // Step 1: Create Payout
    const payout = await razorpay.payouts.create({
      account_number: "41103314904", // Ensure this is your Razorpay linked account
      amount: amount * 100, // Convert to paise
      currency: "INR",
      mode: "UPI",
      purpose: "reward",
      fund_account: {
        account_type: "vpa",
        vpa: { address: user },
        name: "praveenkumar",
      },
    });

    console.log("Payout Created:", payout);

    // Step 2: Fetch and Check Payout Status
    const payoutStatus = await razorpay.payouts.fetch(payout.id);
    console.log("Payout Status:", payoutStatus);

    return res.status(200).json({ success: true, payoutStatus });
  } catch (error: any) {
    console.error("Payout Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
 