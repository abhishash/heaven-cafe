"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormValues = {
  password: string;
  email: string;
};

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      const response = await signIn("credentials", {
        username: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/",
      });
      if (response?.ok) {
        router.push("/");
      } else {
        toast.warning(response?.error);
      }
    } catch (error) {
      toast.warning("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Login
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4D00]"
        />

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
          })}
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4D00]"
        />

        <button
          disabled={loading}
          className="w-full bg-[#FF4D00] text-white p-3 rounded-lg font-semibold hover:opacity-90"
        >
          {
            loading ? "Logging..." : "Login"
          }
          
        </button>

      </form>

      <div className="flex justify-between mt-4 text-sm">

        <Link
          href="/forgot-password"
          className="text-[#FF4D00] hover:underline"
        >
          Forgot Password?
        </Link>

        <Link
          href="/register"
          className="text-[#FF4D00] hover:underline"
        >
          Create Account
        </Link>

      </div>
    </div>
  );
}