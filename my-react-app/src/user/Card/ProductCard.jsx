import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({ product, onAddToCart, onBuyNow, onWishlistToggle }) => {
    console.log(product);
    const {discount}=20;

  return (
    <div className="bg-white border rounded-lg shadow-lg p-4 m-4 max-w-xs relative hover:scale-105 transition-transform duration-200">
      {discount && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          -{discount}%
        </div>
      )}
      <div className="overflow-hidden rounded-md">
      <img
        src={product.item.images[0]?.image || '/path/to/placeholder.jpg'}
        alt="product"
        className="w-full h-48 object-cover"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">{product.item.item_name}</h3>
        <p className="text-sm text-gray-500">
          MRP: <span className="line-through">{product.mrp}</span>
        </p>
        <p className="text-lg font-bold text-green-600">
          Price: {product.selling_price}
        </p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          className="bg-blue-600 text-white px-3 w-full h-10 py-1 rounded hover:bg-blue-700"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
        {/*<button
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          onClick={() => onBuyNow(product)}
        >
          Buy Now
        </button>
        */}
        <button
          className="text-red-500 text-2xl top-4 right-9 absolute"
          onClick={() => onWishlistToggle(product)}
        >
          ♥
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    mrp: PropTypes.number.isRequired,
    sellingPrice: PropTypes.number.isRequired,
    discount: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onBuyNow: PropTypes.func.isRequired,
  onWishlistToggle: PropTypes.func.isRequired,
};

export default ProductCard;
