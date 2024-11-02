import React, { useContext } from "react";
import { StockContext } from '../../api/FetchStockHistory';
import Skeleton from "../Skeleton/skeleton";
import Paginate from "../../user/Pagination/Paginate";

export default function StockHistoryTable() {
    const { stockHistorys, loading, error, currentPage, totalPages, onPageChange } = useContext(StockContext);

    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="relative overflow-x-auto pt-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">No.</th>
                        <th scope="col" className="px-6 py-3">Product Name</th>
                        <th scope="col" className="px-6 py-3">Previous Quantity</th>
                        <th scope="col" className="px-6 py-3">New Quantity</th>
                        <th scope="col" className="px-6 py-3">Previous Expiry Date</th>
                        <th scope="col" className="px-6 py-3">New Expiry Date</th>
                        <th scope="col" className="px-6 py-3">Updated At</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                            <tr>
                                <td colSpan="7" className=" py-4">
                                    <Skeleton rows={10} height="1.4rem" widths={['100%']} />
                                </td>
                            </tr>
                    ) : stockHistorys.length > 0 ? (
                        stockHistorys.map((stock, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                    {stock.id}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                    {stock.inventory_item_name}
                                </td>
                                <td className="px-6 py-4">{stock.previous_quantity}</td>
                                <td className="px-6 py-4">{stock.new_quantity}</td>
                                <td className="px-6 py-4">{stock.previous_expired_date || 'N/A'}</td>
                                <td className="px-6 py-4">{stock.new_expired_date || 'N/A'}</td>
                                <td className="px-6 py-4">{new Date(stock.updated_at).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="px-6 py-4 text-center">No stock history available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {totalPages>1?(
                <Paginate
                initialPage={currentPage}
                totalPages={totalPages}
                onPageChangeCallback={onPageChange}
            />
            ):(null)}
            
        </div>
    );
}
