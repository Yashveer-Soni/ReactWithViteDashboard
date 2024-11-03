import React, { useState, useRef } from 'react';
import imageCompression from 'browser-image-compression';
import ImageCropper from '../Helper/ImageCropper';

const FileUpload = ({ onFilesUpdate }) => {
    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(null);
    const [previewImageIndex, setPreviewImageIndex] = useState(null);

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        for (const file of files) {
            await handleImageUpload(file);
        }
    };

    const handleImageUpload = async (file) => {
        const compressedFile = await imageCompression(file, { maxSizeMB: 1 });
        const newImage = URL.createObjectURL(compressedFile);
        setImages((prevImages) => [...prevImages, newImage]);
        onFilesUpdate((prevImages) => [...prevImages, compressedFile]);
    };

    const handleDeleteImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
        onFilesUpdate((prevImages) => prevImages.filter((_, i) => i !== index));
        setPreviewImageIndex(null); // Reset preview if deleted
    };

    const handleCrop = (index) => {
        setCurrentImage(images[index]);
        setPreviewImageIndex(index);
    };

    const handleImageCropped = (croppedImage) => {
        setImages((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages[previewImageIndex] = croppedImage; // Update the cropped image
            return updatedImages;
        });
        setPreviewImageIndex(null); // Close the cropper after cropping
    };

    return (
        <div className="inset-0 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Add Product Images</h2>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="mb-4"
                />
                {currentImage && (
                    <ImageCropper
                        imageToCrop={currentImage}
                        onImageCropped={handleImageCropped}
                        onCancel={() => setPreviewImageIndex(null)}
                    />
                )}
                <div className="grid grid-cols-1 gap-4 mb-4">
                    {images.map((image, index) => (
                        <div key={index} className="relative">
                            <img
                                src={image}
                                alt={`Preview ${index}`}
                                className="w-100 object-cover rounded cursor-pointer"
                                onClick={() => handleCrop(index)}
                            />
                            <button
                                type="button"
                                onClick={() => handleDeleteImage(index)}
                                className="absolute top-0 right-0 bg-red-500 h-7 w-7 text-white rounded-full p-1"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
