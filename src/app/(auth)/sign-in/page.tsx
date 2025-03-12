import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import AuthLayout from "@/components/auth-layout";
import { SignInIllustration } from "@/components/auth-illustrations";

interface LoginProps {
  searchParams: Promise<Message>;
}

export default async function SignInPage({ searchParams }: LoginProps) {
  const message = await searchParams;

  if ("message" in message) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center p-4 sm:max-w-md">
        <FormMessage message={message} />
      </div>
    );
  }

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle={
        <>
          Don't have an account?{" "}
          <Link
            className="text-cyan-400 font-medium hover:underline transition-all"
            href="/sign-up"
          >
            Sign up
          </Link>
        </>
      }
      illustration={<SignInIllustration />}
    >
      <form className="flex flex-col space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <div className="animate-fadeIn animate-delay-100">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full bg-gray-700 border-gray-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Link
                className="text-xs text-gray-400 hover:text-white hover:underline transition-all"
                href="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="animate-fadeIn animate-delay-200">
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Your password"
                required
                className="w-full bg-gray-700 border-gray-600"
              />
            </div>
          </div>
        </div>

        <div className="animate-fadeIn animate-delay-300">
          <SubmitButton
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90"
            pendingText="Signing in..."
            formAction={signInAction}
          >
            Sign in
          </SubmitButton>
        </div>

        <FormMessage message={message} />
      </form>
    </AuthLayout>
  );
}
