import React, { useEffect, useState } from "react";
import { assets, categories } from "../../assets/assets";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";

const EditProduct = () => {
  const { id } = useParams();
  const { axios } = useAppContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    description: [],
    category: "",
    price: "",
    offerPrice: "",
    productType: "",
    image: [],
  });

  // Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/product/${id}`);
        if (data.success) {
          setProductData(data.product);
        } else {
          toast.error("Failed to fetch product");
        }
      } catch (err) {
        toast.error("Error fetching product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...productData,
        description:
          typeof productData.description === "string"
            ? productData.description.split("\n")
            : productData.description,
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(payload));

      files.forEach((file) => {
        formData.append("images", file);
      });

      const { data } = await axios.put(`/api/product/update/${id}`, formData);
      if (data.success) {
        toast.success("Product updated successfully");
        navigate("/seller/product-list");
      } else {
        toast.error("Failed to update product");
      }
    } catch (err) {
      toast.error("Update error");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e, index) => {
    const updated = [...files];
    updated[index] = e.target.files[0];
    setFiles(updated);
  };

  if (loading) return <Loading />;

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        {/* Upload New Images */}
        <div>
          <p className="text-base font-medium">Change Images (optional)</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, i) => (
                <label key={i} htmlFor={`img-${i}`}>
                  <input
                    type="file"
                    id={`img-${i}`}
                    hidden
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, i)}
                  />
                  <img
                    src={
                      files[i]
                        ? URL.createObjectURL(files[i])
                        : productData.image[i] || assets.upload_area
                    }
                    alt="preview"
                    className="max-w-24 h-24 object-cover rounded cursor-pointer"
                  />
                </label>
              ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium">Product Name</label>
          <input
            type="text"
            value={productData.name}
            onChange={(e) =>
              setProductData({ ...productData, name: e.target.value })
            }
            className="outline-none py-2 px-3 border rounded border-gray-500/40"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium">Description</label>
          <textarea
            rows={4}
            value={
              Array.isArray(productData.description)
                ? productData.description.join("\n")
                : productData.description
            }
            onChange={(e) =>
              setProductData({ ...productData, description: e.target.value })
            }
            className="outline-none py-2 px-3 border rounded border-gray-500/40 resize-none"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium">Category</label>
          <select
            value={productData.category}
            onChange={(e) =>
              setProductData({ ...productData, category: e.target.value })
            }
            className="outline-none py-2 px-3 border rounded border-gray-500/40"
          >
            <option value="">Select Category</option>
            {categories.map((item, idx) => (
              <option key={idx} value={item.path}>
                {item.path}
              </option>
            ))}
          </select>
        </div>

        {/* Prices */}
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-base font-medium">Price</label>
            <input
              type="number"
              value={productData.price}
              onChange={(e) =>
                setProductData({ ...productData, price: e.target.value })
              }
              className="outline-none py-2 px-3 border rounded border-gray-500/40"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-base font-medium">Offer Price</label>
            <input
              type="number"
              value={productData.offerPrice}
              onChange={(e) =>
                setProductData({ ...productData, offerPrice: e.target.value })
              }
              className="outline-none py-2 px-3 border rounded border-gray-500/40"
            />
          </div>
        </div>

        {/* Product Type */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium">Product Type</label>
          <select
            value={productData.productType}
            onChange={(e) =>
              setProductData({ ...productData, productType: e.target.value })
            }
            className="outline-none py-2 px-3 border rounded border-gray-500/40"
          >
            <option value="">Select Type</option>
            <option value="normal">Normal</option>
            <option value="bestseller">Bestseller</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-8 py-2.5 bg-[var(--color-primary)] text-white font-medium rounded cursor-pointer"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
