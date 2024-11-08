import React, { useState } from 'react';
import AddCollection from './addCollection';
import ShowCollection from './ShowCollection';

export default function Collection() {
    const [isOpen, setIsOpen] = useState(false); // Set the initial state to `false`.

    const handleClick = () => {
        setIsOpen((prev) => !prev); // Toggle the modal state
    };

    const closeModal = () => {
        setIsOpen(false); // Close the modal by setting the state to false
    };

    return (
        <div>
            <button
                onClick={handleClick}
                data-modal-target="crud-modal"
                data-modal-toggle="crud-modal"
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                Toggle modal
            </button>
            <ShowCollection />
            <AddCollection isOpen={isOpen} closeModal={closeModal} />
        </div>
    );
}
