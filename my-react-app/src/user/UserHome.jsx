import React,{useContext} from 'react'
import ItemsCard from './ItemsCard'
import { homebanner } from '../snippets/Image_load'
import { FetchProducts, ProductContext } from '../api/FetchProducts'
import ProductCard from './Card/ProductCard'

const username=()=> {
  const { products, loading, error, currentPage, setCurrentPage, totalPages, sliderProducts  } = useContext(ProductContext );
  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
  };

  const handleBuyNow = (product) => {
    console.log('Buying now:', product);
  };

  const handleWishlistToggle = (product) => {
    console.log('Toggled wishlist:', product);
  };
  return (
    <>
    <div className='center homepageBanner'>
      <div className='homebanner page-width' style={{backgroundImage: `url(${homebanner})`}}></div>
    </div>
    
    <FetchProducts>
    <div className="flex flex-wrap justify-center">
      {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onWishlistToggle={handleWishlistToggle}
          />
        ))}
        </div>
    </FetchProducts>
    </>
  )
}
export default username
