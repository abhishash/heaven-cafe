"use client";

import { fetchHandler } from "@/lib/fetch-handler";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Check, Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import Image from "next/image";

type FormValues = {
  email: string;
};


export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    reset,
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
        setSubmitted(true);
        return;
      }
      toast.warning(res?.message);
    }).catch((err) => {
      toast.error(err?.message);
    })
  };

   const handleReset = () => {
    setSubmitted(false);
    reset({
      email: ""
    });
  }

  return (
    // <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

    //   <h2 className="text-3xl font-bold text-gray-800 mb-6">
    //     Forgot Password
    //   </h2>

    //   <p className="text-gray-500 mb-4">
    //     Enter your email to receive a password reset link.
    //   </p>

    //   <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

    //     <input
    //       type="email"
    //       placeholder="Email"
    //       {...register("email", { required: "Email is required" })}
    //       className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#FF4D00]"
    //     />

    //     <button
    //       className="w-full bg-[#FF4D00] text-white p-3 rounded-lg font-semibold hover:opacity-90"
    //     > {
    //         isPending ? "Sending...." : "Send Reset Link"
    //       }

    //     </button>

    //   </form>

    //   <Link
    //     href="/login"
    //     className="text-[#FF4D00] text-sm mt-4 block"
    //   >
    //     Back to Login
    //   </Link>

    // </div>
    <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link href="/" className="flex justify-center items-center gap-2">
                        <div className="text-primary-foreground font-bold text-2xl">
                            <Image src="/logo/header-logo.png" className='' priority={true} alt='main-logo' width={160} height={120} />
                        </div>
                    </Link>
          <p className="text-muted-foreground mt-2">Reset your password</p>
        </div>

        {/* Forgot Password Card */}
        <Card className="border-2 border-muted shadow-lg">
          <div className="p-8">
            {!submitted ? (
              <>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Enter your email address and we'll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-semibold">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        {...register("email", { required: "Email is required" })}
                        className="pl-10 bg-background border-muted focus:border-primary h-12"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base transition-all duration-200"
                  >
                    {isPending ? 'Sending Link...' : 'Send Reset Link'}
                  </Button>
                </form>

                {/* Back to Login */}
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 mt-6 text-primary hover:text-secondary font-medium transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Sign In
                </Link>
              </>
            ) : (
              <div className="text-center space-y-6">
                {/* Success Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                  <Check className="h-8 w-8 text-primary" />
                </div>

                {/* Success Message */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Check Your Email</h2>
                  <p className="text-muted-foreground">
                    We've sent a password reset link to <strong>{watch('email')}</strong>
                  </p>
                </div>

                {/* Instructions */}
                <div className="bg-muted p-4 rounded-lg space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Next steps:</strong>
                  </p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Check your email inbox</li>
                    <li>Click the password reset link</li>
                    <li>Create a new password</li>
                    <li>Log in with your new password</li>
                  </ol>
                </div>

                {/* Resend Link */}
                <p className="text-sm text-muted-foreground">
                  Didn't receive the email?{' '}
                  <button
                    onClick={handleReset}
                    className="text-primary hover:text-secondary font-medium transition-colors"
                  >
                    Try another email
                  </button>
                </p>

                {/* Back to Login */}
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 text-primary hover:text-secondary font-medium transition-colors pt-4"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Sign In
                </Link>
              </div>
            )}
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Remember your password?{' '}
          <Link href="/login" className="text-primary hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
  );
}