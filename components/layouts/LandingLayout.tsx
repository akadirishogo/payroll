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
    <div className="relative bg-backImage min-h-[100vh] min-[1137px]:w-[100%]">
      <div className="pt-8 absolute inset-0 bg-primary bg-opacity-70 md:px-5">
        <div className="pl-8 xl:h-[35px] flex">
            <Image height={50} width={150} src={"/logo_white.png"} alt="logo" />
        </div>
        <div className="flex xl:pr-[20px] items-center justify-around h-[95%]">
            <div className="">
                <div className="2xl:pl-[5px] md:pl-[20px] max-[400px]:ml-[20px] min-[400px]:ml-[20px]">
                    <p className="font-boldItalic text-7xl max-[500px]:text-[40px] 2xl:text-8xl inline-block mr-3 text-splash">Smart</p><p className="inline-block 
                    font-extraBold text-7xl 2xl:text-8xl text-white max-[500px]:text-[40px]"> Payroll for</p>
                    <p className="font-extraBold max-[500px]:text-[40px] text-7xl 2xl:text-8xl text-white">Businesses</p>
                </div>
                <div className="w-[80%] md:pl-[20px] max-[400px]:ml-[20px] min-[400px]:ml-[20px] ">
                    <p className="text-white text-[20px] 2xl:text-[30px] max-[500px]:text-[15px] font-regular">Start managing your workforce Salaries with
                        automation, precision and security. </p>
                </div>
                <button
                    onClick={getStarted}
                    className="bg-primary rounded-2xl max-[500px]:text-[10px] max-[400px]:ml-[20px] min-[400px]:ml-[20px] text-white px-7 py-3 mt-10 
                    font-semi tracking-widest xl:px-9 xl:py-4 2xl:text-[25px]">
                    Get Started
                </button>
            </div>
            {children}
        </div>
      </div>
    </div>
  );
}
