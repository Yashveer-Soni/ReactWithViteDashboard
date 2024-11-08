import React, { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';

const FileUpload = ({ onFilesUpdate, onUpdate }) => {
    const [images, setImages] = useState([]);
    const [previewImageIndex, setPreviewImageIndex] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state

    useEffect(() => {
        if (Array.isArray(onUpdate)) {
            setImages(onUpdate);
        }
    }, [onUpdate]);

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        setLoading(true); // Set loading to true when image is selected
        for (const file of files) {
            await handleImageUpload(file);
        }
        setLoading(false); // Set loading to false once the upload is complete
    };

    const handleImageUpload = async (file) => {
        const compressedFile = await imageCompression(file, { maxSizeMB: 1 });
        const newImage = URL.createObjectURL(compressedFile);
        setImages((prevImages) => {
            const updatedImages = [...prevImages, newImage];
            return updatedImages;
        });
        onFilesUpdate((prevImages) => [...prevImages, compressedFile]);
    };

    const handleDeleteImage = (index) => {
        setImages((prevImages) => {
            const updatedImages = prevImages.filter((_, i) => i !== index);
            return updatedImages;
        });
        onFilesUpdate((prevImages) => prevImages.filter((_, i) => i !== index));
        if (index === previewImageIndex) setPreviewImageIndex(null);
    };

    const autoscale = (index) => {
        setPreviewImageIndex(index);
    };

    const closePreview = () => {
        setPreviewImageIndex(null);
    };

    return (
        <div className="inset-0 bg-opacity-50 flex items-center justify-center">
            <div className="rounded-lg w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4 text-white">Upload Product Images</h2>
                <label
                    htmlFor="uploadFile1"
                    className="text-gray-500 mb-4 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                        <path
                            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                            data-original="#000000"
                        />
                        <path
                            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                            data-original="#000000"
                        />
                    </svg>
                    Upload file

                    <input
                        type="file"
                        id="uploadFile1"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    <p className="text-xs font-medium text-gray-400 mt-2">PNG, JPG, SVG, WEBP, and GIF are allowed.</p>
                </label>

                {/* Loader while uploading images */}
                {loading && (
                    <div className="flex justify-center items-center py-4">
                        <div className="w-8 h-8 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
                    </div>
                )}

                <div className="grid grid-cols-3 gap-4 mb-4">
                    {images.map((image, index) => (
                        <div key={index} className="relative">
                            <img
                                src={
                                    typeof image === 'object' && image.image
                                        ? `http://127.0.0.1:8000${image.image}`
                                        : image instanceof Blob
                                        ? URL.createObjectURL(image)
                                        : image
                                }
                                alt={`Preview ${index}`}
                                className="w-100 object-cover rounded cursor-pointer"
                                onClick={() => autoscale(index)}
                            />
                            <button
                                type="button"
                                onClick={() => handleDeleteImage(index)}
                                className="absolute top-0 right-0 text-red rounded-full p-1"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {previewImageIndex !== null && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={closePreview}
                >
                    <img
                        src=
                        {
                            typeof images[previewImageIndex] === 'object' && images[previewImageIndex].image
                                ? `http://127.0.0.1:8000${images[previewImageIndex].image}`
                                : images[previewImageIndex] instanceof Blob
                                ? URL.createObjectURL(images[previewImageIndex])
                                : images[previewImageIndex]
                        }
                        alt={`Expanded Preview ${previewImageIndex}`}
                        className="max-w-full max-h-full object-contain"
                    />
                </div>
            )}
        </div>
    );
};

export default FileUpload;
