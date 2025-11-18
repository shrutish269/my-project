const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1, min: 1 }
}, { _id: false });

const userSchema = new Schema({
  name: { type: String, default: 'Normal User' },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['ADMIN', 'CUSTOMER'], default: 'CUSTOMER' },
  cart: { type: [CartItemSchema], default: [] }
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
