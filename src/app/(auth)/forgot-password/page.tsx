import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { forgotPasswordAction } from "@/app/actions";
import AuthLayout from "@/components/auth-layout";
import { ForgotPasswordIllustration } from "@/components/auth-illustrations";

export default async function ForgotPassword(props: {
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
      title="Reset Password"
      subtitle={
        <>
          Remember your password?{" "}
          <Link
            className="text-cyan-400 font-medium hover:underline transition-all"
            href="/sign-in"
          >
            Sign in
          </Link>
        </>
      }
      illustration={<ForgotPasswordIllustration />}
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
        </div>

        <div className="animate-fadeIn animate-delay-200">
          <SubmitButton
            formAction={forgotPasswordAction}
            pendingText="Sending reset link..."
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90"
          >
            Reset Password
          </SubmitButton>
        </div>

        <FormMessage message={searchParams} />
        <SmtpMessage />
      </form>
    </AuthLayout>
  );
}
