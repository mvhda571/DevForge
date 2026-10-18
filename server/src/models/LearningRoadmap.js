import mongoose from 'mongoose';

const { Schema } = mongoose;

const moduleSchema = new Schema(
  {
    topic: { type: Schema.Types.ObjectId, ref: 'Topic' },
    subject: { type: Schema.Types.ObjectId, ref: 'Subject' },
    title: String,
    stage: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
    order: Number,
    objectives: [String],
    prerequisites: [String],
    lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
    optional: { type: Boolean, default: false }
  },
  { _id: true }
);

const learningRoadmapSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    career: { type: Schema.Types.ObjectId, ref: 'Career', required: true },
    title: { type: String, required: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    dailyMinutes: { type: Number, default: 30 },
    studyDaysPerWeek: { type: Number, default: 5 },
    goal: { type: String, default: '' },
    modules: [moduleSchema],
    status: { type: String, enum: ['active', 'archived'], default: 'active' }
  },
  { timestamps: true }
);

learningRoadmapSchema.index({ user: 1, career: 1 }, { unique: true });

export default mongoose.model('LearningRoadmap', learningRoadmapSchema);
