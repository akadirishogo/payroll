"use client";

import React, { useState } from "react";
import SignUpForm from "./SignUpForm";



export default function Form(){
  const [currentForm, setCurrentForm] = useState(<SignUpForm />);


 

  return (
    <div>
        {currentForm}
    </div>              
       
  );
}