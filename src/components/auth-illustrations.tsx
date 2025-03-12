import {
  SignInIllustration as ClientSignInIllustration,
  SignUpIllustration as ClientSignUpIllustration,
  ForgotPasswordIllustration as ClientForgotPasswordIllustration,
} from "./client-auth-illustrations";

export function SignInIllustration() {
  return <ClientSignInIllustration />;
}

export function SignUpIllustration() {
  return <ClientSignUpIllustration />;
}

export function ForgotPasswordIllustration() {
  return <ClientForgotPasswordIllustration />;
}
