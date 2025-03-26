"use client"

import React, { useEffect, useState } from 'react'
import GraphComponent from '@/components/Charts'
import { Calendar } from "@/components/Calendar"
import { fetchEmployees } from '@/apiService'




type User = {
  id: string;
  firstname: string;
  lastName: string;
  email: string;
  accessToken: string;
  companyId: string;
};


export default function Home() {
  const [userData, setUserData] = useState<User | null>(null);
  const [date, setDate] = React.useState<Date | undefined>(new Date())


  useEffect(() => {
    const getInitData = async () => {

       if (typeof window !== "undefined") {

      try {

        const storedUser = localStorage.getItem("userInfo");
        const token = sessionStorage.getItem("accessToken");
       
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser); // Update state

        console.log(parsedUser)
        // Fetch employees only if userData and token exist
        if (token && parsedUser?.companyId) {
          const employees = await fetchEmployees(token, parsedUser.companyId);
          console.log(employees)
          await localStorage.setItem("Employees", JSON.stringify(employees))
        }
      }
      } catch(err) {
        console.log(err)
      }
    }
  }
    getInitData();
  }, []);


  return (
    <div className='pl-4'>
      <div className='flex flex-col w-[100%]'>
        <div className='font-semibold text-[25px] mt-4'>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-fromGreetGradient via-throughGreet to-primary'>{`Welcome, ${userData?.firstname}`}</span>
        </div>
        <div className='w-[100%] flex flex-col xs:flex-row xs:gap-x-4 sm:gap-x-8 mr-4'>
          <div className='w-full pr-4'>
                <div className='flex gap-y-6 flex-col lg:flex-row pl-2 pb-2 md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-2 md:max-h-[350px] lg:max-h-[150px]'>
                  <div className='bg-gradient-to-t from-fromGreenCard to-toGreenCard 
                  p-2 text-white rounded-xl md:flex md:flex-col md:justify-between lg:block'>
                    <div>
                      <p className='font-light'>Wallet Balance</p>
                      <h5 className='text-xl md:text-2xl'>₦500,972.00</h5>
                    </div>
                    <button className='mt-6 bg-black text-[8px] py-1 px-2'>Add fund</button>
                  </div>
                  <div className='bg-gradient-to-t from-fromOrangeCard to-toOrangeCard 
                  p-2 text-white rounded-xl md:flex md:flex-col md:justify-between lg:block'>
                    <div>
                      <p className='font-light'>Payroll Size</p>
                      <h5 className='text-xl md:text-2xl'>₦450,072.00</h5>
                    </div>
                    <div className='mt-6 bg-white text-black text-[8px] py-1 px-2 flex justify-around gap-16'>
                      <p>Next pay date</p>
                      <p>8days Left</p>
                    </div>
                  </div>
                  <div className='bg-black p-2 text-white rounded-xl md:flex md:flex-col md:justify-between lg:block'>
                    <div>
                      <p className='font-light'>Total Employee</p>
                      <h5 className='text-xl md:text-2xl'>150 Employees</h5>
                    </div>
                    <div className='mt-6 bg-black text-[8px] py-1 px-2 flex gap-6'>
                      <p>88 Female</p>
                      <p>62 Male</p>
                    </div>
                  </div>
              </div>

              <div className='hidden my-10 md:block'>
                  <GraphComponent />
              </div>

          </div>
        
          <div className='mb-15 mt-10 xs:mt-0 xs:pr-4 flex flex-col px-6'>
            <div className='bg-gradient-to-t from-fromGradient via-throughGradient to-primary flex justify-center rounded-xl'>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md scale-[0.8]"
              />
            </div>
            <div className='mt-2 mb-4 bg-white pb-8 rounded-xl border-b'>
              <div className='bg-primary font-medium rounded-t-xl text-white text-[15px] flex items-center px-[6px] py-[10px]'>
                March Birthdays
              </div>
              <div className='my-1'>
                <div className='flex justify-between text-[16px] font-regular px-2 border-b'>
                    <div>Hellen Adewoye</div>
                    <div>2nd</div>
                </div>
                <div className='flex justify-between text-[16px] font-regular px-2 border-b'>
                    <div>Ademola Ayeni</div>
                    <div>10th</div>
                </div>
              <div className='flex justify-between text-[16px] font-regular px-2 border-b'>
                  <div>Samuel Adegoke</div>
                  <div>20th</div>
              </div>
              <div className='flex justify-between text-[16px] font-regular px-2 border-b'>
                  <div>Muyiwa Dosunmu</div>
                  <div>26th</div>
              </div>
              <div className='flex justify-between text-[16px] font-regular px-2 border-b'>
                  <div>Samson Oluwadare</div>
                  <div>31st</div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className='my-10 w-[90vw] bg-green-500 md:hidden'>
            <GraphComponent />
        </div>
      </div>
      
    </div>
  )
}
