import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';


const SignUpForm = () => {
    const [formData, setFormData] = useState({
      email: "",
      password: "",
      confirmPassword: "",
      id: ""
    });
  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getSignIn = () => {
        router.push('/signin')
    }
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError("");
  
      if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match!");
          return;
        }

         // Generate a unique ID for the new user
         const newUserId = uuidv4();

         // Simulate storing user (for now, just logging it)
         const newUser = { ...formData, id: newUserId };
         console.log("New User:", newUser);
  
      setLoading(false);

      router.push(`/profile?id=${newUserId}`)
  
      }


return (
    <div className="flex items-center justify-center">
        <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semi text-center mb-4">Sign Up</h2>
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
            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full p-3 border border-gray-300 rounded-[7px]"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
            />
            <button
            type="submit"
            className="w-full bg-primary text-white p-3 rounded-[7px] font-semibold"
            >
            {loading ? "Registering..." : "Register"}
            </button>            
            </form>
            <div 
                onClick={getSignIn}
                 className="flex justify-center font-regular mb-12 mt-2 cursor-pointer">
                <p>Already have an account? </p>
                <p className="text-primary ml-2">Sign In</p>
            </div>
            <div className="flex justify-center mt-10">
                <Image height={50} width={100} src={'/logo_blue.png'} alt="logo"/>
            </div>
        </div>
    </div>
    )
}


    export default SignUpForm;