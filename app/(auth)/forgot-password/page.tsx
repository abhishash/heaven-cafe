"use client";

import { fetchHandler } from "@/lib/fetch-handler";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormValues = {
  email: string;
};


export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const { data, mutateAsync, isPending } = useMutation({
    mutationFn: (payload: { email: string }) =>
      fetchHandler({
        endpoint: "forget/password",
        method: "POST",
        data: payload,
      })
  });

  const onSubmit = async (data: FormValues) => {
    mutateAsync({
      email: data?.email
    }).then((res) => {
      const response = res?.data;
      if (response?.status) {
        toast.success(response?.message)
        return;
      }
      toast.warning(res?.message);
    }).catch((err) => {
      toast.error(err?.message);
    })
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Forgot Password
      </h2>

      <p className="text-gray-500 mb-4">
        Enter your email to receive a password reset link.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#FF4D00]"
        />

        <button
          className="w-full bg-[#FF4D00] text-white p-3 rounded-lg font-semibold hover:opacity-90"
        > {
            isPending ? "Sending...." : "Send Reset Link"
          }

        </button>

      </form>

      <Link
        href="/login"
        className="text-[#FF4D00] text-sm mt-4 block"
      >
        Back to Login
      </Link>

    </div>
  );
}