import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import Loading from '../Loading';
import { updateAdminRecords } from '@/apiService';

type BasicProfileProps = {
  email: string;
};


export default function PersonalProfile({ email }: BasicProfileProps) { 
    const [loading, setLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(false); 
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: email,
        phoneNumber: ""
      });

      const router = useRouter();

    // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData.email)

    try {
      const result = await updateAdminRecords(formData); 
      setIsSaved(true);
      console.log(result?.message)// Save details to DB // Redirect to dashboard after saving
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return <Loading />
  }


  return (
    <>
        <p className="font-semi mt-14">Personal Profile</p>
      <div className="border-2 rounded-xl px-10 py-5 mt-2 space-y-4">
        <div>
            <form onSubmit={handleSubmit} className="gap-x-2">
              <div className="flex gap-x-4">
                <div className="flex flex-col w-full font-regular">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={isSaved}
                        required
                        className="flex-1 px-4 py-2 border rounded"
                    />
                </div>
              
                <div className="flex flex-col w-full font-regular">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={isSaved}
                        required
                        className="flex-1 px-4 py-2 border rounded"
                    />
                </div>
              </div>
            

            <div className="flex w-full gap-x-10 mt-4">
                <div className="flex flex-col min-w-[30%] font-regular">
                <label>Phone number</label>
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    disabled={isSaved}
                    required
                    className="flex-1 px-4 py-2 border rounded"
                />
                </div>

                <div className="flex flex-col w-full font-regular">
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={handleChange}
                        readOnly
                        required
                        className="flex-1 px-4 py-2 border rounded"
                    />
                </div>
            </div>
           
            
            <button onClick={handleSubmit} className="mt-6 bg-primary text-white px-10 py-[2px] font-regular rounded-[5px]">Save</button>
            
            </form>
        </div>

        

       
      </div>
    </>
  )
}
