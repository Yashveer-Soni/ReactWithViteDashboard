import React, { createContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export const FetchProducts = ({ children }) => {
    const [products, setProducts] = useState([]); 
    const [sliderProducts, setSliderProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [singleProduct, setSingleProduct] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 20;
    const token = localStorage.getItem('access_token');

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/inventory/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    page: currentPage,
                    page_size: itemsPerPage
                }
            });
            setProducts(response.data.results || []); 
            setTotalPages(Math.ceil(response.data.count / itemsPerPage)); 
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchSingleProduct = async (id) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/inventory/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSingleProduct(response.data); 
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchSliderProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/inventory/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    page: 1,
                    page_size: 10
                }
            });
            setSliderProducts(response.data.results || []); // Ensure results is an array
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchProducts(); 
    }, [currentPage]);

    useEffect(() => {
        fetchSliderProducts(); 
    }, []);

    const memoizedProducts = useMemo(() => products, [products]);
    const memoizedSliderProducts = useMemo(() => sliderProducts, [sliderProducts]);
    const memoizedSingleProduct = useMemo(() => singleProduct, [singleProduct]);

    return (
        <ProductContext.Provider value={{
            products: memoizedProducts,
            sliderProducts: memoizedSliderProducts,
            singleProduct: memoizedSingleProduct,
            fetchSingleProduct,
            loading,
            error,
            fetchProducts,
            currentPage,
            setCurrentPage,
            totalPages
        }}>
            {children}
        </ProductContext.Provider>
    );
};
