import React, { useContext, useState } from 'react';
import AddCollection from './addCollection';
import ShowCollection from './ShowCollection';
import { Icon } from '@iconify/react/dist/iconify.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CollectionsProvider } from '../../../api/FetchCollections';

export default function Collection() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen((prev) => !prev); // Toggle the modal state
    };

    const closeModal = () => {
        setIsOpen(false); // Close the modal by setting the state to false
    };

    return (
        <div>
            <ToastContainer />
            <div className='w-full flex items-end justify-end'>
            <button
                onClick={handleClick}
                data-modal-target="crud-modal"
                data-modal-toggle="crud-modal"
                
                className="flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white  focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 "
                type="button"
            >
                <Icon icon="mdi:collection" width={20} className="w-5 h-5 mr-2" />
                Create Collection
            </button>
            </div>
            <CollectionsProvider>
            <ShowCollection />
            <AddCollection isOpen={isOpen} closeModal={closeModal} />
            </CollectionsProvider>
        </div>
    );
}
