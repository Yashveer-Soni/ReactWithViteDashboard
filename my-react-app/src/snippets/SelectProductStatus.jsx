import React, { useState,useEffect } from 'react';
import { draftIcon, activeIcon } from './Image_load';
import CustomSelect from './CustomSelect';

export default function SelectProductStatus({ onSelectStatus,onUpdateValue }) {

 
  const icons = [
    { label: 'Active' },
    { label: 'Draft' },
  ];
  const [selectedOption, setSelectedOption] = useState('');
  const savedStatusLabel = localStorage.getItem("selectedStatus") || null;
  useEffect(() => {
    if (onUpdateValue) {
      setSelectedOption(onUpdateValue);
    }
  }, [onUpdateValue]);
  onSelectStatus(selectedOption);
  return (
    <CustomSelect
        label="Status"
        options={icons}
        selectedOption={selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)}
        onSelect={(value) => {
        setSelectedOption(value);
        }}
        valueKey="label"         
        labelKey="label" 
        placeholder="Select Status"
    />
  );
}
