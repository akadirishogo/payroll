"use client";


import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Cards'
import { Input } from '@/components/Inputs';
import { FiEdit, FiCheck } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { useEmployeeStore } from '@/store/employeesStore';
import { IoChevronBackSharp } from "react-icons/io5"
import { useParams, useRouter } from 'next/navigation';








// const userData = JSON.parse(localStorage.getItem("userInfo") || "{}")
// const localEmployeesStore = JSON.parse(localStorage.getItem("Employees"))

function EmployeeSalaryForm() {
    const { updateEmployee } = useEmployeeStore();
    const params = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [employees, setEmployees] = useState([])
    const [employee, setEmployee] = useState()
    const [selectedDeduction, setSelectedDeduction] = useState({
        name: "",
        amount: 0
    });
    const router = useRouter();
    const [deductions, setDeductions] = useState([])
    const [deductionValue, setDeductionValue] = useState(0)
    // const [allowanceValue, setAllowanceValue] = useState(0)
    // const [grossSalaryValue, setGrossSalaryValue] = useState(0)
    // const [netSalaryValue, setNetSalaryValue] = useState(0)
    const [selectedAllowance, setSelectedAllowance] = useState({
        name: "",
        amount: 0
    }); 
    const [allowances, setAllowances] = useState([]);
    /* const [savedAllowances, setSavedAllowances] = useState([])
    const [savedDeductions, setSavedDeductions] = useState([]) */
/* 
    useEffect(() => {
        const token = sessionStorage.getItem("accessToken")
        fetchEmployees(token, userData.companyId)
    }, []) */


    useEffect(() => {
         if (typeof window !== "undefined") {
        const storedEmployees = JSON.parse(localStorage.getItem("Employees")) || [];
        setEmployees(storedEmployees);
         }
      }, []);
  
   
    useEffect(() => {
        console.log(params.id)
        const employee = employees?.find((emp) => {
            return (emp.id == params.id)
        })
        setEmployee(employee)
           
        }, [employees])




        
    

    

      const backToPayroll = () => {
        router.back();
    }


    const removeAllDeductions = (employeeId) => {
        setEmployees((prevEmployees) => {
            const updatedEmployees = prevEmployees.map((employee) => {
              if (employee.id === employeeId) {
                // Remove the deductions and totalDeductions fields
                const { deductions, totalDeductions, netSalary, ...rest } = employee;
                console.log(deductions, totalDeductions, netSalary)
                return rest;
              }
              return employee;
            });
             if (typeof window !== "undefined") {
                localStorage.setItem("Employees", JSON.stringify(updatedEmployees));
             }
            return updatedEmployees;
          });
      };
 

      const removeAllAllowances = (employeeId) => {
        setEmployees((prevEmployees) => {
            const updatedEmployees = prevEmployees.map((employee) => {
              if (employee.id === employeeId) {
                // Remove the deductions and totalDeductions fields
                const { allowances, totalAllowances, netSalary, ...rest } = employee;
                console.log(allowances, totalAllowances, netSalary)
                return rest;
              }
              return employee;
            });

            if (typeof window !== "undefined") {
            localStorage.setItem("Employees", JSON.stringify(updatedEmployees));
            }
            return updatedEmployees;
          });
      };


    const handleEditClick = () => {
        setTempSalary(details?.grossSalary || "");
        setIsEditing(true);
      };

    

      const handleSaveAllowance = (id, allowance) => {
    
        console.log("Saving Allowance for Employee ID:", id);
        console.log("Allowance Data:", allowance);
    
        // Update employee in Zustand
        updateEmployee(id, undefined, allowance);
    
        // Get updated employees from Zustand
        const updatedEmployees = useEmployeeStore.getState().employees;
    
        // Find the specific employee
        const employee = updatedEmployees?.find(emp => emp.id == id);
        console.log("Updated Employee (Allowance):", employee);
    
        if (employee) {
            setNetSalaryValue(employee.netSalary);
        }
     // Small delay for smooth UI updates
       };


      const handleSaveDeductions = (id, deductions) => {
    
        console.log("Saving Deductions for Employee ID:", id);
        console.log("Deductions Data:", deductions);
    
        // Update employee in Zustand
        updateEmployee(id, deductions, undefined); // Ensure allowance is undefined
    
        // Get updated employees from Zustand
        const updatedEmployees = useEmployeeStore.getState().employees;
    
        // Find the specific employee
        const employee = updatedEmployees?.find(emp => emp.id == id);
        console.log("Updated Employee (Deductions):", employee);
    
        if (employee) {
            setDeductionValue(employee.totalDeductions);
            setNetSalaryValue(employee.netSalary);
        }
     // Small delay for smooth UI updates
      };

      const handleInputChange = (value) => {
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
const handleDeductionChange = (index, value) => {
    setDeductions((prev) =>
        prev.map((deduction, i) =>
            i === index ? { ...deduction, amount: value } : deduction
        )
    );
};


// Handle input change for added allowances
const handleAllowanceChange = (index, value) => {
    setAllowances((prev) =>
        prev.map((allowance, i) =>
            i === index ? { ...allowance, amount: value } : allowance
        )
    );
};
 

/* const updateDeductions = (id, value) => {
    let employees = JSON.parse(localStorage.getItem("Employees")) || [];
   
    const updatedEmployees = employees.map((employee) =>
        employee.id == id ? { ...employee, 'deduction' : value } : employee
    );

    localStorage.setItem("Employees", JSON.stringify(updatedEmployees));
    console.log("Updated employees:", updatedEmployees);
} */

const handleAddAllowance = () => {
    if (selectedAllowance.name && !allowances.some(a => a.name === selectedAllowance.name)) {
        setAllowances([...allowances, selectedAllowance]);
    }
};


const handleAddDeduction = () => {
    if (selectedDeduction.name && !deductions.some(d => d.name === selectedDeduction.name)) {
        setDeductions([...deductions, selectedDeduction]);
    }
};

// Remove allowance from UI
const handleRemoveAllowance = (index) => {
    setAllowances((prev) => prev.filter((_, i) => i !== index));

};

const handleRemoveDeduction = (index, amount) => {
    setDeductions((prev) => prev.filter((_, i) => i !== index));
    setDeductionValue(deductionValue - amount)
};




    return (
        <div>
        <div onClick={backToPayroll} className='flex gap-x-2 items-center mb-6 cursor-pointer'>
            <IoChevronBackSharp size={25} />
            <span className='bg-clip-text 
            text-transparent bg-gradient-to-r from-fromGreetGradient 
            via-throughGreet to-primary text-2xl font-semi'>
            Back to payroll
            </span>
        </div>
            <Card className='flex-1 bg-white mx-8'>
                <CardHeader className=''>
                    <CardTitle className='text-primary'>Salary information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col gap-y-6 md:flex-row p-4 gap-x-4'>
                        <div className='p-4 border-lightGrey border-2 md:w-1/3 rounded-xl'>
                            <div className='flex'>
                                <p className='font-regular'>Net Salary</p>
                            </div>
                            <div className='flex justify-end'>
                                <p className='lg:text-3xl font-bold text-primary'>
                                ₦{(employee?.grossSalary - (employee?.totalDeductions || 0) + (employee?.totalAllowances || 0)).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div className='p-4 border-lightGrey border-2 md:w-1/3 rounded-xl'>
                            <div className='flex'>
                                <p className='font-regular'>Gross Salary</p>
                            </div>
                            <div className='flex justify-end'>
                                <p className='lg:text-3xl font-bold text-primary'>₦{employee?.grossSalary?.toLocaleString() || 0}</p>
                            </div>
                        </div>

                        <div className='p-4 border-lightGrey border-2 md:w-1/3 rounded-xl'>
                            <div className='flex'>
                                <p className='font-regular'>Deductions</p>
                            </div>
                            <div className='flex justify-end'>
                                <p className='lg:text-3xl font-bold text-primary'>₦{employee?.totalDeductions?.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                            
                </CardContent>
                </Card>
        <div className='flex flex-col gap-y-6 mx-8 mt-10 md:flex-row gap-x-24 bg-white p-8'>
        <Card className=''>
            <CardHeader className='border-lightGrey border-b-2'>
                <CardTitle className='text-black'>Basic Earnings</CardTitle>
            </CardHeader>
            <CardContent className='mt-6 flex flex-col pb-10'>
                <form className="" onSubmit={(e) => e.preventDefault()}>
                    
                    <div className="mb-2">
                        <label className="font-medium">Gross Salary</label>
                        <div className="flex items-center gap-x-2">
                            <Input  
                            type="text"
                            value={isEditing ? tempSalary : `₦${employee?.grossSalary?.toLocaleString() || 0}`}
                            onChange={(e) => handleInputChange(e.target.value)}
                            className='max-w-[70%]'
                            disabled={!isEditing}
                            />
                            {isEditing ? (
                        <button
                        type="button" // Save new value
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
                    {employee?.allowances && (
                        employee?.allowances?.map((savedAllowance, index) => (
                            <div key={index} className="bg-gray-100 text-gray-400 mt-4 flex justify-between p-2 rounded-[6px]">
                                <div>{savedAllowance.type}</div>
                                <div>{savedAllowance.amount}</div>
                            </div>
                        ))
                    )}

                     {/* Render Added Allowances */}
                     {allowances?.map((allowance, index) => (
                        <div key={index} className="mt-4">
                            <label className="font-medium">{allowance?.name}</label>
                            <div className="flex items-center gap-x-2">
                                <Input
                                    type="text"
                                    value={allowance?.amount.toLocaleString()}
                                    onChange={(e) => handleAllowanceChange(index, e.target.value)}
                                    className=''
                                />
                                <button
                                    onClick={() => handleRemoveAllowance(index)}
                                    className="bg-unPaid text-white w-8 h-8 rounded-full flex items-center justify-center"
                                >
                                    <IoCloseOutline size={20} />
                                </button>

                                <button
                                    onClick={() => handleSaveAllowance(Number(params.id), { type: allowance?.name, amount: Number(allowance?.amount)})}
                                    className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center"
                                >
                                   <FiCheck size={20} />
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
                                className="border p-2 rounded max-w-[70%]"
                                value={selectedAllowance?.name}
                                onChange={(e) => setSelectedAllowance({name: e.target.value, amount: 0})}
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

                    <div className="mt-8">
                        <button onClick={() => removeAllAllowances(Number(params?.id))} className="border px-4 py-1 rounded-[6px] bg-primary text-white">Reset Allowances</button>
                    </div>
            </CardContent>
        </Card>
        <Card className=''>
            <CardHeader className='border-lightGrey border-b-2'>
                <CardTitle className='text-black'>Deductions</CardTitle>
            </CardHeader>
            <CardContent className='mt-6 flex flex-col items-start pb-10'>

            {employee?.deductions && (
                        employee?.deductions?.map((savedDeduction, index) => (
                            <div key={index} className="bg-gray-100 w-max gap-x-4 text-gray-400 mt-4 flex justify-between p-2 rounded-[6px]">
                                <div>{savedDeduction.type}</div>
                                <div>{savedDeduction.amount}</div>
                            </div>
                        ))
                    )}
                     {/* Render Added Deductions */}
                     {deductions?.map((deduction, index) => (
                        <div key={index} className="mb-4 mt-4">
                            <label className="font-medium">{deduction?.name}</label>
                            <div className="flex items-start gap-x-4">
                                <Input
                                    type="text"
                                    value={deduction?.amount.toLocaleString()}
                                    onChange={(e) => handleDeductionChange(index, e.target.value)}
                                    className=''
                                />
                                <button
                                    onClick={() => handleRemoveDeduction(index, deduction?.amount)}
                                    className="bg-unPaid text-white w-8 h-8 rounded-full flex items-center justify-center"
                                >
                                    <IoCloseOutline size={20} />
                                </button>

                                <button
                                     onClick={() => handleSaveDeductions(Number(params?.id), { type: deduction?.name, amount: Number(deduction?.amount)})}
                                     className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center"
                                 >
                                     <FiCheck size={20} />
                                 </button>
                            </div>
                        </div>
                    ))}

                    <div className="mt-4">
                        <label className="font-regular">Add Deductions</label>
                        <div className="flex items-center gap-x-4 w-full">
                            <select
                                className="border p-2 rounded w-full"
                                value={selectedDeduction?.name}
                                onChange={(e) => setSelectedDeduction({ name: e.target.value, amount: 0 })}
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

                    <div className="mt-8">
                        <button onClick={()=>removeAllDeductions(Number(params.id))} className="border px-4 py-1 rounded-[6px] bg-primary text-white">Reset Deductions</button>
                    </div>
            </CardContent>
        </Card>
    </div>
    </div>
    );
}

export default EmployeeSalaryForm;
