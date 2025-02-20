import React, { useState } from 'react'
import { useRouter } from "next/navigation";

export default function PersonalProfile() { 
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        contactAddress: "",
        phoneNumber: ""
      });

      const router = useRouter();

    // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateUserProfile = (data = { ...formData }) => {
    console.log(data)
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUserProfile(formData); // Save details to DB
      router.push("/dashboard"); // Redirect to dashboard after saving
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
        <p className="font-semi mt-14">Personal Profile</p>
      <div className="border-2 rounded-xl px-10 py-5 mt-2 space-y-4">
        <div>
            <form onSubmit={handleSubmit} className="gap-x-2">
              <div className="flex gap-x-4">
                <div className="flex flex-col w-full">
                    <label>Full name</label>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="flex-1 px-4 py-2 border rounded"
                    />
                </div>
              
                <div className="flex flex-col w-full">
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="flex-1 px-4 py-2 border rounded"
                    />
                </div>
              </div>
            

            <div className="flex w-full gap-x-10 mt-4">
                <div className="flex flex-col min-w-[60%]">
                <label>Contact Address</label>
                <input
                    type="text"
                    name="contactAddress"
                    placeholder="Contact Address"
                    value={formData.contactAddress}
                    onChange={handleChange}
                    required
                    className="flex-1 px-4 py-2 border rounded"
                />
                </div>

                <div className="flex flex-col min-w-[30%]">
                <label>Phone number</label>
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone number"
                    value={formData.phoneNumber}
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
