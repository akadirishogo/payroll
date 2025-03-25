const BASE_URL = "https://credpay-936l.onrender.com"
import { Payroll } from "./app/admin/[adminid]/payroll/[month]/list/page";


export interface Allowance {
  type: string;
  amount: number
}

type PayrollData = {
  month: string;
  year: number;
  totalAmount: number;
  employeeCount: number;
};


export interface Deduction {
  reason: string;
  amount: number
}



export interface Employees {
  id: number; 
  netSalary: number; 
  allowances: Allowance[] | []
  deductions: Deduction[] | []
}


export default async function createBusinessAdmin(email: string, password: string, confirmPassword: string) {
    try {
        const response = await fetch(`${BASE_URL}/auth/signup`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(
            {
                "email": email,
                "password": password,
                "confirmPassword": confirmPassword
            }
            ),
        })


        const result = await response.json();
        if (!response.ok) {
            throw new Error(result?.message || 'Something went wrong');
        }
        
       
        return result;

    } catch(error: unknown) {
        if (error instanceof Error) {
            throw error
          } else {
            throw new Error("An unknown error occurred");
          }
    }
}


export async function updateAdminRecords(data: any) {
    try {
        const response = await fetch(`${BASE_URL}/auth/complete-signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(
            {
                "firstname": data.firstname,
                "lastname": data.lastname,
                "email": data.email,
                "phone": data.phoneNumber
            }
            ),
        })


        const result = await response.json();
        if (!response.ok) {
            throw new Error(result?.message || 'Something went wrong');
        }
        
        return result;

    } catch(error: unknown) {
        if (error instanceof Error) {
            throw error
          } else {
            throw new Error("An unknown error occurred");
          }
    }
}


export async function registerBusiness(id: number, name: string, address: string) {
    try {
        const response = await fetch(`${BASE_URL}/companies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(
            {
                "id": id,
                "name": name,
                "contactAddress": address,
            }
            ),
        })

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result?.message || 'Something went wrong');
        }
        
        return result;

    } catch(error: unknown) {
        if (error instanceof Error) {
            throw error
          } else {
            throw new Error("An unknown error occurred");
          }
    }
}



export async function SignInUser(data: any) {
  try {
      const response = await fetch(`${BASE_URL}/auth/employee-login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
            },
          body: JSON.stringify(
          {
              "email": data.email,
              "password": data.password
          }
          ),
      })

      const result = await response.json();
      
      if (!response.ok) {
          throw new Error(result?.message || 'Something went wrong');
      }
      
      return result;

  } catch(error: unknown) {
      if (error instanceof Error) {
          throw error
        } else {
          throw new Error("An unknown error occurred");
        }
  }
}


export async function SignInAdminUser(data: any) {
    try {
        const response = await fetch(`${BASE_URL}/auth/user-login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(
            {
                "email": data.email,
                "password": data.password
            }
            ),
        })

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result?.message || 'Something went wrong');
        }
        
        return result;

    } catch(error: unknown) {
        if (error instanceof Error) {
            throw error
          } else {
            throw new Error("An unknown error occurred");
          }
    }
}

