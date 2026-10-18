import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    day: { type: String, required: true },
    minutes: { type: Number, default: 0 },
    lessonsCompleted: { type: Number, default: 0 },
    quizzes: { type: Number, default: 0 },
    xp: { type: Number, default: 0 }
  },
  { timestamps: true }
);

activityLogSchema.index({ user: 1, day: 1 }, { unique: true });

export default mongoose.model('ActivityLog', activityLogSchema);
