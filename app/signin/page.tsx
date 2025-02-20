"use client";

import LandingLayout from "@/components/layouts/LandingLayout";
import SignInForm from "@/components/userAuthForms/SignInForm";

export default function SignInPage() {
  return (
    <LandingLayout>
      <SignInForm />
    </LandingLayout>
  );
}