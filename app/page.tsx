"use client";

import Form from "@/components/userAuthForms/Form";
import LandingLayout from "@/components/layouts/LandingLayout";
import { useRouter } from "next/navigation";





import React from "react";


export default function LandingPage() {

  const router = useRouter()

 
  return (
   <LandingLayout>
      <Form />
   </LandingLayout>
  )
}