"use client";
import { useDispatch } from "react-redux";
import { setFilterCategory } from "@/store/propertySlice";

interface FilterDropdownProps {
  options?: [object] | [];
  label?: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  options = [],
  label = "Please Select",
}) => {
  const dispatch = useDispatch();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilterCategory(e.target.value));
  };

  return (
    <select onChange={handleFilterChange} className="p-2 border rounded">
      {options.map((option: any, index: number) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default FilterDropdown;
