"use client";

import React, { useEffect, useState } from 'react'
import Loading from '../Loading';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table"

import { Input } from '@/components/Inputs';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/Select'
import { createEmployee, getAccountName } from '@/apiService';



interface BankDetails {
  bankName: string;
  bankCode: string;
  isDefault: boolean;
  accountNumber: string;
}

interface Employee {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  startDate: string; // Keep as string if stored as ISO date format
  grossSalary: number | null;
  netSalary: number | null;
  bankDetails: BankDetails;
}

// If you have an array of employees
type Employees = Employee[];


  
type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accessToken: string;
  company: string;
  companyId: string;
};

  const BANKS_API_URL = "https://nigerianbanks.xyz"

let token: string;

export default function AddEmployee() {
    const [userData, setUserData] = useState<User | null>(null);
    const [loading, setLoading] = useState(false)
    const [selectedBank, setSelectedBank] = useState("")
    const [accountName, setAccountName] = useState("")
    const [banks, setBanks] = useState<{ name: string, code: string }[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([
        {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            role: '',
            startDate: '',
            grossSalary: 0,
            netSalary: 0,
            department: '',
            bankDetails: {
              bankName: '',
              bankCode: '',
              isDefault: true,
              accountNumber: '',
            }
        }, // Initial empty row
      ]);

      useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo")|| "{}")
        token = sessionStorage.getItem("accessToken") || "";
        setUserData(userInfo)
      }, [employees])


      const handleInputChange = (index: number, field: string, value: string) => {
  const newEmployees = [...employees];

  if (field.startsWith("bankDetails.")) {
    const key = field.split(".")[1]; // Extract the actual key inside bankDetails
    newEmployees[index].bankDetails = {
      ...newEmployees[index].bankDetails,
      [key]: value,
    };
  } else {
    newEmployees[index] = {
      ...newEmployees[index],
      [field]: value,
    };
  }

  setEmployees(newEmployees);

  // Auto-fetch account name when bank and account number are selected
  if (field === "bankDetails.accountNumber" && value.length > 9 && newEmployees[index].bankDetails.bankName) {
    fetchAccountName(index, newEmployees[index].bankDetails.bankName, value, userData?.companyId || "", token);
  }
};


