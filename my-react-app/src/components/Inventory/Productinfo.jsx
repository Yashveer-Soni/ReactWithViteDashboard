import React, { useContext, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { ProductContext } from "../../api/FetchProducts";
import InfoTabs from '../../components/Tabs/InfoTabs';

const Productinfo = () => {
    const { id } = useParams();
    const { singleProduct, loading, error, fetchSingleProduct } = useContext(ProductContext);

    // Fetch the single product by ID whenever the ID changes
    useEffect(() => {
        fetchSingleProduct(id);
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    if (!singleProduct) return <div>Product not found</div>;

    const product_images = singleProduct.item?.images || [];

    return (
        <div>
            <InfoTabs productInfo={singleProduct} product_images={product_images} />
        </div>
    );
};

export default Productinfo;
