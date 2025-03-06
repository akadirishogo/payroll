'use client'


import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SignInAdminUser, checkUserRole, SignInUser } from "@/apiService"
import useStore from "@/store/employeeStore";
import ConfirmModal from '@/components/ConfirmAdminModal'





const SignInForm = () => {
    const [loading, setLoading] = useState(false);
    const [userSignIn, setUserSignIn] = useState("Sign in as User")
    const [adminSignIn, setAdminSignIn] = useState("Sign in as Admin")
    const [error, setError] = useState("");
    const [isAdmin, setIsAdmin] = useState(false)
    const [formData, setFormData] = useState({
     email: "",
     password: "",
   });

   const setUser = useStore((state) => state.setUser);

   const router = useRouter();

   
  
  

   const goToDashboard = async () => {
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

    try {

      const role = await checkUserRole(formData.email)
    
      if (role === 'admin') {
        console.log(role)
        setIsAdmin(true); 
        console.log(isAdmin)
        return;
      }

      const userData = await SignInUser(formData)
      if (userData) {
        router.push(`/user/${userData?.user?.id}`)
      }
      setLoading(false);

    }catch(error){
      setError(`${error}`)
    }
  }

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    setError('')
    await goToDashboard();
    setLoading(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const getResetPage = () => {
      router.push('/reset')
    }

    const handleRoleSelect = async (role: "user" | "admin" | "both") => {
        if (role === "admin" || role === "both") {
          setAdminSignIn("Signing in...")
          try {
            const adminUserData = await SignInAdminUser(formData)
            console.log(adminUserData.user)
            if (!adminUserData?.user?.firstname || !adminUserData?.user?.company) {
              const newData = JSON.stringify(adminUserData.user)
              localStorage.setItem("userInfo", newData);
              router.push(`/businessProfile?id=${adminUserData?.user?.id}`)
            } else {
              const bioData = adminUserData?.user;
              const {access_token} = adminUserData;
              if (bioData) {
                setUser(bioData)
                const newData = JSON.stringify(bioData)
                sessionStorage.setItem("accessToken", access_token);
                localStorage.setItem("userInfo", newData);
                router.push(`/admin/${bioData.id}`)
              }
            }
          } catch(error) {
            setError(`Error: ${error}`)
            setLoading(false)
            setIsAdmin(false)
          }
      } else if (role === "user") {
          setUserSignIn('Signing in...') 
          try {

            const userData = await SignInUser(formData)
            if (userData) {
              const employeeData = userData?.user;
              const {access_token} = userData;
              if (employeeData) {
                const employeeInfo = JSON.stringify(employeeData)
                sessionStorage.setItem("accessToken", access_token);
                localStorage.setItem("userInfo", employeeInfo);
                router.push(`/user/${employeeData.id}`)
              }
            }
            setLoading(false)

          } catch(error) {
            setError(`Error: ${error}`)
            setLoading(false)
            setIsAdmin(false)
          }
           
        } else {
          return;
        }
        
    };

    


    

return (
    <div className="flex items-center justify-center">
        <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-6">
        <h2 className="text-xl font-semi text-center mb-4">Sign In</h2>
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
            type="submit"
            className="w-full bg-primary text-white p-3 rounded-[7px] font-semibold"
            disabled={loading}
            >
            {loading ? "Signing in..." : "Sign In"}
          </button>           
        </form>
        <div className="flex justify-center font-regular mb-12">
          <p>Forgot Password? </p>
          <p onClick={getResetPage}
          className="text-primary ml-2 cursor-pointer">
            Reset
          </p>
        </div>
        <div className="flex justify-center mt-20 -mb-4">
          <Image height={40} width={100} src={'/logo_blue.png'} alt="logo"/>
        </div>
      </div>
      {isAdmin && (
        <ConfirmModal title="Confirm user">
            <div className="mt-4">
              <button onClick={() => handleRoleSelect("user")} className="bg-primary text-white px-4 py-2 rounded-md mx-2">
                {userSignIn}
              </button>
              <button onClick={() => handleRoleSelect("admin")} className="text-primary px-4 py-2 rounded-md mx-2 border-2">
                {adminSignIn}
              </button>
            </div>
        </ConfirmModal>
      )}

      {/* Loading Spinner Modal */}
      {/* {loading && (
          <Loading />
        )} */}
    </div>
  )
}   

export default SignInForm;