import React, { useContext, useEffect, useState } from 'react';
import { BrandsContext } from '../api/FetchBrands';  
import CustomSelect from './CustomSelect';

const CustomBrandsSelect = ({  onSelectBrand,onUpdateValue }) => {
  const { brands, loading } = useContext(BrandsContext);
  const [selectedOption, setSelectedOption] = useState(localStorage.getItem('selectedBrand') || '');

  useEffect(() => {
    if (onUpdateValue) {
      setSelectedOption(onUpdateValue);
    }
  }, [onUpdateValue]);

  const handleChange = (value) => {
    setSelectedOption(value);
    onSelectBrand(value);
    localStorage.setItem('selectedBrand', value); 
  };

  return loading ? (
    <div>Loading brands...</div>
  ) : (
    <CustomSelect
      label="Brand"
      options={brands}
      selectStyleClass="w-100 max-w-100"
      selectedOption={selectedOption}
      onSelect={handleChange}
      valueKey="id"
      labelKey="brand_name"
      placeholder="Select a brand"
    />
  );
};

export default CustomBrandsSelect;
