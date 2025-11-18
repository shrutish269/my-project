const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  price: Number,
  quantity: Number
}, { _id: false });

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [OrderItemSchema],
  total: { type: Number, required: true },
  status: { type: String, default: 'PENDING' }
}, { timestamps: true });

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
