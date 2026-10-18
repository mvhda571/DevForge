import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true, index: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    stage: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    objectives: { type: [String], default: [] },
    prerequisites: { type: [String], default: [] },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Topic', topicSchema);
