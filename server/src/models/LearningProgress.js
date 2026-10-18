import mongoose from 'mongoose';

const { Schema } = mongoose;

export const LESSON_STATUS = ['not_started', 'in_progress', 'completed', 'needs_review'];

const learningProgressSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lesson: { type: Schema.Types.ObjectId, ref: 'Lesson', required: true },
    subject: { type: Schema.Types.ObjectId, ref: 'Subject' },
    topic: { type: Schema.Types.ObjectId, ref: 'Topic' },
    status: { type: String, enum: LESSON_STATUS, default: 'in_progress' },
    exercisesDone: { type: [Number], default: [] },
    attempts: { type: Number, default: 0 },
    bestPercent: { type: Number, default: 0 },
    lastPercent: { type: Number, default: null },
    timeSpentSec: { type: Number, default: 0 },
    startedAt: { type: Date, default: Date.now },
    completedAt: Date,
    xpAwarded: {
      complete: { type: Boolean, default: false },
      quizPass: { type: Boolean, default: false },
      perfect: { type: Boolean, default: false }
    }
  },
  { timestamps: true }
);

learningProgressSchema.index({ user: 1, lesson: 1 }, { unique: true });
learningProgressSchema.index({ user: 1, status: 1 });

export default mongoose.model('LearningProgress', learningProgressSchema);
