import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true
  },
  product: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending"
  },
  orderedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // optional: adds createdAt and updatedAt fields
});

const orderModel = mongoose.model("order", orderSchema);

export default orderModel;
