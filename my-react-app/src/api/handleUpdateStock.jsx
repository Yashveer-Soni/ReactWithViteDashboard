import axios from 'axios';
import React, { createContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UpdateContext = createContext();

export default function HandleUpdateStockProvider({ children }) {
    const handleUpdateStock = async (product) => {
        try {
            if (!product) {
                toast.error('Invalid stock data');
                return;
            }

            const token = localStorage.getItem('access_token');

            const response = await axios.put(
                `http://127.0.0.1:8000/api/updateStock/${product.id}/`,
                {
                    expired_date: product.expired_date,
                    quantity: product.unit.quantity,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                }
            );
            toast.success('Stock updated successfully');
        } catch (error) {
            console.error('Error updating stock:', error);
            toast.error('Failed to update stock');
        }
    };

    return (
        <UpdateContext.Provider value={{ handleUpdateStock }}>
            {children}
        </UpdateContext.Provider>
    );
}
