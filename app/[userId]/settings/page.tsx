"use client";

import BankDetails from "@/components/userSettings/bankDetails";
import ProfileDetails from "@/components/userSettings/profileDetails";


export default function SettingsPage() {

  return (
    <div className="px-4">
        <div className='font-semibold text-[25px] mb-4 px-4'>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-fromGreetGradient via-throughGreet to-primary'>
            Settings
          </span>
        </div>
        <ProfileDetails/>
        <BankDetails />        
    </div>
  );
}
