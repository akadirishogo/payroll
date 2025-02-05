"use client";
import Signup from "./auth/signup/page";

import Image from "next/image";
import SignupForm from "./auth/signup/page";
import SigninForm from "./auth/signin/page";
import ResetPassword from "./auth/reset-password/page";
import CreateNewPassword from "./auth/reset-password/[token]/CreateNewPassword";
import { useState } from "react";


export default function Auth() {
  const [activeComponent, setActiveComponent] = useState("signin");

 
  return (
    <>
      {activeComponent === "signin" && <SigninForm onSwitch={() => setActiveComponent("signup")} onReset={() => setActiveComponent("reset")} />}
      {activeComponent === "signup" && <SignupForm onSwitch={() => setActiveComponent("signin")} />}
      {activeComponent === "reset" && <ResetPassword onSwitch={() => setActiveComponent("signup")} />}
    </>
  )
}