import React, { useState } from 'react'
import { updateAdminRecords } from '@/apiService';
import useStore from "@/store/employeeStore";




export default function PersonalProfile() { 
    const [loading, setLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(false); 
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phoneNumber: ""
      });

      const setUser = useStore((state) => state.setUser);

    

    // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const editButton = () => {
    setIsSaved(false)
  }


  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(formData)
      const result = await updateAdminRecords(formData); 
      console.log(result)
      setUser(formData)
      setIsSaved(true);
      console.log(result?.message)// Save details to DB // Redirect to dashboard after saving
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
                <div className="flex flex-col w-full font-regular">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        value={formData.firstname}
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
                        name="lastname"
                        placeholder="Last Name"
                        value={formData.lastname}
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
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSaved}
                        required
                        className="flex-1 px-4 py-2 border rounded"
                    />
                </div>
            </div>
           
            <div className='flex justify-end'>
            <button onClick={handleSubmit} className="mt-6 bg-primary text-white px-10 py-[2px] font-regular rounded-[5px]">
              {loading ? "Saving profile..." : "Save"}
            </button>

            {isSaved && (
               <button onClick={editButton} className="mt-6 bg-primary text-white px-10 py-[2px] font-regular rounded-[5px] ml-4">
                  Modify
             </button>
            )}
            </div>
            </form>
        </div>

        

       
      </div>
    </>
  )
}
