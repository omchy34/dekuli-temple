
import mongoose from 'mongoose';

const ImgSchema = new mongoose.Schema({
  imgUrl: {
    type: String,
    required: true,
  }
},{
    timestamps: true
})

export const Img = mongoose.model('Img', ImgSchema);