"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Apple, Eye, EyeOff, Lock, Mail, Play } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
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
  const [showPassword, setShowPassword] = useState(false)
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
    <main className="relative min-h-[100dvh] w-full overflow-hidden">

      {/* Background Image */}
      <div className="absolute block sm:hidden inset-0">
        <Image
          src="/images/fast-food-bg.png"
          alt="Heaven Cafe"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-secondary/55" />

        {/* Extra gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-secondary/40 to-secondary/70" />
      </div>

      {/* Login Content */}
      <div className="relative z-10 flex min-h-[100dvh] w-full items-center justify-center px-4 py-6 sm:px-6">

        <div className="mx-auto w-full max-w-md">

          {/* Logo / Header */}
          <div className="mb-5 text-center sm:mb-7">
            <Link
              href="/"
              className="inline-flex items-center justify-center"
            >
              <Image
                src="/logo/header-logo.png"
                alt="Heaven Cafe"
                width={150}
                height={90}
                priority
                className="h-auto w-[125px] sm:w-[150px]"
              />
            </Link>

            <h1 className="mt-2 text-xl font-bold tracking-tight text-primary sm:text-2xl">
              Welcome Back
            </h1>

            <p className="mt-1 text-sm text-black/75">
              Sign in to continue to Heaven Cafe
            </p>
          </div>

          {/* Login Card */}
          <Card className="overflow-hidden rounded-2xl border border-white/20 bg-background/95 shadow-2xl backdrop-blur-md">
            <div className="p-5 sm:p-8">

              {/* YOUR FORM HERE */}
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
                      {...register("password", {
                        required: "Password is required",
                      })}
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

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-primary" />
                    <span className="text-sm text-muted-foreground">Remember me</span>
                  </label>
                  <Link
                    href="/forget-password"
                    className="text-sm text-primary hover:text-secondary transition-colors font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base transition-all duration-200"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

            </div>
          </Card>

          {/* Terms */}
          <p className="mx-auto mt-5 max-w-sm px-2 text-center text-[11px] leading-5 text-black/70 sm:mt-6 sm:text-xs">
            By signing in, you agree to our{" "}
            <Link
              href="/terms"
              className="font-medium text-primary hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy-policy"
              className="font-medium text-primary hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>

        </div>
      </div>
    </main>
  );
}