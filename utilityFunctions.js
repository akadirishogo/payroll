export default function addBankAccount(bankAccounts, newBank){
  // If it's the first account, set it as the default
  const updatedBank = { ...newBank, isDefault: bankAccounts.length === 0 };

  return [...bankAccounts, updatedBank];
}