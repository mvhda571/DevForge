import mongoose from 'mongoose';

export const LEVELS = ['beginner', 'intermediate', 'advanced'];

const studentProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    learnerType: { type: String, enum: ['school', 'applicant', 'university', 'other'], default: 'school' },
    level: { type: String, enum: LEVELS, default: 'beginner' },
    interests: { type: [String], default: [] },
    favoriteSubjects: { type: [String], default: [] },
    careerInterests: { type: [String], default: [] },
    dailyMinutes: { type: Number, default: 30, min: 10, max: 240 },
    studyDaysPerWeek: { type: Number, default: 5, min: 1, max: 7 },
    goal: { type: String, default: '', maxlength: 300 },
    activeRoadmap: { type: mongoose.Schema.Types.ObjectId, ref: 'LearningRoadmap', default: null }
  },
  { timestamps: true }
);

export default mongoose.model('StudentProfile', studentProfileSchema);
