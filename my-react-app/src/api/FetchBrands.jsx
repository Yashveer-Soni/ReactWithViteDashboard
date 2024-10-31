// FetchBrands.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const BrandsContext = createContext();

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const BrandsProvider = ({ children }) => {
  const token = localStorage.getItem('access_token');
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBrands = async () => {
    setLoading(true); 
    try {
      const response = await axios.get(`${API_BASE_URL}/brands/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBrands(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching brands:', error);
      toast.error('Failed to load brands. Please try again later.');
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []); 

  const addBrand = async (brandName, onClose) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/addbrands/`,
        { name: brandName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBrands((prevBrands) => [...prevBrands, response.data]);
      toast.success('Brand added successfully!');
      onClose && onClose();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('Brand already exists.');
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  const DeleteBrand = async (selectedOptions, onCloseDelBrand) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/delete_brands/`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { ids: selectedOptions } 
        }
      );
      setBrands((prevBrands) => prevBrands.filter(brand => !selectedOptions.includes(brand.name)));
      onCloseDelBrand && onCloseDelBrand();
      setTimeout(() => {
        toast.success('Selected brands deleted successfully!');
      }, 1000);
    } catch (error) {
      toast.error('Failed to delete selected brands. Please try again.');
    }
  };
  

  return (
    <BrandsContext.Provider value={{ brands, loading, addBrand,DeleteBrand,fetchBrands }}>
      {children}
    </BrandsContext.Provider>
  );
};

export default BrandsProvider;
