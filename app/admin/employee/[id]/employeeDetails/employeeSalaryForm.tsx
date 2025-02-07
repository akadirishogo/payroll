import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from '@/app/components/Cards'
import { Input } from '@/app/components/Inputs';
import { IoCheckmarkOutline } from "react-icons/io5";
import { FiEdit, FiCheck } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import users from '@/Employees'





interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    deductions: any;
    email: string;
    role: string;
    startDate: any;
    monthlyGross: any;
    netSalary: string;
    department: string;
    phoneNumber: string
  }



function EmployeeSalaryForm({employeeDetails}: any) {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedDeduction, setSelectedDeduction] = useState<string>("");
    const [deductions, setDeductions] = useState<{ name: string; amount: string }[]>([]);
    const [selectedAllowance, setSelectedAllowance] = useState<string>(""); 
    const [allowances, setAllowances] = useState<{ name: string; amount: string }[]>([]);
    const [tempSalary, setTempSalary] = useState(employeeDetails?.monthlyGross || "");


    const handleEditClick = () => {
        setTempSalary(""); // Clears input field
        setIsEditing(true);
      };

      const handleSaveClick = () => {
        // Ensure the employeeDetails object gets updated properly
        if (employeeDetails) {
            employeeDetails.monthlyGross = tempSalary; // Temporary, should ideally be part of a state update
        }
        setIsEditing(false);
      };

      const handleInputChange = (value: string) => {
        setTempSalary(value);
    };

      // Allowance options
        const ALLOWANCE_OPTIONS = [
            "Transport Allowance",
            "Wardrobe Allowance",
            "Bonus"
        ];

        const DEDUCTION_OPTIONS = [
            "Loan Repayments",
            "Advance Repayments",
            "Monthly deductions"
        ]

 // Handle input change for added allowances
 const handleAllowanceChange = (index: number, value: string) => {
    setAllowances((prev) =>
        prev.map((allowance, i) =>
            i === index ? { ...allowance, amount: value } : allowance
        )
    );
};


// Handle input change for added allowances
const handleDeductionChange = (index: number, value: string) => {
    setDeductions((prev) =>
        prev.map((deduction, i) =>
            i === index ? { ...deduction, amount: value } : deduction
        )
    );
};


 // Add selected allowance to the UI
 const handleAddDeduction = () => {
    if (selectedDeduction && !deductions.some(a => a.name === selectedDeduction)) {
        setDeductions([...deductions, { name: selectedDeduction, amount: "" }]);
    }
};


   // Add selected allowance to the UI
   const handleAddAllowance = () => {
    if (selectedAllowance && !allowances.some(a => a.name === selectedAllowance)) {
        setAllowances([...allowances, { name: selectedAllowance, amount: "" }]);
    }
};

// Remove allowance from UI
const handleRemoveAllowance = (index: number) => {
    setAllowances((prev) => prev.filter((_, i) => i !== index));
};

const handleRemoveDeduction = (index: number) => {
    setDeductions((prev) => prev.filter((_, i) => i !== index));
};

    return (
        <div className='ml-4 mt-10 flex gap-x-24'>
        <Card className='w-[30%]'>
            <CardHeader className='border-lightGrey border-b-2'>
                <CardTitle className='text-black'>Basic Earnings</CardTitle>
            </CardHeader>
            <CardContent className='mt-6 flex flex-col pb-10'>
                <form className="" onSubmit={(e) => e.preventDefault()}>
                    
                    <div className="mb-2">
                        <label className="font-medium">Basic Salary</label>
                        <div className="flex items-center gap-x-4">
                            <Input  
                            type="text"
                            value={isEditing ? tempSalary : employeeDetails?.monthlyGross || ""}
                            onChange={(e) => handleInputChange(e.target.value)}
                            className='w-40'
                            disabled={!isEditing}
                            />
                            {isEditing ? (
            <button
              type="button"
              onClick={handleSaveClick} // Save new value
              className="bg-primary text-[12px] text-white w-8 h-8 rounded-full flex items-center justify-center"
            >
              <FiCheck size={20} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleEditClick} // Enable edit mode & clear input
              className="bg-primary text-[12px] text-white w-8 h-8 rounded-full flex items-center justify-center"
            >
              <FiEdit size={20} />
            </button>
          )}
                        </div>
                    </div>
                

                     {/* Render Added Allowances */}
                     {allowances.map((allowance, index) => (
                        <div key={index} className="mt-4">
                            <label className="font-medium">{allowance?.name}</label>
                            <div className="flex items-center gap-x-4">
                                <Input
                                    type="text"
                                    value={allowance?.amount}
                                    onChange={(e) => handleAllowanceChange(index, e.target.value)}
                                    className='w-40'
                                />
                                <button
                                    onClick={() => handleRemoveAllowance(index)}
                                    className="bg-unPaid text-white w-8 h-8 rounded-full flex items-center justify-center"
                                >
                                    <IoCloseOutline size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                    
                </form>
                 {/* Allowance Selection */}
                 <div className="mt-4">
                        <label className="font-regular">Add Allowance</label>
                        <div className="flex items-center gap-x-4">
                            <select
                                className="border p-2 rounded"
                                value={selectedAllowance}
                                onChange={(e) => setSelectedAllowance(e.target.value)}
                            >
                                <option className="font-semi" value="">Select Allowance</option>
                                {ALLOWANCE_OPTIONS.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleAddAllowance}
                                className="bg-primary flex justify-center items-center text-white w-8 h-8 rounded-full"
                            >
                                <GoPlus size={20} />    
                            </button>
                        </div>
                    </div>

                   
            </CardContent>
        </Card>
        <Card className='w-[30%]'>
            <CardHeader className='border-lightGrey border-b-2'>
                <CardTitle className='text-black'>Deductions</CardTitle>
            </CardHeader>
            <CardContent className='mt-6 flex flex-col items-start pb-10'>
                     {/* Render Added Deductions */}
                     {deductions.map((deduction, index) => (
                        <div key={index} className="mb-4">
                            <label className="font-medium">{deduction?.name}</label>
                            <div className="flex items-start gap-x-4">
                                <Input
                                    type="text"
                                    value={deduction?.amount}
                                    onChange={(e) => handleDeductionChange(index, e.target.value)}
                                    className='w-40'
                                />
                                <button
                                    onClick={() => handleRemoveDeduction(index)}
                                    className="bg-unPaid text-white w-8 h-8 rounded-full flex items-center justify-center"
                                >
                                    <IoCloseOutline size={20} />
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="">
                        <label className="font-regular">Add Deductions</label>
                        <div className="flex items-center gap-x-4">
                            <select
                                className="border p-2 rounded"
                                value={selectedDeduction}
                                onChange={(e) => setSelectedDeduction(e.target.value)}
                            >
                                <option className="font-semi" value="">Select Deductions</option>
                                {DEDUCTION_OPTIONS.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleAddDeduction}
                                className="bg-primary flex justify-center items-center text-white w-8 h-8 rounded-full"
                            >
                                <GoPlus size={20} />    
                            </button>
                        </div>
                    </div>
            </CardContent>
        </Card>
    </div>
    );
}

export default EmployeeSalaryForm;
