"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Cards";
import { Input } from "@/components/Inputs";
import { Checkbox } from "@/components/Checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/Radio"
import { Label } from "@/components/Label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Dialog";



interface Admins {
  id: number;
  fullName: string;
  email: string;
  role: string;
}

const initialAdmins: Admins[] = [
  { id: 1, fullName: "John Doe", email: "johndoe@gmail.com", role: "Admin" },
  { id: 2, fullName: "Jane Smith", email: "janesmith@gmail.com", role: "Manager" },
  { id: 3, fullName: "Michael Johnson", email: "michealjohn@gmail.com", role: "Auditor" },
];


export default function AdminSettings() {
  const [admins, setAdmins] = useState<Admins[]>(initialAdmins);
  const [selectedAdmins, setSelectedAdmins] = useState<Set<number>>(new Set());
  const [newAdmin, setNewAdmin] = useState({ fullName: "", email: "", role: "admin" });
  const [isModalOpen, setIsModalOpen] = useState(false);
 


  // Handle Checkbox Select
  const handleCheckboxChange = (id: number) => {
    setSelectedAdmins((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

   // Handle Removing Selected Admins
   const handleRemove = () => {
    setAdmins((prev) => prev.filter(admin => !selectedAdmins.has(admin.id)));
    console.log("Updated Admins:", admins.filter(admin => !selectedAdmins.has(admin.id)));
    setSelectedAdmins(new Set()); // Reset selection
  };

  // Handle Adding a New Admin
  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdmins([...admins, { ...newAdmin, id: Date.now() }]);
    console.log("New Admin Added:", newAdmin);
    setNewAdmin({ fullName: "", email: "", role: "Admin" }); // Reset form
    setIsModalOpen(false);
  };

  

  return (
    <div className="my-4 px-4">
      <div className="font-semibold text-[25px] mb-4 px-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-fromGreetGradient via-throughGreet to-primary">
          Administration Settings
        </span>
      </div>

      <Card className="bg-white mx-auto p-4">
        <CardHeader>
          <CardTitle className="text-primary">Administrators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end gap-x-4 mb-4">
            {/* Remove Button */}
            <button
              onClick={handleRemove}
              className="bg-unPaid text-white px-4 py-2 rounded-md disabled:opacity-50"
              disabled={selectedAdmins.size === 0}
            >
              Remove
            </button>

            {/* Add Admin Button (Opens Modal) */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <button className="bg-primary text-white px-4 py-2 rounded-md">
                  Add Admin
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Admin</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddAdmin} className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={newAdmin.fullName}
                    onChange={(e) => setNewAdmin({ ...newAdmin, fullName: e.target.value })}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                    required
                  />
                  <RadioGroup value={newAdmin.role} onValueChange={(value) => setNewAdmin({ ...newAdmin, role: value })}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Admin" id="admin" />
                      <Label htmlFor="admin">Admin</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Manager" id="manager" />
                      <Label htmlFor="manager">Manager</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Auditor" id="auditor" />
                      <Label htmlFor="auditor">Auditor</Label>
                    </div>
                  </RadioGroup>
                  <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md w-full">
                    Add Admin
                  </button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Admins List */}
          <div className="space-y-4">
            {admins.map((admin) => (
              <div key={admin.id} className="flex items-center gap-x-4 border-b pb-2">
                {/* Checkbox to select admin */}
                <Checkbox
                  checked={selectedAdmins.has(admin.id)}
                  onCheckedChange={() => handleCheckboxChange(admin.id)}
                />

                {/* Admin Details */}
                <div className="flex-1">
                  <p className="font-medium">{admin.fullName}</p>
                  <p className="text-sm text-gray-500">{admin.email}</p>
                </div>

                {/* Role Display */}
                <span className="px-3 py-1 text-sm font-medium bg-gray-200 rounded-md">
                  {admin.role}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

