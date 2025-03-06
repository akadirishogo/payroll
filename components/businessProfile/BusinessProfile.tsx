import React, { useState } from 'react'
import { registerBusiness } from '@/apiService';
import { useRouter, useSearchParams } from 'next/navigation';


  



export default function BankProfile() {
    const [loading, setLoading] = useState(false)
    const [businessData, setBusinessData] = useState({
        businessName: "",
        businessAddress: "",
    })

    const router = useRouter()
    const searchParams = useSearchParams();
    const id = Number(searchParams.get("id")); // Convert to number
  




      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBusinessData({ ...businessData, [e.target.name]: e.target.value });
      };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        console.log(businessData)
        const result = await registerBusiness(id, businessData.businessName, businessData.businessAddress)
       setBusinessData({
          businessName: businessData.businessName,
          businessAddress: businessData.businessAddress
       })
       alert(result?.message)
       setLoading(false)
       router.push("/signin")
      };


      console.log(id)
    

  return (
    <>
      <p className="font-semi mt-14">Business Profile</p>
      <div className="border-2 rounded-xl px-10 py-5 mt-2 space-y-4 mb-10">
        <div>
            <form onSubmit={handleSubmit} className="gap-x-2">
              <div className="flex gap-x-4 font-regular">
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
              
                <div className="flex flex-col w-[40%] font-regular">
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
            <button className="mt-6 bg-primary text-white px-10 py-[2px] font-regular rounded-[5px]">
              {loading ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
