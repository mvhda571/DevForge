import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    icon: { type: String, default: 'BookOpen' },
    color: { type: String, default: 'violet' },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Subject', subjectSchema);
