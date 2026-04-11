"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
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
    
    
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-4">
           <Link href="/" className="flex justify-center items-center gap-2">
                        <div className="text-primary-foreground font-bold text-2xl">
                            <Image src="/logo/header-logo.png" className='' priority={true} alt='main-logo' width={160} height={120} />
                        </div>
                    </Link>
          <p className="text-muted-foreground mt-2">Welcome back! Sign in to your account</p>
        </div>

        {/* Login Card */}
        <Card className="border-2 border-muted shadow-lg">
          <div className="p-4 sm:p-8">
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

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
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

            {/* Sign Up Link */}
            <p className="text-center text-muted-foreground mt-6">
              Don't have an account?{' '}
              <Link
                href="/register"
                className="text-primary hover:text-secondary font-semibold transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          By signing in, you agree to our{' '}
          <Link href="#" className="hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="#" className="hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    
  );
}