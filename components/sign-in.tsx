"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default  function LoginPage() {
  const [email, setEmail] = useState("");
  console.log("email", email);
  const handleEmailSignIn = async () => {
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    await signIn("email", {
      email,
      redirect: false,
      callbackUrl: "/",
    }).then((callback) => {
      if (callback?.error) {
        toast.error(
          "An error occurred while trying to send the email. Please try again."
        );
      } else {
        toast.success("Sign-In link has been sent to your email");
      }
    });
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Login</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={handleEmailSignIn}
        className="bg-blue-500 text-white px-4 py-2 mt-2"
      >
        Send Login Link
      </button>
    </div>
  );
}
