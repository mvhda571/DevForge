import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  type: { type: String, enum: ['single', 'multiple', 'truefalse', 'short'], default: 'single' },
  prompt: { type: String, required: true },
  options: { type: [String], default: [] },
  correct: { type: [String], required: true },
  explanation: { type: String, default: '' },
  wrongExplanation: { type: String, default: '' },
  concept: { type: String, default: '' }
});

const quizSchema = new mongoose.Schema(
  {
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true, unique: true },
    title: { type: String, default: 'Mini test' },
    passPercent: { type: Number, default: 60, min: 1, max: 100 },
    questions: { type: [questionSchema], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model('Quiz', quizSchema);
