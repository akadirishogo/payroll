"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from 'next/navigation'


interface LandingLayoutProps {
  children: React.ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {

    const router = useRouter();

    const getStarted = () => {
        router.push("/signup");
      };

  return (
    <div className="relative bg-backImage bg-cover min-h-[100vh]">
      <div className="p-8 absolute inset-0 bg-primary bg-opacity-70">
        <div>
            <Image height={50} width={100} src={"/logo_white.png"} alt="logo" />
        </div>
        <div className="mt-20 flex items-center justify-around -ml-[15px]">
            <div>
                <div>
                    <p className="font-boldItalic text-6xl inline-block mr-3 text-splash">Smart</p><p className="inline-block font-extraBold text-6xl text-white"> Payroll for</p>
                    <p className="font-extraBold text-6xl text-white">Businesses</p>
                </div>
                <div className="w-[80%]">
                    <p className="text-white text-[20px] font-regular">Start managing your workforce Salaries with
                        automation, precision and security. </p>
                </div>
                <button
                    onClick={getStarted}
                    className="bg-primary rounded-2xl text-white px-7 py-3 mt-10 font-semi tracking-widest">
                    Get Started
                </button>
            </div>
            {children}
        </div>
      </div>
    </div>
  );
}
