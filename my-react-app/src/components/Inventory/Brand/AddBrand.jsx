// AddBrand.jsx
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import {BrandsContext} from '../../../api/FetchBrands';

const AddBrand = ({ open, onClose }) => {
  const { addBrand } = useContext(BrandsContext);

  const handleAdd = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const brandName = formJson.brand.charAt(0).toUpperCase() + formJson.brand.slice(1).toLowerCase();

    if (brandName) {
      const isValidName = /^[A-Za-z\s]+$/.test(brandName); 
      
      if (isValidName) {
        await addBrand(brandName, onClose);
      } else {
        toast.error('Brand name can only contain letters and spaces.');
      }
    } else {
      toast.error('Please enter a brand name.');
    }
    
  };

  return (
    <>
      {open ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-9999 outline-none focus:outline-none h-full w-full bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 ">
            <div className="border-0 max-w-80 p-8 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-700 outline-none focus:outline-none">
              <div className="flex items-start justify-between">
                <h3 className="text-3xl font-semibold">Add Brand</h3>
              </div>
              <form onSubmit={handleAdd}>
                <input
                  id="name"
                  name="brand"
                  label="Enter Brand Name"
                  className="mb-4 mt-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-0 rounded  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                  type="text"
                />
                <button
                  type="button"
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                  type="submit"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default AddBrand;
