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
                <div className='bg-lightGrey w-2/3 p-2'>{employeeDetails?.firstName} {employeeDetails?.lastName}</div>
            </div>
            <div className="mb-2 flex gap-x-24 items-center">
                <div className='w-max'>
                    <label className="font-medium">Gender</label>
                </div>
                <div className='bg-lightGrey w-2/3 p-2'>{employeeDetails?.gender}</div>
            </div>
            <div className="mb-2 flex gap-x-12 items-center">
                <label className="font-medium">Marital Status</label>
                <div className='bg-lightGrey w-2/3 p-2'>Single</div>
            </div>
            <div className="mb-2 flex gap-x-14 items-center">
                <label className="font-medium">Date Of Birth</label>
                <div className='bg-lightGrey p-2'>10th October, 1987</div>
            </div>
            <div className="mb-2 flex gap-x-28 items-center">
                <label className="font-medium">Email</label>
                <div className='bg-lightGrey w-2/3 p-2'>{employeeDetails?.email}</div>
            </div>
            <div className="mb-2 flex gap-x-10 items-center">
                <label className="font-medium">Phone Number</label>
                <div className='bg-lightGrey w-2/3 p-2'>{employeeDetails?.phoneNumber}</div>
            </div>
            <div className="mb-2 flex gap-x-10 items-center">
                <label className="font-medium">Residential Address</label>
                <div className='bg-lightGrey w-2/3 p-2'>18th Avenue Boma quarters, Opp. Coca Cola Junction</div>
            </div>
        </div>
    </form>
    </CardContent>
</Card>
  )
}
