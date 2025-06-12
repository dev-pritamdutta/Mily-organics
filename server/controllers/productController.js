import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";
//Add Product :/api/product/add
export const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);
    const images = req.files;

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    await Product.create({ ...productData, image: imagesUrl });
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//Get  Product :/api/product/list
export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//Get Single Product :/api/product/id
export const productById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// DELETE Product : /api/product/delete/:id
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ success: true, message: "Product deleted successfully." });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

// UPDATE Product : /api/product/update/:id
export const updateProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData);
    const files = req.files;

    let imageUrls = [];

    if (files?.length) {
      imageUrls = await Promise.all(
        files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );
    }

    const updated = {
      ...productData,
      ...(imageUrls.length && { image: imageUrls }),
    };

    await Product.findByIdAndUpdate(req.params.id, updated, { new: true });
    res.json({ success: true, message: "Product updated successfully." });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};



//Change  Product inStock :/api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.json({ success: true, message: "Stock Updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
