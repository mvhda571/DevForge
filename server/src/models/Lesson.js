import mongoose from 'mongoose';

const { Schema } = mongoose;

const lessonSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: true, index: true },
    topic: { type: Schema.Types.ObjectId, ref: 'Topic', required: true, index: true },
    title: { type: String, required: true },
    summary: { type: String, default: '' },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    durationMinutes: { type: Number, default: 20, min: 5, max: 180 },
    order: { type: Number, default: 0 },
    objectives: { type: [String], default: [] },
    definitions: [{ _id: false, term: String, meaning: String }],
    sections: [{ _id: false, heading: String, body: String, code: String }],
    examples: [{ _id: false, title: String, steps: [String], code: String, result: String }],
    exercises: [{ _id: false, prompt: String, hint: String, solution: String }],
    summaryPoints: { type: [String], default: [] },
    notice: { type: String, default: '' },
    tutor: {
      simple: { type: String, default: '' },
      analogies: { type: [String], default: [] },
      extraExamples: { type: [String], default: [] },
      steps: { type: [String], default: [] },
      hints: { type: [String], default: [] },
      practice: { type: [String], default: [] },
      checks: [{ _id: false, question: String, answer: String }]
    },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: true }
  },
  { timestamps: true }
);

lessonSchema.index({ topic: 1, order: 1 });

export default mongoose.model('Lesson', lessonSchema);
