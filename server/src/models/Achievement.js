import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    key: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    icon: { type: String, default: 'Award' },
    kind: { type: String, enum: ['milestone', 'badge', 'streak'], default: 'milestone' },
    xp: { type: Number, default: 0 }
  },
  { timestamps: true }
);

achievementSchema.index({ user: 1, key: 1 }, { unique: true });

export default mongoose.model('Achievement', achievementSchema);
