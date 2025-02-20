"use client";

import Image from "next/image";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { FaUser } from "react-icons/fa6";
import UploadPhoto from "@/components/profile/UploadPhoto";
import ProfileGreet from "@/components/profile/ProfileGreet";
import BasicProfile from "@/components/profile/BasicProfile";
import BankProfile from "@/components/profile/BankProfile";



export default function ProfileCompletion() {

  return (
    <div className="relative">
        <div className="absolute top-0 w-full h-14 bg-primary px-10">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center">
                <Image height={50} width={100} src={'/logo_white.png'} alt="logo"/>
            </div>

            <div className="flex items-center gap-x-4">
              <div className="flex items-center">
                <p className="text-[12px] text-white font-regular">CredLock Africa</p>
                <PiBuildingOfficeBold className="w-5 h-5 text-white"/>
              </div>
              <div className="flex items-center gap-x-2 font-regular">
                <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center">
                    <FaUser className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[12px] text-white">Lisa Ademola</p>
                  <p className="text-[12px] text-white">HR Assistant II</p>
                </div>
                <p className="text-[12px] text-white ml-4">Sign out</p>
              </div>
              
            </div>
          </div> 
        </div>
        <div className="min-h-screen bg-white pt-20 pl-28 pr-28">
            <ProfileGreet />
            <UploadPhoto />
            <BasicProfile />
            <BankProfile />
        </div>
    </div>
  );
}
