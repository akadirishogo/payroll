"use client"

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Cards'

export default function EmployeePersonal({details}) {

  return (
    <Card className='flex-1 bg-white'>
    <CardHeader className='border-primary border-b-2'>
        <CardTitle className='text-primary'>Personal information</CardTitle>
    </CardHeader>
    <CardContent>
    <form>
        <div className="mt-10">
            <div className="mb-2 flex gap-x-4 lg:gap-x-14 items-center">
                <div className='lg:w-max'>
                    <label className="font-medium text-[10px] md:text-[13px] lg:text-[15px]">Full Name</label>
                </div>
                <div className='bg-lightGrey text-[10px] md:text-[13px] lg:text-[15px] lg:w-2/3 p-2'>{details?.firstname} {details?.lastname}</div>
            </div>
            <div className="mb-2 flex gap-x-6 lg:gap-x-24 items-center">
                <div className='lg:w-max'>
                    <label className="font-medium text-[10px] md:text-[13px] lg:text-[15px]">Gender</label>
                </div>
                <div className='bg-lightGrey lg:w-2/3 text-[10px] md:text-[13px] lg:text-[15px] p-2'>{details?.gender ? details.gender : "Unknown"}</div>
            </div>
            <div className="mb-2 flex gap-x-4 lg:gap-x-12 items-center">
                <label className="font-medium text-[10px] md:text-[13px] lg:text-[15px]">Marital Status</label>
                <div className='bg-lightGrey lg:w-2/3 text-[10px] md:text-[13px] lg:text-[15px] p-2'>Single</div>
            </div>
            <div className="mb-2 flex gap-x-6 lg:gap-x-14 items-center">
                <label className="font-medium text-[10px] md:text-[13px] lg:text-[15px]">Date Of Birth</label>
                <div className='bg-lightGrey p-2 text-[10px] md:text-[13px] lg:text-[15px]'>10th October, 1987</div>
            </div>
            <div className="mb-2 flex gap-x-6 lg:gap-x-28 items-center">
                <label className="font-medium text-[10px] md:text-[13px] lg:text-[15px]">Email</label>
                <div className='bg-lightGrey lg:w-2/3 text-[10px] md:text-[13px] lg:text-[15px] p-2'>{details?.email}</div>
            </div>
            <div className="mb-2 flex gap-x-6 lg:gap-x-10 items-center">
                <label className="font-medium text-[10px] md:text-[13px] lg:text-[15px] ">Phone Number</label>
                <div className='bg-lightGrey text-[10px] md:text-[13px] lg:text-[15px] lg:w-2/3 p-2'>{details?.phone}</div>
            </div>
            <div className="mb-2 flex gap-x-6 lg:gap-x-10 items-center">
                <label className="font-medium text-[10px] md:text-[13px] lg:text-[15px]">Residential Address</label>
                <div className='bg-lightGrey text-[10px] md:text-[13px] lg:text-[15px] lg:w-2/3 p-2'>18th Avenue Boma quarters, Opp. Coca Cola Junction</div>
            </div>
        </div>
    </form>
    </CardContent>
</Card>
  )
}
