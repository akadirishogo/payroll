import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

  
  

export default function BankProfile() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        contactAddress: "",
        phoneNumber: ""
      });
    const [businessData, setBusinessData] = useState({
        businessName: "",
        businessAddress: "",
    })
      const router = useRouter();




      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
       
      };
    

  return (
    <>
      <p className="font-semi mt-14">Business Profile</p>
      <div className="border-2 rounded-xl px-10 py-5 mt-2 space-y-4 mb-10">
        <div>
            <form onSubmit={handleSubmit} className="gap-x-2">
              <div className="flex gap-x-4">
                <div className="flex flex-col w-[40%]">
                    <label>Business Name</label>
                    <input
                    className='min-w-full p-2 border rounded-lg'
                    name="businessName"
                    placeholder="Business Name"
                    value={businessData.businessName}
                    onChange={handleChange}
                    />
                       
                </div>
              
                <div className="flex flex-col w-[40%]">
                    <label>Business Address</label>
                    <input
                        type="text"
                        name="businessAddress"
                        placeholder="Business Address"
                        value={businessData.businessAddress}
                        onChange={handleChange}
                        required
                        className="flex-1 px-4 py-2 border rounded"
                    />
                </div>
              </div>      
            <button className="mt-6 bg-primary text-white px-10 py-[2px] font-regular rounded-[5px]">Save</button>
          </form>
        </div>
      </div>
    </>
  )
}
