"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'


interface LandingLayoutProps {
  children: React.ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
    const [isMobile, setIsMobile] = useState(true);
    const router = useRouter();


    // Detect screen size on mount and on resize
  useEffect(() => {
    if (typeof window !== 'undefined') {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 780); // 'sm' breakpoint in Tailwind is 640px
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }
  }, []);


    const getStarted = () => {
      if (isMobile) {
        router.push("../signupMobile");
        return
      }
      router.push('./signup')
    };

  return (
    <div className="relative bg-backImage min-h-[100vh]">
      <div className="pt-6 absolute inset-0 bg-primary bg-opacity-70 sm:px-6 xs:px-6 1xs:px-6">
        <div className="flex">
            <Image height={30} width={100} src={"/logo_white.png"} alt="logo" />
        </div>
        <div className="flex items-center justify-around h-[95%] 1xl:px-10 3xl:px-40">
            <div className="md:w-[600px] 1md:w-[55%] xl:mx-8 1xl:w-[85%]">
                <div className="">
                    <p className="font-boldItalic text-6xl 1xs:text-5xl 1sm:text-6xl xl:text-[65px] 1xl:text-7xl 3xl:text-8xl inline-block mr-3 text-splash">Smart</p><p className="inline-block 
                    font-extraBold text-6xl 1xs:text-5xl 1sm:text-6xl xl:text-[65px] 1xl:text-7xl 3xl:text-8xl text-white"> Payroll for</p>
                    <p className="font-extraBold text-6xl 1xs:text-5xl 1sm:text-6xl xl:text-[65px] 1xl:text-7xl 3xl:text-8xl text-white">Businesses</p>
                </div>
                <div className="md:w-80 1md:w-[500px] 1xl:w-[600px] 3xl:w-[1000px] py-4">
                    <p className="text-white text-lg 1xs:text-sm 1sm:text-lg xl:text-xl 1xl:text-3xl 3xl:text-4xl font-regular">Start managing your workforce Salaries with
                        automation, precision and security. </p>
                </div>
                <button
                    onClick={getStarted}
                    className="bg-primary rounded-2xl text-white px-7 py-3 mt-10 
                    font-semi 1xl:text-[25px] tracking-widest">
                    Get Started
                </button>
            </div>
            {!isMobile && children}
        </div>
      </div>
    </div>
  );
}
