import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    city: {
      type: String,
      required: false,
    },
    trek: {
      type: String,
      required: false,
    },
    month: {
      type: String,
      required: false,
    },
    trekkers: {
      type: Number,
      required: false,
    },
    experience: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Experienced', ''],
      default: '',
    },
    message: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Interested', 'Confirmed', 'Cancelled', 'Payment Pending'],
      default: 'New',
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Success', 'Failed'],
      default: 'Pending',
    },
    payuTransactionId: {
      type: String,
      required: false,
    },
    amountPaid: {
      type: Number,
      required: false,
    },
    paymentTimestamp: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

export const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);
