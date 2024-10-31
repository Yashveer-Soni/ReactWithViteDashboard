import React from 'react'
import FullscreenSwiper from './FullScreenSlider'
export default function OverviewComponent({productInfo,product_images}) {
  return (
    <div className='grid gap-10 grid-cols-1 md:grid-cols-2 2xl:grid-cols-2 '>
        <div>
            <h3 className='font-bold dark:text-gray-200'>Primary Details</h3>
            <div className='pt-5 flex justify-between items-center md:w-100'>
                <h4 className='md:w-80'>Product Name</h4>
                <h4 className='text-black dark:text-gray-200 w-25 md:w-50'>{productInfo.item.item_name}</h4>
            </div>
            <div className='pt-5 flex justify-between items-center md:w-100'>
                <h4 className='md:w-80'>Product ID</h4>
                <h4 className='text-black dark:text-gray-200 w-25 md:w-50'>{productInfo.item.bar_code}</h4>
            </div>
            <div className='pt-5 flex justify-between items-center md:w-100'>
                <h4 className='md:w-80'>Product Brand</h4>
                <h4 className='text-black dark:text-gray-200 w-25 md:w-50'>{productInfo?.item?.brand?.brand_name || 'Brand Not Available'}</h4>
            </div>
            <div className='pt-5 flex justify-between items-center md:w-100'>
                <h4 className='md:w-80'>Product category</h4>
                <h4 className='text-black dark:text-gray-200 w-25 md:w-50'>{productInfo.item.sub_category.category.category_name}</h4>
            </div>
            <div className='pt-5 flex justify-between items-center md:w-100'>
                <h4 className='md:w-80'>Expiry Date</h4>
                <h4 className='text-black dark:text-gray-200 w-25 md:w-50'>{productInfo.expired_date}</h4>
            </div>
            <div className='pt-5 flex justify-between items-center md:w-100'>
                <h4 className='md:w-80'>Threshold Value</h4>
                <h4 className='text-black dark:text-gray-200 w-25 md:w-50'>12</h4>
            </div>

            <h3 className='font-bold pt-10 dark:text-gray-200'>Supplier Details</h3>
            <div className='pt-5 flex justify-between items-center md:w-100'>
                <h4 className='md:w-80'>Supplier Name</h4>
                <h4 className='text-black dark:text-gray-200 w-25 md:w-50'>Ronald Martin</h4>
            </div>
            <div className='pt-5 flex justify-between items-center md:w-100'>
                <h4 className='md:w-80'>Contact Number</h4>
                <h4 className='text-black dark:text-gray-200 w-25 md:w-50'>98789 86757</h4>
            </div>

            <h3 className='font-bold pt-10 dark:text-gray-200'>Stock Locations</h3>

            <div class="relative overflow-x-auto pt-5">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3 font-bold">
                            Store Name
                            </th>
                            <th scope="col" class="px-6 py-3 text-end font-bold">
                            Stock in hand
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Sulur Branch
                            </th>
                            <td class="px-6 py-4 text-end">
                            15
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Singanallur Branch
                            </th>
                            <td class="px-6 py-4 text-end">
                            19
                            </td>
                        </tr>
                     
                    </tbody>
                </table>
            </div>

        </div>
        <div className='flex flex-col  items-center'>
            <div className='w-100'>
                <FullscreenSwiper product_images={product_images} />
            </div>
            <div className='pt-20 flex justify-between items-center '>
                <h4 className='md:w-80'>Opening Stock</h4>
                <h4 className='text-black dark:text-gray-200 '>40</h4>
            </div>
            <div className='pt-5 flex justify-between items-center'>
                <h4 className='md:w-80'>Remaining  Stock</h4>
                <h4 className='text-black dark:text-gray-200 '>34</h4>
            </div>
            <div className='pt-5 flex justify-between items-center'>
                <h4 className='md:w-80'>On the way</h4>
                <h4 className='text-black dark:text-gray-200 '>15</h4>
            </div>
            <div className='pt-5 flex justify-between items-center '>
                <h4 className='md:w-80'>Threshold value</h4>
                <h4 className='text-black dark:text-gray-200'>12</h4>
            </div>
        </div>
    </div>
  )
}
