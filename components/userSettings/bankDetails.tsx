'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../Cards'
import { Button } from '../Button'
import Modal from '../Modal'
import { GoPlus } from "react-icons/go";


interface Bank {
    name: string;
    code?: string; // Some banks might not have a code
}

interface BankAccount {
    id: number;
    bankName: string;
    accountNumber: string;
    accountName: string;
    bankCode: string | undefined;
    isDefault: boolean;
  }

  const BANKS_API_URL = "https://nigerianbanks.xyz"

export default function BankDetails() {
    const [selectedBank, setSelectedBank] = useState<Partial<BankAccount>>({
        bankName: "",
        accountNumber: "",
        accountName: "",
      });
    const [accountNumber, setAccountNumber] = useState<string>("");
    const [bankList, setBankList] = useState<Bank[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalTwoOpen, setIsModalTwoOpen] = useState(false);
    const [newBank, setNewBank] = useState<Partial<BankAccount>>({
        bankName: "",
        accountNumber: "",
        accountName: "",
      });
    const [bankAccounts, setBankAccounts] = useState([
        { id: 1, bankName: "First Bank", accountNumber: "1234567890", isDefault: true, accountName: "Akadiri Oluwashogo Mark" },
        { id: 2, bankName: "Access Bank", accountNumber: "0817286365", isDefault: false, accountName: "Akadiri Oluwashogo Mark" },
        { id: 3, bankName: "Alat by Wema", accountNumber: "0234766808", isDefault: false, accountName: "Akadiri Oluwashogo Mark" },
      ]);


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

   /*  useEffect(() => {
        if (bankCode && accountNumber.length === 10) {  
            fetchAccountName();
        }
    }, [bankCode, accountNumber]); */

    // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(e.target.value);
  };

   // Handle Bank Selection Change
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

// Handle Bank Selection Change
const handleSelectChangeTwo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBank = bankAccounts.find(bank => bank.bankName === e.target.value);

    console.log(selectedBank)

    if (selectedBank) {
        setSelectedBank(prevState => ({
            ...prevState,
            id: selectedBank.id,
            bankName: selectedBank.bankName,
            accountName: selectedBank.accountName,
            accountNumber: selectedBank.accountNumber  // Update bank name
        }));
    }
};

const resetDefault = () => {
    bankAccounts.map(account => ({
        ...account, isDefault: false
    }))
}

const handleMakeDefaultAccount = (id: number | undefined) => {

    if (id === undefined) return;

    resetDefault();

    setBankAccounts((prevAccounts) =>
        prevAccounts.map((account) => ({
          ...account,
          isDefault: account.id === id,
        }))
      );

}

