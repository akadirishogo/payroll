import { useState } from "react";


interface FilterDropdownProps {
    onFilterChange: (value: string) => void;
    color?: (string)
}

const FilterComponent: React.FC<FilterDropdownProps> = ({ onFilterChange, color }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setSelectedFilter(value);
    onFilterChange(value);
  };

  return (
    <select value={selectedFilter} onChange={handleChange} className="text-[12px] p-2 text-black border-none bg-transparent focus:outline-none focus:ring-0">
      <option className="text-black" value='Year 2025'>Year 2025</option>
      <option className="text-black" value='Year 2024'>Year 2024</option>
      <option className="text-black" value='Year 2023'>Year 2023</option>
      <option className="text-black" value='Year 2022'>Year 2022</option>
    </select>
  );
};

export default FilterComponent;
