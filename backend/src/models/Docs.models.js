
import mongoose from 'mongoose';

const DocsSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  eventDate: {
    type: Date,
    default: null
  },
  description: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  PDF:{
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

export const Docs = mongoose.model('Docs', DocsSchema);