export async function checkUserRole(email: any) {

    try {
      const response = await fetch(`${BASE_URL}/auth/check-role/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          },
      });
  
      if (!response.ok) {
        console.log(response.status)
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }
      
        const role = await response.text();
        return role
    } catch (error: any) {
      console.log(`Check your internet connection: ${error.message}`);
      throw error
    }
  }



  export async function AddAdminUser(data: any, token: any, companyId: any) {
    try {
        const response = await fetch(`${BASE_URL}/companies/${companyId}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}` 
              },
            body: JSON.stringify(
            {
                "firstname": data.firstname,
                "lastname": data.lastname,
                "email": data.email,
                "userType": data.userType
            }
            ),
        })

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result?.message || 'Something went wrong');
        }
        
        return result;

    } catch(error: unknown) {
        if (error instanceof Error) {
            throw error
          } else {
            throw new Error("An unknown error occurred");
          }
    }
}

 export async function getAllAdmins(token: any, companyId: any) {
  try {
    const response = await fetch(`${BASE_URL}/companies/${companyId}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // Send token in Authorization header
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Parse JSON response
    if (data) {
      const saveData = JSON.stringify(data)
      localStorage.setItem("allAdmins", saveData)
      return data
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error
  }
 }


 export async function removeAdmin(companyId: string, userId: number | null, token: string) {

  try {
    const response = await fetch(`${BASE_URL}/companies/${companyId}/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete admin");
    }
    return await response.json(); // Return response if needed
  } catch (error) {
    console.error("Error deleting admin:", error);
    return null;
  }

 }


export async function getAccountName (companyId: string, accountNumber: string, bankCode: string, token: string) {
    try {
      const response = await fetch(`${BASE_URL}/companies/${companyId}/employees/verify-bank-account`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json', 
          },
        body: JSON.stringify(
        {
            "accountNumber": accountNumber,
            "bankCode": bankCode
        }
        ),
    })

    const result = await response.json();

    
    if (!response.ok) {
        throw new Error(result?.message || 'Something went wrong');
    }
    console.log(result)
    return result;

    }catch(error){
      console.error("Error fetching account name:", error);
    }
}


export async function createEmployee(employees: any, companyId: string, token: string) {
    try {
      const response = await fetch(`${BASE_URL}/companies/${companyId}/employees`, {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(employees),
      })

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || 'Something went wrong');
    }
      console.log(result)
      return result;

    } catch(error) {
      console.error("Error creating employee:", error);
    }
}


export async function fetchEmployees(token: string, companyId: string) {
  try {
    const response = await fetch(`${BASE_URL}/companies/${companyId}/employees`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // Send token in Authorization header
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Parse JSON response
    if (data) {
      const saveData = JSON.stringify(data)
      localStorage.setItem("Employees", saveData)
      return data
    }
  } catch (error) {
    console.log("Error fetching employees:", error);
    throw error
  }
 }



 export async function createPayroll (
  id: number,
  name: string, 
  month: string, 
  year: number, 
  totalAmount: number, 
  token: string, 
  employees: Employees
) {
  try {
    const response = await fetch(`${BASE_URL}/payroll`, {
      method: 'POST',
      headers: {
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json', 
        },
      body: JSON.stringify(
      {
          "userId": id,
          "name": name,
          "month": month,
          "year": year,
          "totalAmount": totalAmount,
          "employees": employees
      }
      ),
  })


  const result = await response.json();

  if (!response.ok) {
    return result;
  }

  return result

  }catch(error){
    console.error("Error creating payroll:", error);
  }
}


export const fetchYearPayroll = async(token: string, year: string) => {

  try {
    const response = await fetch(`${BASE_URL}/payroll/year-summary?year=${Number(year)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}` 
        },
    });

    if (!response.ok) {
      console.error("Failed to fetch payroll:", response.statusText);
      return []; // Ensure an empty array is returned on failure
    }
    
    
    const data: PayrollData[] = await response.json();
    return Array.isArray(data) ? data : []; // Ensure response is an 
    
  } catch (error: any) {
    console.log(`Check your internet connection: ${error.message}`);
  }
}


export const fetchMonthPayroll = async(token: string, month: string, year: string | null) => {

  try {
    const response = await fetch(`${BASE_URL}/payroll?month=${month}&year=${Number(year)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}` 
        },
    });


    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch payroll data");// Ensure an empty array is returned on failure
    }
    
    
  
    return Array.isArray(result) ? result : []; // Ensure response is an 
    
  } catch (error: any) {
    console.log(`Check your internet connection: ${error.message}`);
    throw new Error(error.message || "Something went wrong while fetching payroll data");
  }
}



export const approvePayroll = async(userId: any, id: number, token: string) => {

  try {
    const response = await fetch(`${BASE_URL}/payroll/${id}/approve`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(
          {
              "userId": userId,
          }
          ),
    });


    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch payroll data");// Ensure an empty array is returned on failure
    }
    
    
  
    return result
    
  } catch (error: any) {
    console.log(`Check your internet connection: ${error.message}`);
    throw new Error(error.message || "Something went wrong while fetching payroll data");
  }
}


export const viewPayroll = async(id: number, token: string) => {

  try {
    const response = await fetch(`${BASE_URL}/payroll/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}` 
        },
    });


    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch payroll data");// Ensure an empty array is returned on failure
    }
    
    
  
    return result // Ensure response is an 
    
  } catch (error: any) {
    console.log(`Check your internet connection: ${error.message}`);
    throw new Error(error.message || "Something went wrong while fetching payroll data");
  }
}


export const processPayroll = async(id: number, token: string) => {

  try {
    const response = await fetch(`${BASE_URL}/payroll/${id}/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}` 
        },
    });


    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch payroll data");// Ensure an empty array is returned on failure
    }
    
    
  
    return result // Ensure response is an 
    
  } catch (error: any) {
    console.log(`Check your internet connection: ${error.message}`);
    throw new Error(error.message || "Something went wrong while fetching payroll data");
  }
}


export const createNewUser = async(token: string, password: string, confirmPassword: string) => {

  try {
    const response = await fetch(`${BASE_URL}/auth/setup-account?token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
              "password": password,
              "confirmPassword": confirmPassword
          }
          ),
    });


    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch payroll data");// Ensure an empty array is returned on failure
    }
    
    
  
    return result // Ensure response is an 
    
  } catch (error: any) {
    console.log(`Check your internet connection: ${error.message}`);
    throw new Error(error.message || "Something went wrong while fetching payroll data");
  }
}






