import mongoose from 'mongoose';

const contributionSchema = new mongoose.Schema(
  { trait: String, label: String, weight: Number, userScore: Number, points: Number },
  { _id: false }
);

const recommendationSchema = new mongoose.Schema(
  {
    career: { type: mongoose.Schema.Types.ObjectId, ref: 'Career' },
    slug: String,
    name: String,
    score: Number,
    contributions: [contributionSchema],
    matchedStrengths: [String],
    reasons: [String],
    aiExplanation: { type: String, default: '' }
  },
  { _id: false }
);

const assessmentResultSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    assessment: { type: mongoose.Schema.Types.ObjectId, ref: 'CareerAssessment', required: true },
    traitProfile: { type: Map, of: Number, default: {} },
    ranking: [recommendationSchema],
    top: [recommendationSchema],
    algorithmVersion: { type: String, default: 'weighted-traits-v1' }
  },
  { timestamps: true }
);

assessmentResultSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model('AssessmentResult', assessmentResultSchema);
