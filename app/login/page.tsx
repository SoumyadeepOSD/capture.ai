import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { login, signInWithGoogle } from "./action";
import Image from "next/image";
import images from "@/constants/images/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4 font-roboto-mono">
      <Card className="w-full max-w-md p-4 shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Log In</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button formAction={login} type="submit" className="w-full mt-2">
              Log in
            </Button>
          </form>

          <div className="mt-4">
            {/* Google login button */}
            <Button onClick={signInWithGoogle} variant="outline" className="w-full mt-2">
              Log in with Google
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
