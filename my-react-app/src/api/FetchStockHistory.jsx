import React, { createContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';

export const StockContext = createContext();

export default function FetchStockHistory({ children }) {
    const [stocksHistoryData, setStocksHistory] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1); 
    const [pageSize, setPageSize] = useState(20); 

    const token = localStorage.getItem('access_token');

    const fetchStockHistory = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/inventory/stockhistory/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    page: page, 
                    page_size: pageSize 
                }
            });
            console.log(response);
            setStocksHistory(response.data.results || []);
            setTotalPages(Math.ceil(response.data.count / pageSize)); 
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStockHistory(currentPage); 
    }, [currentPage, pageSize]);

    const memoizedStockHistory = useMemo(() => stocksHistoryData, [stocksHistoryData]);

    const onPageChange = (page) => setCurrentPage(page); 
    const onPageSizeChange = (size) => setPageSize(size);

    return (
        <StockContext.Provider value={{
            stockHistorys: memoizedStockHistory,
            loading,
            error,
            currentPage,
            totalPages,
            pageSize,
            onPageChange,
            onPageSizeChange,
            fetchStockHistory
        }}>
            {children}
        </StockContext.Provider>
    );
}
