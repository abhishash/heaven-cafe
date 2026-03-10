"use client";

import { fetchHandler } from "@/lib/fetch-handler";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

type FormValues = {
  phone: string;
  password: string;
  email: string;
  communication: boolean;
  name: string;
  otp: string;
};

export default function RegisterPage() {

  const [loading, setLoading] = useState(false);
  const [isOtp, setIsOtp] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const { data, mutateAsync, isPending } = useMutation({
    mutationFn: (payload: { name: string; phone: string, email: string, password: string }) =>
      fetchHandler({
        endpoint: "register",
        method: "POST",
        data: payload,
      })
  });

  const { mutateAsync: verifyOtp, isPending: isOtpPending } = useMutation({
    mutationFn: (payload: { email: string, otp: string }) =>
      fetchHandler({
        endpoint: "verify-otp",
        method: "POST",
        data: payload,
      })
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    if (isOtp) {
      verifyOtp({
        otp: data?.otp,
        email: data?.email,
      })?.then(async (res) => {
        if (res?.status) {
          // setIsOtp(true);
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
        } else {
          toast.warning(res?.message);
        }
      }).catch((error) => {
        toast.warning("Something went wrong");
      });
    } else {
      const payload = { name: data?.name, phone: data?.phone, email: data?.email, password: data?.password };
      mutateAsync(payload)?.then((res) => {
        if (res?.status) {
          setIsOtp(true);
          toast.success("OTP has been send your registered email");
          return;
        }
        toast.error(res?.errors?.email?.[0]);
      }).catch((error) => {
        toast.error("Something Wrong");
      });
    }
    setLoading(false)
  };



  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Create Account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {

          isOtp ? <div className="flex justify-center">

            <Controller
              name="otp"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
          </div> : <>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", { required: "Name is required" })}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-primary"
            />

            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              placeholder="Phone"
              {...register("phone", { required: "Phone is required" })}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-primary"
            />
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </>
        }
        <button
          disabled={isPending || isOtpPending || loading}
          className="w-full bg-primary text-white p-3 rounded-lg font-semibold hover:opacity-90"
        >{
            isPending || isOtpPending || loading ? "Loading..." : isOtp ? "Verify Account" : "Create Account"
          }

        </button>

      </form>

      <p className="text-sm mt-4">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-[#FF4D00] font-medium"
        >
          Login
        </Link>
      </p>
    </div>
  );
}