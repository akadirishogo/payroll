import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Cards'

export default function EmployeePersonal({employeeDetails}) {

  return (
    <Card className='lg:w-[75%] bg-white'>
    <CardHeader className='border-primary border-b-2'>
        <CardTitle className='text-primary text-[12px]'>Personal information</CardTitle>
    </CardHeader>
    <CardContent>
    <form>
        <div className="mt-10">
            <div className="mb-2 flex gap-x-6 items-center">
                <div className='w-max'>
                    <label className="font-medium lg:text-[15px] text-[10px]">Full Name</label>
                </div>
                <div className='bg-lightGrey w-2/3 p-2 lg:text-[15px] text-[10px]'>{employeeDetails?.firstname} {employeeDetails?.lastname}</div>
            </div>
            <div className="mb-2 flex gap-x-4 items-center">
                <div className='w-max'>
                    <label className="font-medium lg:text-[15px] text-[10px]">Gender</label>
                </div>
                <div className='bg-lightGrey lg:text-[15px] text-[10px] w-2/3 p-2'>{employeeDetails?.gender || "N/A"}</div>
            </div>
            <div className="mb-2 flex gap-x-6 items-center">
                <label className="font-medium lg:text-[15px] text-[10px]">Marital Status</label>
                <div className='bg-lightGrey lg:text-[15px] text-[10px] w-2/3 p-2'>{employeeDetails?.maritalStatus || "N/A"}</div>
            </div>
            <div className="mb-2 flex gap-x-6 items-center">
                <label className="font-medium lg:text-[15px] text-[10px]">Date Of Birth</label>
                <div className='bg-lightGrey lg:text-[15px] text-[10px] w-2/3 p-2'>{employeeDetails?.DOB || "N/A"}</div>
            </div>
            <div className="mb-2 flex gap-x-6 items-center">
                <label className="font-medium lg:text-[15px] text-[10px]">Email</label>
                <div className='bg-lightGrey lg:text-[15px] text-[10px] w-2/3 p-2'>{employeeDetails?.email}</div>
            </div>
            <div className="mb-2 flex gap-x-4 items-center">
                <label className="font-medium lg:text-[15px] text-[10px]">Phone Number</label>
                <div className='bg-lightGrey lg:text-[15px] text-[10px] w-2/3 p-2'>{employeeDetails?.phone}</div>
            </div>
            <div className="mb-2 flex gap-x-4 items-center">
                <label className="font-medium lg:text-[15px] text-[10px]">Residential Address</label>
                <div className='bg-lightGrey lg:text-[15px] text-[10px] w-2/3 p-2'>{employeeDetails?.residentialAddress || "N/A"}</div>
            </div>
        </div>
    </form>
    </CardContent>
</Card>
  )
}
