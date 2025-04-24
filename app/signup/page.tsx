/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { signup } from "./action";
import { signInWithGoogle } from "../login/action";
import Image from "next/image";
import images from "@/constants/images/image";
import Link from "next/link";

export default function SignupPage() {
  const [message, setMessage] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    const result:any = await signup(formData);
    
    if (result.error) {
      // Handle error (you could set an error state here as well)
      setMessage(result.error);
    } else {
      // Success
      setMessage(result.success);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4 font-roboto-mono">
      <Card className="w-full max-w-md p-4 shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSignup}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full mt-2 hover:cursor-pointer">
              Sign up
            </Button>
          </form>
          <p className="text-center">Already have an account? 
            <Link href={"/login"}>
            <span className="text-blue-600">Signin</span>
            </Link>
          </p>
          {/* Display success or error message */}
          {message && (
            <div className="mt-4 text-center text-white font-semibold">
              <p>{message}</p>
            </div>
          )}

          <div className="mt-4">
            {/* Google login button */}
            <Button onClick={signInWithGoogle} variant="outline" className="w-full mt-2">
              Sign up with Google
              <Image
                src={images.googleLogo}
                alt="google-logo"
                width={20}
                height={20}
              />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