if (loading) {
  return <Loading />
}
  


      
    /*   const handleInputChange = (index: number, field: keyof Employee, value: string) => {
     const newEmployees: any = [...employees];
        newEmployees[index][field] = value;
        setEmployees(newEmployees);
    
        // Auto-fetch account name when bank and account number are selected
        if (field === 'bankDetails' && newEmployees[index].bankDetails.accountNumber.length > 9 && newEmployees[index].bankDetails.bankName) {
          fetchAccountName(index, newEmployees[index].bankDetails.accountNumber, value, userData?.companyId || "", token);
        }
      }; */

      const fetchAccountName = async (index: number, bankName: string, accountNumber: string, companyId: string, token: string) => {
        try {
          const bankCode = banks.find((bank) => bankName === bank.name)?.code
          const res = await getAccountName(companyId, accountNumber, bankCode || "", token)
          setAccountName(res.accountName)
          setLoading(false)
        }catch(error) {
          console.error(`Error fetching account name, ${error}`)
        }
      };   

  // Function to add a new row
  const addEmployee = () => {
    setEmployees([...employees,
            { 
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            role: '',
            startDate: '',
            grossSalary: 0,
            netSalary: 0,
            department: '',
            bankDetails: {
              bankName: '',
              bankCode: '',
              isDefault: true,
              accountNumber: '',
            }
        }]);
      };

  useEffect(() => {
    // Fetch bank list from API
    async function fetchBanks() {
      try {
        const response = await fetch(`${BANKS_API_URL}`); // Replace with actual endpoint
        const data = await response.json();
        setBanks(data);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    }
    fetchBanks();
  }, []);

  


  // Function to save data (send to backend)
  const saveRecords = async () => {
    console.log(employees)
    const token = sessionStorage.getItem("accessToken") || "";
      try {
        const res = await createEmployee(employees, userData?.companyId || "", token)
        alert(res.message)
    } catch (error) {
      console.error("Error saving records:", error);
    }
  };



    return (
    <div>
        <div className='font-semibold text-[25px] mb-4 px-4'>
            <span className='bg-clip-text 
            text-transparent bg-gradient-to-r from-fromGreetGradient 
            via-throughGreet to-primary'>
            Employee Records
            </span>
        </div>
        <div className='bg-white mx-6 rounded-t-2xl my-10'>
      
            <div className='rounded-t-2xl flex text-white bg-gradient-to-r from-fromGreetGradient via-throughGreet to-primary justify-between items-center text-[15px] p-2'>
            <p>Add Employee</p>  
            </div>
                <div className='px-4 pb-4'>
                    <div className='flex p-2 justify-end gap-x-4'>
                        <button onClick={()=>addEmployee()} className='bg-primary text-white px-4 py-2 text-[15px]'>Add Record</button> 
                    </div>
                    <Table className=''>
                    <TableHeader className='bg-Inactive text-white'>
                        <TableRow>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>Monthly Gross</TableHead>
                        <TableHead>Monthly Net</TableHead>
                        <TableHead>Bank</TableHead>
                        <TableHead>Account Number</TableHead>
                        <TableHead>Account Name</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Phone Number</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='text-[12px]'>
                        {employees.map((emp, index) => (
                            <TableRow key={index}>
                            <TableCell>
                            <Input
                                type="text"
                                value={emp.firstname}
                                onChange={(e) => handleInputChange(index, 'firstname', e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    type="text"
                                    value={emp.lastname}
                                    onChange={(e) => handleInputChange(index, 'lastname', e.target.value)}
                                    />
                            </TableCell>
                            <TableCell>
                                <Input
                                    type="text"
                                    value={emp.email}
                                    onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    type="text"
                                    value={emp.role}
                                    onChange={(e) => handleInputChange(index, 'role', e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    type="text"
                                    value={emp.startDate}
                                    onChange={(e) => handleInputChange(index, 'startDate', e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    type="text"
                                    value={emp.grossSalary || 0}
                                    onChange={(e) => handleInputChange(index, 'grossSalary', e.target.value)}
                                />
                            </TableCell>

                            <TableCell>
                                <Input
                                    type="text"
                                    value={emp.netSalary || 0}
                                    onChange={(e) => handleInputChange(index, 'netSalary', e.target.value)}
                                />
                            </TableCell>


                            <TableCell>
                            <Select value={emp.bankDetails.bankName}  onValueChange={(value) => handleInputChange(index, "bankDetails.bankName", value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a bank" />
                              </SelectTrigger>
                              <SelectContent>
                                {banks.map((bank, index) => (
                                  <SelectItem key={index} value={bank.name}>
                                    {bank.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            </TableCell>

                            <TableCell>
                                <Input
                                    type="text"
                                    value={emp.bankDetails.accountNumber}
                                    onChange={(e) => handleInputChange(index, 'bankDetails.accountNumber', e.target.value)}
                                />
                            </TableCell>

                            <TableCell>
                                <Input
                                    type="text"
                                    value={accountName}
                                    onChange={(e) => handleInputChange(index, 'accountName', e.target.value)}
                                    readOnly
                                />
                            </TableCell>

                            <TableCell>
                                <Input
                                    type="text"
                                    value={emp.department}
                                    onChange={(e) => handleInputChange(index, 'department', e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    type="text"
                                    value={emp.phone}
                                    onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                    
                        ))}
                    </TableBody>
                    {/* <TableFooter>
                        <TableRow>
                        <TableCell colSpan={8}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                        </TableRow>
                    </TableFooter> */}
                    </Table>
      </div>
      <div className='flex justify-end p-2 mr-2'>
        <button onClick={saveRecords} className='bg-primary text-white px-4 py-2 text-[15px]'>Save Record</button>  
      </div>
         
    </div>
</div>
  )
}
