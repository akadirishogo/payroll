import React from 'react'
import { MdCameraAlt } from "react-icons/md";
import { Colors } from "@/Colors";

export default function UploadPhoto() {
  return (
    <>
        <div className="mt-6 bg-lightGrey w-40 h-40 rounded-full flex flex-col items-center justify-center">
            <MdCameraAlt size={70} color={Colors.greyBorder} />
            <p className="text-greyBorder font-regular text-[15px]">Upload photo</p>
        </div>
    </>
  )
}
