import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  userRole: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
  }],
  specifications: {
    material: String,
    weight: String,
    dimensions: String,
  },
  moq: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);