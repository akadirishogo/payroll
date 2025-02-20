import { Card, CardHeader, CardTitle, CardContent } from '@/components/Cards'
import { Input } from '@/components/Inputs';






/* 
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
  } */



function EmployeeSalaryForm({employeeDetails}) {
   
    const handleInputChange = (value) => {
        setTempSalary(value);
    };


    console.log(employeeDetails)



  


    return (
        <div className='ml-4 mt-10 flex gap-x-24'>
        <Card className='w-[30%]'>
            <CardHeader className='border-lightGrey border-b-2 bg-gradient-to-r from-fromGreetGradient 
            via-throughGreet to-primary rounded'>
                <CardTitle className='text-white'>Basic Earnings</CardTitle>
            </CardHeader>
            <CardContent className='mt-6 flex flex-col pb-10'>
                <form className="" onSubmit={(e) => e.preventDefault()}>
                    
                    <div className="mb-2">
                        <label className="font-regular">Basic Salary</label>
                        <div className="flex items-center gap-x-4">
                            <Input  
                            type="text"
                            value={employeeDetails?.monthlyGross || ""}
                            onChange={(e) => handleInputChange(e.target.value)}
                            className='w-40'
                            disabled
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
        <Card className='w-[30%]'>
        <CardHeader className='border-lightGrey border-b-2 bg-gradient-to-r from-fromGreetGradient 
            via-throughGreet to-primary rounded'>
                <CardTitle className='text-white'>Deductions</CardTitle>
            </CardHeader>
            <CardContent className='mt-6 flex flex-col items-start pb-10'>
                <div className="">
                    <label className="font-regular">Deductions</label>
                        <div className="flex items-center gap-x-4">
                            <div className="border p-2 rounded min-w-40">
                                <p>{employeeDetails?.deductions ? employeeDetails.deductions : '0.00'}</p>
                            </div>
                        </div>
                    </div>
            </CardContent>
        </Card>
    </div>
    );
}

export default EmployeeSalaryForm;
