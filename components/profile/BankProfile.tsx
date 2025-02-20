import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import Loading from '../Loading';


interface BankAccount {
    id: number;
    bankName: string;
    accountNumber: string;
    accountName: string;
    bankCode: string | undefined;
    isDefault: boolean;
  }
  
  interface Bank {
    name: string;
    code?: string; // Some banks might not have a code
  }
  
  const BANKS_API_URL = "https://nigerianbanks.xyz"

export default function BankProfile() {
    const [loading, setLoading] = useState(false);
    const [bankList, setBankList] = useState<Bank[]>([]);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        contactAddress: "",
        phoneNumber: ""
      });
    const [newBank, setNewBank] = useState<Partial<BankAccount>>({
        bankName: "",
        accountNumber: "",
        accountName: "",
      });
      const router = useRouter();


    useEffect(() => {
        async function getBankList() {
            try {
                const response = await fetch(BANKS_API_URL)
                const data = await response.json();
                setBankList(data)
            } catch(err) {
                console.error('Error fetching bank list: ', err)
            }
        }
        getBankList()
    }, [])

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBank = bankList.find(bank => bank.name === e.target.value);
    
    
        if (selectedBank) { 
            setNewBank(prevState => ({
                ...prevState,
                bankName: selectedBank.name,  // Update bank name
                bankCode: selectedBank.code,  // Store bank code too
            }));
        }
    };

    const updateUserProfile = (data = { ...formData }) => {
        console.log(data)
      }


      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
    
        try {
          await updateUserProfile(formData); // Save details to DB
          router.push("/dashboard"); // Redirect to dashboard after saving
        } catch (error) {
          console.error("Error updating profile:", error);
        } finally {
          setLoading(false);
        }
      };

      {loading && (
        <Loading />
      )}
    

  return (
    <>
<p className="font-semi mt-14">Bank Details</p>
      <div className="border-2 rounded-xl px-10 py-5 mt-2 space-y-4 mb-10">
        <div>
            <form onSubmit={handleSubmit} className="gap-x-2">
              <div className="flex gap-x-4">
                <div className="flex flex-col w-[40%]">
                    <label>Bank Name</label>
                    <select 
                    className='min-w-full p-2 border rounded-lg'
                    name="bankName"
                    value={newBank.bankName}
                    onChange={handleSelectChange}
                    >
                        {bankList.map((bank, index) => (
                            <option key={index} value={bank.name}>
                                {bank.name}
                            </option>
                        ))}
                    </select>
                </div>
              
                <div className="flex flex-col w-[40%]">
                    <label>Account Number</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Account Number"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="flex-1 px-4 py-2 border rounded"
                    />
                </div>
              </div>
            

            <div className="flex w-full gap-x-10 mt-4">
                <div className="flex flex-col min-w-[40%]">
                <label>Account Name</label>
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.contactAddress}
                    disabled
                    onChange={handleChange}
                    required
                    className="flex-1 px-4 py-2 border rounded"
                />
                </div>
            </div>
           
            
            <button className="mt-6 bg-primary text-white px-10 py-[2px] font-regular rounded-[5px]">Save</button>
            
            </form>
        </div>

      
      </div>
    </>
  )
}
