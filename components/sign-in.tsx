"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import Image from "next/image";

export default  function LoginPage() {
  const [email, setEmail] = useState("");
  const [googleIsLoading, setGoogleIsLoading] = useState(false)
  console.log("email", email);

  const socialAction = async (provider: string) => {
    if (provider === 'google') {
      setGoogleIsLoading(true)
    }

    await signIn(provider, {
      callbackUrl: '/',
      redirect: true,
    }).then((callback) => {
        console.log("callback", callback);
      if (callback?.error) {
        toast.error(
          'An error occurred while trying to login. Please try again.',
        )
      }

      setGoogleIsLoading(false)
    })
  }
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
      <button
              onClick={() => socialAction('google')}
              className="flex items-center gap-2 justify-center h-12 rounded-lg"
            >
              {googleIsLoading ? (
                <Loader className="animate-spin w-5 h-5" />
              ) : (
                <>
                  <Image
                    src={'/google.svg'}
                    width={22}
                    height={22}
                    alt="Google"
                    priority
                  />
                  Sign In with Google
                </>
              )}
            </button>
    </div>
  );
}
