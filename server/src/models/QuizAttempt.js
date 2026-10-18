import mongoose from 'mongoose';

const { Schema } = mongoose;

const quizAttemptSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    quiz: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
    lesson: { type: Schema.Types.ObjectId, ref: 'Lesson', required: true },
    subject: { type: Schema.Types.ObjectId, ref: 'Subject' },
    answers: [{ _id: false, questionId: String, answer: [String], correct: Boolean }],
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    percent: { type: Number, required: true },
    passed: { type: Boolean, required: true },
    weakConcepts: { type: [String], default: [] }
  },
  { timestamps: true }
);

quizAttemptSchema.index({ user: 1, createdAt: -1 });
quizAttemptSchema.index({ user: 1, lesson: 1 });

export default mongoose.model('QuizAttempt', quizAttemptSchema);
