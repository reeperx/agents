import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { signUpAction } from "@/app/actions";
import AuthLayout from "@/components/auth-layout";
import { SignUpIllustration } from "@/components/auth-illustrations";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center p-4 sm:max-w-md">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <AuthLayout
      title="Create Account"
      subtitle={
        <>
          Already have an account?{" "}
          <Link
            className="text-cyan-400 font-medium hover:underline transition-all"
            href="/sign-in"
          >
            Sign in
          </Link>
        </>
      }
      illustration={<SignUpIllustration />}
    >
      <form className="flex flex-col space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name" className="text-sm font-medium">
              Full Name
            </Label>
            <div className="animate-fadeIn animate-delay-100">
              <Input
                id="full_name"
                name="full_name"
                type="text"
                placeholder="John Doe"
                required
                className="w-full bg-gray-700 border-gray-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <div className="animate-fadeIn animate-delay-200">
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
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="animate-fadeIn animate-delay-300">
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Your password"
                minLength={6}
                required
                className="w-full bg-gray-700 border-gray-600"
              />
            </div>
          </div>
        </div>

        <div className="animate-fadeIn" style={{ animationDelay: "400ms" }}>
          <SubmitButton
            formAction={signUpAction}
            pendingText="Signing up..."
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90"
          >
            Sign up
          </SubmitButton>
        </div>

        <FormMessage message={searchParams} />
        <SmtpMessage />
      </form>
    </AuthLayout>
  );
}
