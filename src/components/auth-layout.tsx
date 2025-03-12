import { ReactNode } from "react";
import ClientAuthLayout from "./client-auth-layout";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: ReactNode;
  illustration: ReactNode;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  illustration,
}: AuthLayoutProps) {
  return (
    <ClientAuthLayout
      title={title}
      subtitle={subtitle}
      illustration={illustration}
    >
      {children}
    </ClientAuthLayout>
  );
}
