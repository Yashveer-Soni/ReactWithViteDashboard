import { Icon } from '@iconify/react/dist/iconify.js';
import React,{useState,useEffect, useContext} from 'react';
import BrowseProduct from './BrowseProduct';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextEditor from '../../../utils/TextEditor';
import createSlug from '../../../Helper/slugGenerator';
import { CollectionsContext } from '../../../api/FetchCollections';

export default function AddCollection({ isOpen, closeModal,collectionId }) {
    const { createCollection, loading, error } = useContext(CollectionsContext);
    const [openBrowseModel, setOpenBrowseModel] = useState(false);
    const [selectedProductList, setSelected] = useState([]);
    const [collectionTitle, setCollectionTitle] = useState('');
    const [checkedProducts, setCheckedProducts] = useState([]);
    const [selectedProduct, setSelectedProduct]=useState([]);
    const [Description,setDescription]=useState('');
    const [collections, setCollections] = useState([]);
    const [image, setImage]=useState(null);
    const [preview, setPreview]=useState(null);
    const [slug, setSlug]=useState('');
    console.log(selectedProduct)
    const openBrowseModal = () => {
        setOpenBrowseModel(!openBrowseModel);
    }
    
    const handleImageChange=(e)=>{
        const file = e.target.files[0];
        if (file) {
        setImage(file);
        setPreview(URL.createObjectURL(file)); 
        }
    }

    const handleSlug = (event) => {
        const titleValue = event.target.value;
        setCollectionTitle(titleValue);
        const generatedSlug = createSlug(titleValue); 
        setSlug(generatedSlug);
      };

    const handleEditorChange=(content)=>{
        setDescription(content);
    }


    const handleCheckboxChange = (product) => {
        setCheckedProducts((prevState) => {
            const isChecked = prevState.includes(product.id);
            if (isChecked) {
                setSelectedProduct(prevState => prevState.filter(item => item.item_id !== product.item_id));
                return prevState.filter((id) => id !== product.id);
            } else {
                // Check the checkbox and add the product to selectedProductList
                setSelectedProduct(prevState => [...prevState, product]);
                return [...prevState, product.id];
            }
        });
    };
    
    

    const handleCreateCollection = () => {
        if (collectionTitle.trim() === '' || selectedProduct.length === 0||slug.trim()==='') {
            toast.error('Please enter collection title and select products');
            return;
        }else{
            const formData={
                name:collectionTitle,
                description:Description,
                slug:slug,
                image:image,
                products:selectedProduct
            };
            console.log(formData);
            createCollection(formData);
        }
        // Logic to create the collection
    }
    return (
        <>
            
            <div
                id="crud-modal"
                tabIndex="-1"
                aria-hidden="true"
                className={`${isOpen ? '' : 'hidden'
                    } bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40  fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center w-full h-full`}
            >
                <BrowseProduct isOpen={openBrowseModel} collectionId={collectionId} isClose={setOpenBrowseModel} selectedProducts={setSelected} />
                <div className="relative p-4 w-full max-w-xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center pb-3 justify-between border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Create Collection
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={closeModal} // Close modal
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
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form className="pt-4">
                        <div className='flex gap-3 pb-4'>
                            <div className='w-full'>
                                <div class="mb-5">
                                    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                    <input type="text" onChange={handleSlug} placeholder='Enter Collection Title' id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <div class="">
                                    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slug</label>
                                    <input type="text" onChange={(e)=>{setSlug(e.target.value)}} value={slug} placeholder='Enter Collection Title' id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                            </div>
                            {preview!=null?(
                            <div className='w-full flex flex-col items-center h-40 relative'>
                                <img src={preview} className='w-full h-full object-cover rounded' />
                                <span className='absolute right-1 top-1 bg-black rounded-lg cursor-pointer ' onClick={()=>{setPreview(null)}}>
                                    <Icon icon="majesticons:close-line" width="24" height="24" />
                                </span>
                            </div>
                            ):(
                            <div class="flex items-center justify-center w-full">
                                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input id="dropzone-file" onChange={handleImageChange} type="file" class="hidden" />
                                </label>
                            </div> 
                            )}

                        </div>

                        <div class="mb-5">
                            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <TextEditor onChange={handleEditorChange} />
                        </div>
                        <div>
                            <h3 className='text-sm dark:text-white'>Products</h3>
                            <div className="flex items-center gap-3 mb-4">
                                <div class="relative">
                                    <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <Icon icon="mynaui:search" width={20} />
                                    </div>
                                    <input type="text" id="table-search-users" class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-50 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Products" />
                                </div>
                                <button
                                    type="button"
                                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={openBrowseModal}
                                >
                                    Browse
                                </button>
                                    <select id="default" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Sort : Best Selling</option>
                                        <option value="US">United States</option>
                                        <option value="CA">Canada</option>
                                        <option value="FR">France</option>
                                        <option value="DE">Germany</option>
                                    </select>
                            </div>
                            <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
                                <table class="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <tbody>
                                        {selectedProductList.map((product, index) => (
                                        <tr key={index} class="bg-white dark:bg-gray-800 ">
                                            <td class="w-4 p-4">
                                                <div class="flex items-center">
                                                <input
                                                    id={`checkbox-table-search-${product.id}`}
                                                    type="checkbox"
                                                    checked={checkedProducts.includes(product.id)} // Bind to the checkedProducts list
                                                    onChange={() => handleCheckboxChange(product)} // Toggle checkbox state
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label htmlFor={`checkbox-table-search-${product.id}`} className="sr-only">checkbox</label>
                                                </div>
                                            </td>
                                            <th scope="row" class="flex w-full items-center  py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                <div class="text-center font-semibold">{product.item.item_name}</div>
                                            </th>
                                            <td class="w-15 py-4">
                                                <div class="flex items-center">
                                                <span class="relative right-2 z-1 h-2.5 w-2.5 rounded-full bg-green inline">
                                                    <span class="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-green opacity-75"></span>
                                                </span>
                                                {product.item.status}
                                                </div>
                                            </td>
                                            <td class="w-15 py-4">
                                                <a href="#" type="button" data-modal-target="editUserModal" data-modal-show="editUserModal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                    <Icon icon="basil:cross-solid" width={25} />
                                                </a>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <button type="button" onClick={handleCreateCollection} class=" mt-4 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save</button>
                    </form>
                </div>
            </div>
        </>
    );
}
