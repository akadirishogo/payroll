import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Cards'

export default function EmployeePersonal({employeeDetails}) {

  return (
    <Card className='flex-1 bg-white'>
    <CardHeader className='border-primary border-b-2'>
        <CardTitle className='text-primary'>Personal information</CardTitle>
    </CardHeader>
    <CardContent>
    <form>
        <div className="mt-10">
            <div className="mb-2 flex gap-x-20 items-center">
                <div className='w-max'>
                    <label className="font-medium">Full Name</label>
                </div>
                <div className='bg-lightGrey w-2/3 p-2'>{employeeDetails?.firstname} {employeeDetails?.lastname}</div>
            </div>
            <div className="mb-2 flex gap-x-24 items-center">
                <div className='w-max'>
                    <label className="font-medium">Gender</label>
                </div>
                <div className='bg-lightGrey w-2/3 p-2'>{employeeDetails?.gender || "N/A"}</div>
            </div>
            <div className="mb-2 flex gap-x-12 items-center">
                <label className="font-medium">Marital Status</label>
                <div className='bg-lightGrey w-2/3 p-2'>{employeeDetails?.maritalStatus || "N/A"}</div>
            </div>
            <div className="mb-2 flex gap-x-14 items-center">
                <label className="font-medium">Date Of Birth</label>
                <div className='bg-lightGrey p-2'>{employeeDetails?.DOB || "N/A"}</div>
            </div>
            <div className="mb-2 flex gap-x-28 items-center">
                <label className="font-medium">Email</label>
                <div className='bg-lightGrey w-2/3 p-2'>{employeeDetails?.email}</div>
            </div>
            <div className="mb-2 flex gap-x-10 items-center">
                <label className="font-medium">Phone Number</label>
                <div className='bg-lightGrey w-2/3 p-2'>{employeeDetails?.phone}</div>
            </div>
            <div className="mb-2 flex gap-x-10 items-center">
                <label className="font-medium">Residential Address</label>
                <div className='bg-lightGrey w-2/3 p-2'>{employeeDetails?.residentialAddress || "N/A"}</div>
            </div>
        </div>
    </form>
    </CardContent>
</Card>
  )
}
