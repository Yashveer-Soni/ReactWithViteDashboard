import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const FullscreenSwiper = ({ product_images }) => {
    console.log(`product image`,product_images);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSlide, setSelectedSlide] = useState(null);

    const openFullscreen = (image) => {
        setSelectedSlide(image);
        setIsOpen(true);
    };

    const closeFullscreen = () => {
        setIsOpen(false);
        setSelectedSlide(null);
    };

    return (
        <div>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                modules={[Navigation]}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {product_images.map((image, index) => (
                    <SwiperSlide key={index} onClick={() => openFullscreen(image)}>
                        <img src={`http://127.0.0.1:8000${image.image}`}  alt={`Slide ${index + 1}`} style={{ width: '100%' ,objectFit:'contain', height:'100%', cursor: 'pointer' }} />
                    </SwiperSlide>
                ))}
            </Swiper>

            {isOpen && (
                <div style={fullscreenStyle} onClick={closeFullscreen}>
                    <div style={slideStyle}>
                        <img src={`http://127.0.0.1:8000${selectedSlide.image}`} alt="Selected"  />
                    </div>
                </div>
            )}
        </div>
    );
};

const fullscreenStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
};

const slideStyle = {
    color: '#fff',
    textAlign: 'center',
};

export default FullscreenSwiper;
