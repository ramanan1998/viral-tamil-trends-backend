import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    rating: { type: Number, required: true },
})

const productsModel = mongoose.model("products", productSchema);

export default productsModel;