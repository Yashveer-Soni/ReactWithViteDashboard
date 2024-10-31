import React,{useContext, useState} from 'react';
import { BrandsContext } from '../../../api/FetchBrands';

export default function DeleteBrand({ openDelBrand, onCloseDelBrand }) {
    console.log(openDelBrand);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const { brands, loading ,DeleteBrand} = useContext(BrandsContext);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleDelete = async (event) => {
        event.preventDefault();
        if (selectedOptions.length === 0) {
            toast.error('Please select at least one brand to delete.');
            return;
        }
        await DeleteBrand(selectedOptions, onCloseDelBrand);
      };
    const handleOptionClick = (option) => {
      let newSelectedOptions;
      if (selectedOptions.includes(option)) {
        newSelectedOptions = selectedOptions.filter(item => item !== option);
      } else {
        newSelectedOptions = [...selectedOptions, option];
      }
      setSelectedOptions(newSelectedOptions);
    };
  
  return (
    <>
    {openDelBrand? (
        <>
      
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-9999 outline-none focus:outline-none h-full w-full bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 ">
            <div className="border-0 max-w-80 p-8 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-700 outline-none focus:outline-none">
            <div className="flex items-start justify-between">
                <h3 className="text-3xl font-semibold pb-4">Delete Brand</h3>
              </div>
              <form onSubmit={handleDelete}>
            <button
            type='button'
            className="mb-4 w-full dark:bg-gray-700 px-4 py-2 text-left bg-white border border-gray-700 rounded-lg shadow focus:outline-none"
            onClick={toggleDropdown}
            >
            {/*{selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Select Brands'}*/}
            Select Brands
            </button>

    {isOpen && (
      <div className="absolute z-10 w-full mt-0 left-0  overflow-auto bg-white dark:bg-gray-700 border border-gray-700 rounded-lg shadow max-h-60">
        {brands.map((option) => (
          <label key={option.id} className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-800">
            <input
              type="checkbox"
              checked={selectedOptions.includes(option.id)}
              onChange={() => handleOptionClick(option.id)}
              className="mr-2 text-indigo-600 form-checkbox dark:bg-gray-700"
            />
            {option.brand_name}
          </label>
        ))}
      </div>
    )}
    <button
        type="button"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
        onClick={onCloseDelBrand}
    >
        Cancel
    </button>
    <button
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        type="submit"
    >
        Delete
    </button>
    </form>
  </div>
  </div>
  </>
    ) : null }
  </>
  )
}
