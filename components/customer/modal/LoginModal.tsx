import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";

export default function LoginModal({ open, setOpen, onLogin, isLoading } : { open: boolean; setOpen: (open: boolean) => void; onLogin: (data: FieldValues) => void; isLoading: boolean }) {
    const [showPassword, setShowPassword] = useState(false)
    const { register, handleSubmit } = useForm();


    const onSubmit = (data: FieldValues) => {
        onLogin(data);
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg rounded-2xl">
                <DialogHeader className="">
                    <DialogTitle className="text-center items-center flex-col flex py-0 justify-center text-xl font-semibold">
                        {/* Logo */}
                        <Image
                            src="/favicon.png"
                            alt="logo"
                            width={110}
                            height={70}
                            priority
                        />
                        <h2 className="text-xl font-semibold text-primary">Login to Account</h2>
                    </DialogTitle>
                </DialogHeader>

                {/* Login Card */}
                <div className="px-2">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-primary font-semibold">
                                Email Address
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    {...register("email", { required: "Email is required" })}
                                    className="pl-10 bg-background border-muted focus:border-primary h-10"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-primary font-semibold">
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
                                    className="pl-10 pr-10 bg-background border-muted focus:border-primary h-10"
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
                            disabled={isLoading}
                            className="w-full h-12 cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base transition-all duration-200"
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                            Sign In
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}