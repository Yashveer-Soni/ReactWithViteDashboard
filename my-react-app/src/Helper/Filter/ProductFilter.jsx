import React, { useState } from "react";
import DatePicker2 from "../../snippets/DateRangePicker";

function Filters() {
  const [showCategory, setShowCategory] = useState(true);
  const [showPrice, setShowPrice] = useState(false);
  const [showStock, setStock] = useState(false);
  const [ExpiryFilter,setExpiryFilter]=useState(false);

  return (
    <div className="p-4 absolute z-10 right-0 top-12 w-100 bg-gray-800 text-gray-200 rounded-lg">
      <div className="text-sm">
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Filters</span>
          <div>
            <button className="text-blue-400 mr-2">Save view</button>
            <button className="text-blue-400">Clear all</button>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search keywords..."
          className="w-full p-2 mb-4 rounded-md bg-gray-700 text-gray-200"
        />
        
        {/* Category Filter */}
        <div className="mb-4">
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => setShowCategory(!showCategory)}
          >
            <span className="font-semibold">Category</span>
            <span>{showCategory ? "-" : "+"}</span>
          </div>
          {showCategory && (
            <div className="mt-2">
              {["Apple", "Microsoft", "Logitech", "Sony", "Asus", "Dell", "MSI", "Canon", "BenQ", "Razor"].map(
                (item, index) => (
                  <div key={index} className="flex items-center">
                    <input type="checkbox" id={item} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor={item} className="ms-2 cursor-pointer">
                      {item} <span className="text-gray-400 ">(56)</span>
                    </label>
                  </div>
                )
              )}
              <button className="text-blue-400 mt-2">View all</button>
            </div>
          )}
        </div>

        {/* Price Filter */}
        <div className="mb-4">
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => setShowPrice(!showPrice)}
          >
            <span className="font-semibold"> Price</span>
            <span>{showPrice ? "-" : "+"}</span>
          </div>
          {showPrice && (
            <div className="mt-2">
              <input
                type="number"
                placeholder="From"
                className="w-full p-2 mb-2 rounded-md bg-gray-700 text-gray-200"
              />
              <input
                type="number"
                placeholder="To"
                className="w-full p-2 rounded-md bg-gray-700 text-gray-200"
              />
            </div>
          )}
        </div>

        {/* Stock Filter */}
        <div className="mb-4">
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => setStock(!showStock)}
          >
            <span className="font-semibold">Availability</span>
            <span>{showStock ? "-" : "+"}</span>
          </div>
          {showStock && (
            <div className="mt-2 space-y-2">
              {["In Stock", "Out Of Stock"].map((stock) => (
                <div key={stock} className="flex items-center">
                  <input
                    type="checkbox"
                    id={stock}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
                    // defaultChecked={stock === "Out Of Stock" || stock === "In Stock"}
                  />
                  <label htmlFor={stock} className="ms-2 cursor-pointer">
                    {stock}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Expiry Filter  */}
        <div className="mb-4">
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => setExpiryFilter(!ExpiryFilter)}
          >
            <span className="font-semibold">Expiry</span>
            <span>{ExpiryFilter ? "-" : "+"}</span>
          </div>
          {ExpiryFilter && (
            <DatePicker2 />
          )}
        </div>
      </div>
    </div>
  );
}

export default Filters;
