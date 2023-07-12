import { Schema, model } from 'mongoose';
import { CowModel, ICow } from './cow.interface';
import { CowBreed, CowLocation } from './cow.constant';

const cowSchema = new Schema<ICow>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      enum: CowLocation,
      required: true,
    },
    breed: {
      type: String,
      enum: CowBreed,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Cow = model<ICow, CowModel>('Cow', cowSchema);
