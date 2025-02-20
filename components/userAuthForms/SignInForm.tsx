'use client;'


import React, { useState } from "react";
import { useRouter } from "next/navigation";
import users from '@/Employees';
import Image from "next/image";







const SignInForm = () => {
    const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const [formData, setFormData] = useState({
     email: "",
     password: "",
   });

   const router = useRouter();

   const goToDashboard = () => {
    setLoading(true)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!formData.password) {
      setError('Enter your password.')
      setLoading(false)
      return;
    }

    const user = users.find((user) => user.email === formData.email);

  if (user) {
    router.push(`${user.id}/home`);
  } else {
    setError("User does not exist");
  }

  setLoading(false);
  }

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    setError('')
    setLoading(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    

return (
    <div className="flex items-center justify-center">
        <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 font-regular">
            <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-[7px]"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Set Password"
                className="w-full p-3 border border-gray-300 rounded-[7px]"
                value={formData.password}
                onChange={handleChange}
                required
            />
        <button
        onClick={()=>goToDashboard()}
        type="submit"
        className="w-full bg-primary text-white p-3 rounded-[7px] font-semibold"
        disabled={loading}
        >
        {loading ? "Please wait..." : "Sign In"}
        </button>
                    
        </form>
        <div className="flex justify-center font-regular mb-12">
            <p>Forgot Password? </p>
            <p className="text-primary ml-2">Reset</p>
        </div>
        <div className="flex justify-center mt-20 -mb-4">
            <Image height={40} width={100} src={'/logo_blue.png'} alt="logo"/>
        </div>
    </div>
    </div>
        )
}   

export default SignInForm;