"use client";

import Image from "next/image";
import { useEffect } from "react";
import useStore from "@/store/employeeStore";
import BasicProfile from "@/components/businessProfile/PersonalProfile";
import BusinessProfile from "@/components/businessProfile/BusinessProfile";
import Greet from '@/components/businessProfile/Greet'
import { useSearchParams } from "next/navigation";


interface User {
  id: number;
  email: string;
  firstname: string | null;
  lastname: string | null;
  phone: string | null;
  isActive: boolean;
  isVerified: boolean;
  setupToken: string | null;
  tokenExpiration: string | null;
  userType: "Admin" | "User" | "Other"; // Add other user types if needed
  createdAt: string; // ISO date string (e.g., "2025-03-05T09:59:25.614Z")
  updatedAt: string;
}



export default function ProfileCompletion() {

  

  return (
    <div className="relative">
        <div className="w-full h-14 -mt-[35px] bg-primary px-10 sticky top-0 z-50">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center">
                <Image height={50} width={100} src={'/logo_white.png'} alt="logo"/>
            </div>

            <div className="flex items-center gap-x-4">
              <div className="flex items-center gap-x-2 font-regular">
                <p className="text-[12px] text-white ml-4">Sign out</p>
              </div>
              
            </div>
          </div> 
        </div>
        <div className="min-h-screen bg-white pt-20 pl-28 pr-28">
            <Greet />
            <BasicProfile />
            <BusinessProfile />
        </div>
    </div>
  );
}
