import React, { useState } from "react";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function ImageCropper({ imageToCrop, onImageCropped = () => {}, onCancel = () => {} }) {
    const [cropConfig, setCropConfig] = useState({
        unit: '%',
        width: 30,
        aspect: 16 / 9,
    });
    
    const [imageRef, setImageRef] = useState();

    console.log('Image to Crop:', imageToCrop); // Log the imageToCrop

    async function cropImage(crop) {
        if (imageRef && crop.width && crop.height) {
            const croppedImage = await getCroppedImage(imageRef, crop);
            onImageCropped(croppedImage);
        }
    }

    function getCroppedImage(sourceImage, crop) {
        const canvas = document.createElement('canvas');
        const scaleX = sourceImage.naturalWidth / sourceImage.width;
        const scaleY = sourceImage.naturalHeight / sourceImage.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            sourceImage,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('Canvas is empty'));
                    return;
                }
                const croppedImageUrl = URL.createObjectURL(blob);
                resolve(croppedImageUrl);
            }, 'image/jpeg');
        });
    }

    return (
        <ReactCrop
            src={imageToCrop}
            crop={cropConfig}
            ruleOfThirds
            onImageLoaded={setImageRef}
            onComplete={(crop) => cropImage(crop)}
            onChange={setCropConfig}
            crossorigin="anonymous"
        />
    );
}

export default ImageCropper;
