import React, { useContext, useState, useEffect, useRef } from 'react';
import { UpdateContext } from '../../api/handleUpdateStock';
import { ProductContext } from '../../api/FetchProducts';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function StockTable() {
    const { handleUpdateStock } = useContext(UpdateContext);
    const { products: contextProducts } = useContext(ProductContext); 
    const [updatedProducts, setUpdatedProducts] = useState(contextProducts);
    const inputRefs = useRef([]);

    useEffect(() => {
        setUpdatedProducts(contextProducts);
    }, [contextProducts]);

    const handleQuantityChange = (index, newValue) => {
        const quantity = parseInt(newValue, 10) || 0;
        if (quantity < 0) {
            toast.error("Quantity cannot be negative");
            return;
        }

        const updatedProduct = { ...updatedProducts[index], unit: { ...updatedProducts[index].unit, quantity } };
        setUpdatedProducts(prevProducts =>
            prevProducts.map((product, i) => (i === index ? updatedProduct : product))
        );
    };

    const handleExpiryChange = (index, newValue) => {
        const newExpiryDate = new Date(newValue);
        const currentDate = new Date();

        if (newExpiryDate < currentDate) {
            toast.error("Expiry date cannot be in the past");
            return;
        }

        const updatedProduct = { ...updatedProducts[index], expired_date: newValue };
        setUpdatedProducts(prevProducts =>
            prevProducts.map((product, i) => (i === index ? updatedProduct : product))
        );
    };

    const handleQuantityBlur = (index) => {
        const productToUpdate = updatedProducts[index];
        handleUpdateStock(productToUpdate);
    };

    const handleExpiryBlur = (index) => {
        const productToUpdate = updatedProducts[index];
        handleUpdateStock(productToUpdate);
    };

    return (

        <div>
            <ToastContainer></ToastContainer>
            <div className="relative">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Product name</th>
                            <th scope="col" className="px-6 py-3">Available</th>
                            <th scope="col" className="px-6 py-3">Expiry</th>
                        </tr>
                    </thead>
                    <tbody>
                        {updatedProducts.map((item, index) => (
                            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.item.item_name}
                                </th>
                                <td className="px-6 py-4">
                                    <input
                                        type="number"
                                        className="rounded outline-0 focus:ring-0 bg-white dark:bg-gray-800 border border-gray-300 focus:border-gray-300"
                                        value={item.unit.quantity}
                                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                                        onBlur={() => handleQuantityBlur(index)}
                                        ref={(el) => (inputRefs.current[index] = el)} // Track input ref
                                    />
                                </td>
                                <td className="relative px-2 md:px-6 py-3 lg:w-[250px] md:w-[250px]" tabIndex="0">
                                    <input type="checkbox" id={`toggleDateRangeDropdown-${index}`} className="hidden peer" />

                                    <label
                                        htmlFor={`toggleDateRangeDropdown-${index}`}
                                        id={`dateRangeButton-${index}`}
                                        className="inline-flex text-sm items-center min-w-[100px] cursor-pointer"
                                    >
                                        {item.expired_date}
                                    </label>

                                    <div
                                        id={`dateRangeDropdown-${index}`}
                                        className="z-20 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-48 lg:w-48 dark:bg-gray-700 dark:divide-gray-600 hidden peer-checked:block"
                                    >
                                        <div className="p-3" aria-labelledby={`dateRangeButton-${index}`}>
                                            <div date-rangepicker="true" className="block">
                                                <div className="relative">
                                                    <input
                                                        id={`dueDate-${index}`}
                                                        name={`dueDate-${index}`}
                                                        type="date"
                                                        className="border block rounded-md py-1.5 px-1 text-sm text-gray-900 sm:text-sm sm:leading-6 w-[100%]"
                                                        value={item.expired_date}
                                                        onChange={(e) => handleExpiryChange(index, e.target.value)}
                                                        onBlur={() => handleExpiryBlur(index)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
