import mongoose from 'mongoose';

const careerAssessmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    status: { type: String, enum: ['in_progress', 'completed'], default: 'in_progress' },
    answers: { type: Map, of: [String], default: {} },
    currentIndex: { type: Number, default: 0 },
    completedAt: Date
  },
  { timestamps: true }
);

careerAssessmentSchema.index({ user: 1, status: 1 });

export default mongoose.model('CareerAssessment', careerAssessmentSchema);
