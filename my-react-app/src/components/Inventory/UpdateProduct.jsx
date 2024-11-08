import { useState, useEffect } from "react";
import Category_Select from "../../snippets/CustomCategorySelect";
import SubCategory_Select from "../../snippets/CustomSubCategorySelect";
import Brand_Select from "../../snippets/CustomBrandsSelect";
import FileUpload from "../../snippets/FileUpload";
import { ToastContainer, toast } from "react-toastify";
import { motion } from 'framer-motion';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import TextEditor from "../../utils/TextEditor";
import SelectProductStatus from "../../snippets/SelectProductStatus";
import WeightType from "../../snippets/WeightType";
import TagSelect from "../../snippets/TagSelect";
import { Icon } from '@iconify/react';
import DatePickerComponent from "../../snippets/DatePicker";
import MultiSelect from "../../snippets/MultiSelect";

const UpdateProduct = ({ productId, isOpen, onClose, onProductUpdated }) => {
  const [productName, setProductName] = useState();
  const [MRP, setMRP] = useState();
  const [purchaseRate, setpurchaseRate] = useState();
  const [weight, setWeight] = useState();
  const [weightType, setWeightType] = useState(0);
  const [quantity, setQuantity] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [packagingDate, setpackagingDate] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSubCategory, setSubSelectedCategory] = useState();
  const [selectedBrand, setSelectedBrand] = useState();
  const [editorContent, setEditorContent] = useState();
  const [selectedStatus, setSelectedStatus] = useState();
  const [productIdBarCode, setProductId]=useState();
  const [costPerItem, setCostPerItem] = useState();
  const [profit, setProfit] = useState();
  const [margin, setMargin] = useState();
  const [load, setLoad] = useState(false);
  const [tags, setTags] = useState([]);
  const [collections, setCollections] = useState([]);
  const [files, setFiles] = useState([]);
  const [sellingrate, setsellingRate] = useState();
  const token = localStorage.getItem('access_token');


  useEffect(() => {
    if (productId) {
      axios.get(`http://127.0.0.1:8000/api/FetchSingleProduct/${productId}/`,{
        headers: {
          'Authorization': `Bearer ${token}`
      }
      })
        .then(response => {
          const product = response.data;
          setProductName(product.item.item_name);
          setMRP(product.mrp);
          setProductId(product.item.bar_code);
          setpurchaseRate(product.purchase_rate);
          setWeight(product.unit.weight);
          setWeightType(product.unit.weight_type);
          setQuantity(product.unit.quantity);
          setExpiryDate(product.expired_date );
          setpackagingDate(product.pkt_date );
          setSelectedCategory(product.item.sub_category.category.id);
          setSubSelectedCategory(product.item.sub_category.id);
          setSelectedBrand(product.item.brand.id);
          setEditorContent(product.item.item_description);
          setSelectedStatus(product.item.status);
          setTags(product.item.tags||[])
          setCollections(product.item.collections||[])
          setFiles(product.item.images || []); 
          setsellingRate(product.selling_price)
        })
        .catch(error => {
          toast.error("Failed to load product data."+error);
        });
    }
  }, [productId]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  const handleCostChange = (e) => {
    const cost = parseFloat(e.target.value) || 0;
    setCostPerItem(cost);

    const profitValue = parseFloat(MRP) - cost;
    setProfit(profitValue);

    const marginValue = MRP ? ((profitValue / parseFloat(MRP)) * 100).toFixed(2) : 0;
    setMargin(marginValue);
  };
  const handleMrpChange = (e) => {
    const mrpValue = parseFloat(e.target.value) || 0;
    setMRP(mrpValue);

    const profitValue = mrpValue - parseFloat(costPerItem);
    setProfit(profitValue);

    const marginValue = mrpValue ? ((profitValue / mrpValue) * 100).toFixed(2) : 0;
    setMargin(marginValue);
  };
  const handleEditorChange = (content) => {
    setEditorContent(content);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const SelectedProductStatus = (status) => {
    setSelectedStatus(status);
  };
  const handleFilesUpdate = (newFiles) => {
    setFiles(newFiles);
  };

  const handleSubCategorySelect = (subCategory) => {
    setSubSelectedCategory(subCategory);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoad(true);
    if (!productName || !MRP || !quantity || !selectedCategory || !selectedSubCategory || !selectedBrand || !expiryDate || !purchaseRate || !weight || !packagingDate) {
      toast.error("Please fill out all required fields.");
      setLoad(false);
      return;
    }

    const formData = new FormData();
    formData.append('item_name', productName);
    formData.append('mrp', MRP);
    formData.append('purchase_rate', purchaseRate);
    formData.append('weight', weight);
    formData.append('weight_type', weightType);
    formData.append('category', selectedCategory);
    formData.append('sub_category', selectedSubCategory || '');
    formData.append('brand', selectedBrand || '');
    formData.append('item_description', editorContent || '');
    formData.append('status', selectedStatus || '');
    formData.append('bar_code', productIdBarCode || '');
    formData.append('cost_per_item', costPerItem || '');
    formData.append('quantity', quantity);
    formData.append('tags', tags);
    formData.append('collections', collections);
    formData.append('selling_price', sellingrate);
    formData.append('expiry_date', expiryDate );
    formData.append('pkt_date', packagingDate );

    // Append images to formData
    files.forEach((file, index) => {
      formData.append('images', file);
    });

    axios.put(`http://127.0.0.1:8000/api/UpdateProducts/${productId}/`, formData,{
      headers: {
        'Authorization': `Bearer ${token}`
    }
    })
      .then(response => {
        toast.success("Product updated successfully");
        setLoad(false);
        onClose(); // Close the modal after successful submission
        if (onProductUpdated) {
          onProductUpdated();
        }
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.error) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Error updating product");
        }
        setLoad(false);
      });
  };

  return (
    <>
      <div className={`${isOpen ? "block" : "hidden"} rounded-lg mt-7  inset-0 bg-white dark:bg-boxdark  flex justify-center items-center `}>
        <div className=" p-6 rounded-lg shadow-lg h-full w-full ">
        <form id="myForm" className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3  gap-4 " onSubmit={handleSubmit}>
          <div className="">
            <div className="mb-6">
              <FileUpload onFilesUpdate={(files) => setFiles(files)} onUpdate={files} />
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium dark:text-white text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  id="pName"
                  placeholder="Enter product name"
                  className="mt-2 block w-full font-medium border border-gray-300 rounded-md shadow-sm py-2.5 px-3 focus:ring-0 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white ">Product Description</label>
                <TextEditor onChange={handleEditorChange} onUpdateValue={editorContent} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Product ID</label>
                <input
                  type="text"
                  name="productId"
                  id="pID"
                  placeholder="Enter product ID"
                  className="mt-2 block w-full font-medium border border-gray-300 rounded-md shadow-sm py-2.5 px-3 focus:ring-0 focus:border-transparent sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  value={productIdBarCode}
                  onChange={(e) => setProductId(e.target.value)}
                />
              </div>
              <div>
                <Category_Select onUpdateValue={selectedCategory} onSelectCategory={handleCategorySelect} />
              </div>
              <div>
                <SubCategory_Select onUpdateValue={selectedSubCategory} selectedCategoryId={selectedCategory} onSelectSubCategory={handleSubCategorySelect} />
              </div>
              <div className="relative flex items-end w-full justify-between gap-2">
                <Brand_Select onUpdateValue={selectedBrand} onSelectBrand={setSelectedBrand} />
              </div>
            </div>
          </div>
          <div className=" mt-6 md:mt-0 space-y-6">
            <div>
              <SelectProductStatus onUpdateValue={selectedStatus} onSelectStatus={SelectedProductStatus} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">MRP</label>
                <div className="flex relative  items-center mt-2  ">
                  <Icon icon="mynaui:rupee" width={18} className="absolute  left-2 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    className=" block w-full font-medium border border-gray-300 rounded-md shadow-sm py-2.5 px-7 focus:ring-0 focus:border-transparent sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    value={MRP}
                    onChange={handleMrpChange}
                    name="MRP"

                  />

                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Purchase Price</label>
                <div className="flex relative  items-center mt-2 ">
                  <Icon icon="mynaui:rupee" width={18} className="absolute  left-2 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    name="purchaseRate"
                    className="block w-full font-medium border border-gray-300 rounded-md shadow-sm py-2.5 px-7 focus:ring-0 focus:border-transparent sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    value={purchaseRate}
                    onChange={(e) => setpurchaseRate(e.target.value)}
                  />

                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Sell Price</label>
                <div className="flex relative  items-center mt-2 ">
                  <Icon icon="mynaui:rupee" width={18} className="absolute  left-2 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    className="block w-full font-medium border border-gray-300 rounded-md shadow-sm py-2.5 px-7 focus:ring-0 focus:border-transparent sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    value={sellingrate}
                    name="sellingrate"
                    onChange={(e) => setsellingRate(e.target.value)}
                  />

                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Cost Per Item</label>
                <div className="flex relative  items-center mt-2 ">
                  <Icon icon="mynaui:rupee" width={18} className="absolute  left-2 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    className="block w-full font-medium border border-gray-300 rounded-md shadow-sm py-2.5 px-7 focus:ring-0 focus:border-transparent sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    value={costPerItem}
                    name="costPerItem"
                    onChange={handleCostChange}
                  />

                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Profit</label>
                <div className="flex relative  items-center mt-2 ">
                  <Icon icon="mynaui:rupee" width={18} className="absolute  left-2 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    className="block w-full font-medium border border-gray-300 rounded-md shadow-sm py-2.5 px-7 focus:ring-0 focus:border-transparent sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    value={profit}
                    readOnly
                    name="profit"
                    onChange={(e) => setProfit(e.target.value)}
                  />

                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Weight</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    className="mt-2 block w-full font-medium border border-gray-300 rounded-md shadow-sm py-2.5 px-3 focus:ring-0 focus:border-transparent sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    value={weight}
                    name="weight"
                    onChange={(e) => setWeight(e.target.value)}
                  />
                  <WeightType onUpdateValue={weightType} onWeightChange={(weightType) => setWeightType(weightType)} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Quantity</label>
                <input
                  type="text"
                  className="mt-2 block w-full font-medium border border-gray-300 rounded-md shadow-sm py-2.5 px-3 focus:ring-0 focus:border-transparent sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  value={quantity}
                  name="quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                />

              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white">Tags</label>
              <TagSelect onUpdateValue={tags} onChangeTags={(tags) => setTags(tags)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white">Collections</label>
              <MultiSelect onUpdateValue={collections} onChangeSelections={(collections) => setCollections(collections)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Packaging Date</label>
                <DatePickerComponent value={packagingDate} onChange={(newValue) => setpackagingDate(newValue)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Expiry Date</label>
                <DatePickerComponent value={expiryDate} onChange={(newValue) => setExpiryDate(newValue)} />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                className="font-medium bg-gray-700 text-white py-2 px-4 rounded-md dark:text-white"
                type="button"
                onClick={onClose}
              >
                Discard
              </button>
              <button
                className="font-medium bg-blue-600 text-white py-2 px-4 rounded-md dark:text-white"
                type="submit"
              >
                Update Product
              </button>
            </div>
          </div>
        </form>
        </div>
      </div>
      </>
  );
};

export default UpdateProduct;
