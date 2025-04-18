import { Card, CardHeader, CardTitle, CardContent } from '@/components/Cards'
import { Input } from '@/components/Inputs';




function EmployeeSalaryForm({employeeDetails}) {
   
    const handleInputChange = (value) => {
        setTempSalary(value);
    };


    console.log(employeeDetails)



  


    return (
        <div className='mt-10 flex flex-col lg:flex-row lg:gap-x-6 gap-y-4'>
        <Card className='lg:w-[30%]'>
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
                            value={`₦${(employeeDetails?.grossSalary || 0).toLocaleString()}`}
                            onChange={(e) => handleInputChange(e.target.value)}
                            className='w-40'
                            disabled
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
        <Card className='lg:w-[30%]'>
        <CardHeader className='border-lightGrey border-b-2 bg-gradient-to-r from-fromGreetGradient 
            via-throughGreet to-primary rounded'>
                <CardTitle className='text-white'>Deductions</CardTitle>
            </CardHeader>
            <CardContent className='mt-6 flex flex-col items-start pb-10'>
                <div className="">
                    <label className="font-regular text-[12px]">Deductions</label>
                        <div className="flex items-center gap-x-4">
                            <div className="border p-2 rounded min-w-40 text-[10px]">
                                <p>{employeeDetails?.deduction ? employeeDetails.deduction : '0.00'}</p>
                            </div>
                        </div>
                    </div>
            </CardContent>
        </Card>
    </div>
    );
}

export default EmployeeSalaryForm;