console.log(bankAccounts)

  // Handle Adding Bank Account
  const handleAddBankAccount = () => {

  /*   if (!newBank.bankName || !newBank.accountNumber || !newBank.accountName) {
      alert("All fields are required");
      return;
    } */

    const newAccount: BankAccount = {
      id: bankAccounts.length + 1, // Assign unique ID
      bankName: newBank.bankName!,
      accountNumber: newBank.accountNumber!,
      accountName: newBank.accountName!,
      bankCode: newBank.bankCode,
      isDefault: bankAccounts.length === 0, // First account is default
    };

    const newAccounts = [...bankAccounts, newAccount]
    setBankAccounts(newAccounts);
    setIsModalOpen(false); // Close modal
    setNewBank({ bankName: "", accountNumber: "", accountName: "" }); // Reset form

  };


  /* const fetchAccountName = async () => {
    try {
        const response = await fetch("/api/verifyAccount", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bankCode, accountNumber }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json().catch(() => null); // 👈 Avoid JSON parse error if empty
        if (!data) throw new Error("Empty response from server");

        console.log("Success:", data);
    } catch (error) {
        console.error("Error fetching account name:", error.message);
    }
}; */





  return (
    <Card className="max-w-full bg-white my-4 p-4">
    <CardHeader>
        <CardTitle className="text-lg">Bank Details</CardTitle>
    </CardHeader>
    <CardContent className="">
        
        <div className="relative flex items-start gap-x-10">
            <div className="mb-6 -mt-4">
                <p>Set your bank details</p>
            </div>
            <div>
            
            <div className='grid grid-cols-3 gap-6'>
                {bankAccounts?.map((bankAccount) => (
                <div className="border-2 w-60 h-60 rounded-xl -mt-[15px]" key={bankAccount?.id}>
                    <div className={`${bankAccount.isDefault ? 'bg-primary' : 'bg-black'} border-b-2 rounded-t-xl h-12 flex items-center px-4`}>
                        <p className="text-white">{bankAccount.isDefault ? "Default" : ""}</p>
                    </div>
                    <div className='p-2 flex flex-col gap-y-2'>
                        <div>
                            <p className='text-[15px] font-semi'>Bank Name</p>
                            <p className='text-[17px] font-light'>{bankAccount?.bankName}</p>
                        </div>
                        <div>
                            <p className='text-[15px] font-semi'>Account Number</p>
                            <p className='text-[17px] font-light'>{bankAccount?.accountNumber}</p>
                        </div>
                        <div>
                            <p className='text-[15px] font-semi'>Account Name</p>
                            <p className='text-[17px] font-light'>{bankAccount?.accountName}</p>
                        </div>
                    </div>
                </div>
                ))}
            </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Bank Account">
                {/* ✅ Children prop used correctly */}
                <form className="mt-4 space-y-3">
                <div>
                    <label className="block text-left font-medium">Select Bank Name</label>
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

                <div>
                    <label className="block text-left font-medium">Account Number</label>
                    <input
                    type="text"
                    value={accountNumber}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-left font-medium">Account Name</label>
                    <input
                    type="text"
                    value='Account Name'
                    readOnly
                    className="w-full p-2 border rounded-lg"
                    />
                </div>

                <button type="button" onClick={handleAddBankAccount} className="w-full bg-primary text-white py-2 rounded-lg">
                    Save Bank
                </button>
            </form>
      </Modal> 

      <Modal isOpen={isModalTwoOpen} onClose={() => setIsModalTwoOpen(false)} title="Set Default Bank">
                {/* ✅ Children prop used correctly */}
                <form className="mt-4 space-y-3">

                <div>
                    <label className="block text-left font-medium">Select Bank Name</label>
                    <select 
                    className='min-w-full p-2 border rounded-lg'
                    name="bankName"
                    value={selectedBank.bankName}
                    onChange={handleSelectChangeTwo}
                    >
                        {bankAccounts.map((bank, index) => (
                            <option key={index} value={bank.bankName}>
                                {bank.bankName}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-left font-medium">Account Number</label>
                    <input
                    type="text"
                    value={selectedBank.accountNumber}
                    readOnly
                    className="w-full p-2 border rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-left font-medium">Account Name</label>
                    <input
                    type="text"
                    value={selectedBank.accountName}
                    readOnly
                    className="w-full p-2 border rounded-lg"
                    />
                </div>

                <div className='flex gap-x-2'>
                    <button type="button" onClick={()=>handleMakeDefaultAccount(selectedBank?.id)} className="w-full bg-primary text-white py-2 rounded-lg">
                        Make Default
                    </button>

                    <button type="button" onClick={()=>setIsModalTwoOpen(false)} className="w-full bg-primary text-white py-2 rounded-lg">
                        Close
                    </button>
                </div>
               
            </form>
      </Modal>       
    </div>
    <div className='mt-10 flex justify-end gap-x-4'>
        <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white" 
            >
            <GoPlus size={20} />
            Add Account
        </Button>

        <Button
            onClick={() => setIsModalTwoOpen(true)}
            className="bg-primary text-white" 
            >
            Set Default
        </Button>
    </div>
    </CardContent>
</Card>
  )
}
