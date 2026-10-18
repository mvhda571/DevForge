import mongoose from 'mongoose';

export const FAVORITE_KINDS = ['career', 'university', 'lesson'];

const favoriteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    kind: { type: String, enum: FAVORITE_KINDS, required: true },
    refId: { type: mongoose.Schema.Types.ObjectId, required: true },
    note: { type: String, default: '', maxlength: 300 }
  },
  { timestamps: true }
);

favoriteSchema.index({ user: 1, kind: 1, refId: 1 }, { unique: true });

export default mongoose.model('Favorite', favoriteSchema);
