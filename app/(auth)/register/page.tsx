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
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import Image from "next/image";

type FormValues = {
  phone: string;
  password: string;
  confirmPassword: string;
  email: string;
  communication: boolean;
  name: string;
};

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
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

  

  const onSubmit = async (data: FormValues) => {
    setLoading(true)

    const payload = { name: data?.name, phone: data?.phone, email: data?.email, password: data?.password };
    mutateAsync(payload)?.then(async (res) => {
      if (res?.status) {
        toast.success(res?.message);
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
      }
    }).catch((error) => {
      toast.error("Something Wrong");
    });

    setLoading(false)
  };



  return (

    <div className="w-full max-w-md">
      {/* Logo and Header */}
      <div className="text-center mb-4">
        <Link href="/" className="flex justify-center items-center gap-2">
          <div className="text-primary-foreground font-bold text-2xl">
            <Image src="/logo/header-logo.png" className='' priority={true} alt='main-logo' width={160} height={120} />
          </div>
        </Link>
        <p className="text-muted-foreground mt-2">Join us for delicious flavors!</p>
      </div>

      {/* Register Card */}
      <Card className="border-2 border-muted shadow-lg">
        <div className="p-4 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name Field */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-foreground font-semibold">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  {...register("name", { required: "Name is required" })}
                  className="pl-10 bg-background border-muted focus:border-primary h-12"
                  required
                />
              </div>
            </div>

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

            {/* Phone Field */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground font-semibold">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  {...register("phone", { required: "Phone is required" })}
                  className="pl-10 bg-background border-muted focus:border-primary h-12"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-semibold">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register("password", { required: "Password is required" })}
                  className="pl-10 pr-10 bg-background border-muted focus:border-primary h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>




            {/* Register Button */}
            <Button
              type="submit"
              disabled={isPending || loading}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base transition-all duration-200"
            >
              {isPending || loading ? "Loading..." : isOtp ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Or sign up with</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-11 border-muted bg-background hover:bg-muted">
              <span className="text-lg">🍎</span>
            </Button>
            <Button variant="outline" className="h-11 border-muted bg-background hover:bg-muted">
              <span className="text-lg">📱</span>
            </Button>
          </div>

          {/* Sign In Link */}
          <p className="text-center text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-primary hover:text-secondary font-semibold transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}