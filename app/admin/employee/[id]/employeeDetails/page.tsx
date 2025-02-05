import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/Cards'
import Image from 'next/image'
import { IoChevronBackSharp } from "react-icons/io5";


export default function EmployeeDetails() {


    const handleSubmit = (e: React.FormEvent) => {
       
      };

  return (
    <div className='px-14 py-6'>
        <div className='flex gap-x-2 items-center mb-6'>
            <IoChevronBackSharp size={25} />
            <span className='bg-clip-text 
            text-transparent bg-gradient-to-r from-fromGreetGradient 
            via-throughGreet to-primary text-2xl font-semi'>
            Back to records
            </span>
        </div>
        <div className='flex gap-x-14'>
            <Card className='w-[25%] bg-gradient-to-t from-fromGradient via-throughGradient to-primary'>
                <CardHeader className='border-white border-b-2'>
                    <CardTitle className='text-white'>Employee</CardTitle>
                </CardHeader>
                <CardContent className='mt-12 flex flex-col items-center pb-10'>
                    <div className='w-44 h-44 rounded-full relative overflow-hidden'>
                        <Image src={'/user.jpg'} fill className="object-cover" alt="user image"/>
                    </div>
                    <div className='flex flex-col items-center mt-6 gap-y-1'>
                        <p className='text-white'>Lisa Ademola</p>
                        <div className='border-white border-2 max-w-fit rounded-[7px] px-[10px] py-[5px]'>
                            <p className='text-white'>HR Assistant</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center text-white text-[12px] mt-6'>
                        <p>trigmark87@gmail.com</p>
                        <p>+234 8104870343</p>
                    </div>
                </CardContent>
            </Card>

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
                            <div className='bg-lightGrey w-2/3 p-2'>Ademola Lisa Ebunoluwa</div>
                        </div>
                        <div className="mb-2 flex gap-x-24 items-center">
                            <div className='w-max'>
                                <label className="font-medium">Gender</label>
                            </div>
                            <div className='bg-lightGrey w-2/3 p-2'>Female</div>
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
                            <div className='bg-lightGrey w-2/3 p-2'>lissarey123@gmail.com</div>
                        </div>
                        <div className="mb-2 flex gap-x-10 items-center">
                            <label className="font-medium">Phone Number</label>
                            <div className='bg-lightGrey w-2/3 p-2'>+234-8104870343</div>
                        </div>
                        <div className="mb-2 flex gap-x-10 items-center">
                            <label className="font-medium">Residential Address</label>
                            <div className='bg-lightGrey w-2/3 p-2'>18th Avenue Boma quarters, Opp. Coca Cola Junction</div>
                        </div>
                    </div>
                </form>
                </CardContent>
            </Card>

            

        </div>
        <div className='mt-6'>
            <Card className='flex-1 bg-white'>
                <CardHeader className='border-primary border-b-2'>
                    <CardTitle className='text-primary'>Official information</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="mt-10">
                            <div className="mb-2 flex gap-x-20 items-center">
                                <div className='w-max'>
                                    <label className="font-medium">Full Name</label>
                                </div>
                                <div className='bg-lightGrey w-2/3 p-2'>Ademola Lisa Ebunoluwa</div>
                            </div>
                            <div className="mb-2 flex gap-x-24 items-center">
                                <div className='w-max'>
                                    <label className="font-medium">Gender</label>
                                </div>
                                <div className='bg-lightGrey w-2/3 p-2'>Female</div>
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
                                <div className='bg-lightGrey w-2/3 p-2'>lissarey123@gmail.com</div>
                            </div>
                            <div className="mb-2 flex gap-x-10 items-center">
                                <label className="font-medium">Phone Number</label>
                                <div className='bg-lightGrey w-2/3 p-2'>+234-8104870343</div>
                            </div>
                            <div className="mb-2 flex gap-x-10 items-center">
                                <label className="font-medium">Residential Address</label>
                                <div className='bg-lightGrey w-2/3 p-2'>18th Avenue Boma quarters, Opp. Coca Cola Junction</div>
                            </div>
                        </div>
                    </form>
                </CardContent>
                </Card>
            </div>
    </div>
  )
}
