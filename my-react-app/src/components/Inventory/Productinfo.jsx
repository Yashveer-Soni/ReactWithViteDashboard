import React, { useContext } from "react";
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { pen } from "../../snippets/Image_load";
import { ProductContext } from "../../api/FetchProducts";
import FullScreenSlider from './FullScreenSlider';
import InfoTabs from '../../components/Tabs/InfoTabs'


const Productinfo = () => {
    const [value, setValue] = React.useState(0);
    const { products, loading, error } = useContext(ProductContext);
    const { id } = useParams();
    const productInfo = products.find((product) => product.item.id.toString() === id);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    if (!productInfo) return <div>Product not found</div>;

    const product_images = productInfo.item.images || []; 

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="">
            <InfoTabs productInfo={productInfo} />
        </div>
    );
};

export default Productinfo;
