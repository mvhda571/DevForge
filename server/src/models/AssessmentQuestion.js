import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    label: { type: String, required: true },
    traits: { type: Map, of: Number, default: {} }
  },
  { _id: false }
);

const assessmentQuestionSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    order: { type: Number, required: true },
    dimension: { type: String, required: true },
    text: { type: String, required: true },
    hint: { type: String, default: '' },
    multiple: { type: Boolean, default: false },
    maxSelect: { type: Number, default: 1 },
    options: { type: [optionSchema], validate: (v) => v.length >= 2 },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('AssessmentQuestion', assessmentQuestionSchema);
