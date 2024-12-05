import React, { useContext, useState } from 'react';
import { ProductContext } from '../../../api/FetchProducts';
import { toast, ToastContainer } from 'react-toastify';

export default function BrowseProduct({ isOpen, isClose, selectedProducts,collectionId }) {
  const [selected, setSelected] = useState([]);
  const { products, loading, error, fetchProducts, currentPage, setCurrentPage, totalPages } = useContext(ProductContext);
  if(collectionId!=null){
    setSelected(products.find(id=collectionId));
  }
  
  const onSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(products);
    } else {
      setSelected([]);
    }
  };

  const onSelectRow = (product) => {
    setSelected((prevSelected) =>
      prevSelected.some((selectedProduct) => selectedProduct.id === product.id)
        ? prevSelected.filter((selectedProduct) => selectedProduct.id !== product.id)
        : [...prevSelected, product]
    );
  };

  const handleAddProduct = () => {
    if (selected.length > 0) {
      selectedProducts(selected);
      isClose(false);
    } else {
      toast.error("Please select at least one product");
    }
  };

  return (
    <>
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${isOpen ? '' : 'hidden'} bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 overflow-y-auto flex h-full overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full max-h-full`}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Select Products
              </h3>
              <button
                onClick={() => isClose(false)}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          onClick={onSelectAll}
                          type="checkbox"
                          checked={selected.length === products.length}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label className="sr-only">checkbox</label>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            onChange={() => onSelectRow(product)}
                            type="checkbox"
                            checked={selected.some((selectedProduct) => selectedProduct.id === product.id)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label className="sr-only">checkbox</label>
                        </div>
                      </td>
                      <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        {product.item.item_name}
                      </th>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div
                            className={`h-2.5 w-2.5 rounded-full me-2 ${
                              product.item.status === 'Active' || product.item.status === 'active'
                                ? 'bg-green-500'
                                : 'bg-red-500'
                            }`}
                          ></div>
                          {product.item.status}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={handleAddProduct}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add
              </button>
              <button
                onClick={() => isClose(false)}
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
