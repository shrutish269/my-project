const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  price: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  inStock: { type: Boolean, default: true },
  quantity: { type: Number, default: 0 },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
  attributes: { type: Schema.Types.Mixed, default: {} },
  popularity: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// Text index for search
productSchema.index({ name: 'text', description: 'text' });
// Compound indexes to support filtering & sorting
productSchema.index({ categoryId: 1, price: 1, createdAt: -1 });

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
