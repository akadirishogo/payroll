"use client"

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Cards'
import { FaUser } from "react-icons/fa6";
import { Colors } from '@/Colors'




export default function EmployeeIdCard({details}) {

  return (
        <Card className='hidden md:block w-[25%] bg-gradient-to-t from-fromGradient via-throughGradient to-primary'>
            <CardHeader className='border-white border-b-2'>
                <CardTitle className='text-white'>Employee</CardTitle>
            </CardHeader>
            <CardContent className='mt-12 flex flex-col items-center pb-10'>
                <div className='w-44 h-44 rounded-full relative overflow-hidden bg-white flex items-center justify-center'>
                    {details?.profilePictureUrl ? (
                        <img src={`${details?.profilePictureUrl}`} fill className="object-cover" alt="user image"/>
                    ) : (
                        <FaUser color={Colors.greyBorder} size={70} />
                    )}
                    
                </div>
                <div className='flex flex-col items-center mt-6 gap-y-1'>
                    <p className='text-white text-[12px]'>{details?.firstname} {details?.lastname}</p>
                    <div className='border-white border-2 max-w-fit rounded-[7px] px-[10px] py-[5px]'>
                        <p className='text-white text-[12px]'>{details?.department}</p>
                    </div>
                </div>
                <div className='flex flex-col items-center text-white text-[12px] mt-6'>
                    <p>{details?.email}</p>
                    <p>{details?.phone}</p>
                </div>
            </CardContent>
        </Card>
  )
}
