import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    files: [
      {
        type: String,
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const Document = mongoose.model('Document', documentSchema);
