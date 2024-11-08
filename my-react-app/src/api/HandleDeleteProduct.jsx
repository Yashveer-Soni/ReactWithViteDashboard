import { useState, useEffect } from 'react';
import axios from 'axios';


const useHandleDeleteProduct = (fetchProducts) => {
    const [deleteError, setDeleteError ]=useState(null);
    const token=localStorage.getItem('access_token');
    const [loadingbar, setLoading] = useState(false);


    const handleDeleteProduct = async(productId)=>{
        setLoading(true);
        try {
            await axios.delete(`http://127.0.0.1:8000/api/products/${productId}/`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }); 
            fetchProducts();  
        } catch (err) {
            setDeleteError("Failed to delete the product.");
            console.error(err);
        }finally{
            setLoading(false);
        }
    }

    return { deleteError, handleDeleteProduct,loadingbar };
};

export default useHandleDeleteProduct;
