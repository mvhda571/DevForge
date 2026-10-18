import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    icon: { type: String, default: 'Briefcase' },
    description: { type: String, required: true },
    traits: { type: Map, of: Number, default: {} },
    schoolSubjects: { type: [String], default: [] },
    skills: { type: [String], default: [] },
    strengths: { type: [String], default: [] },
    learningPath: { type: [String], default: [] },
    directions: { type: [String], default: [] },
    nextAction: { type: String, default: '' },
    workEnvironment: { type: String, default: '' },
    roadmapLessons: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Career', careerSchema);
