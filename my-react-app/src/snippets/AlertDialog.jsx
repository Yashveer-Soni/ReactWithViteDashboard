import * as React from 'react';

export default function AlertDialog({ open, handleClose, handleAgree, loading }) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${open ? 'block' : 'hidden'}`}
      role="dialog"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>

      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto relative z-10">
        <h2
          id="alert-dialog-title"
          className="text-lg font-semibold text-gray-800"
        >
          Confirm Delete
        </h2>

        <p id="alert-dialog-description" className="mt-2 text-sm text-gray-600">
          Are you sure you want to delete this product? This action cannot be undone.
        </p>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Disagree
          </button>
          <button
            onClick={handleAgree}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            autoFocus
          >
            {loading? 'Deleting...' : 'Agree'}
          </button>
        </div>
      </div>
    </div>
  );
}
