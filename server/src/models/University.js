import mongoose from 'mongoose';

const sourced = { verified: { type: Boolean, default: false }, source: { type: String, default: '' } };

const universitySchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    localName: { type: String, default: '' },
    country: { type: String, required: true, index: true },
    city: { type: String, required: true, index: true },
    website: { type: String, default: '' },
    type: { type: String, enum: ['public', 'private'], required: true },
    description: { type: String, default: '' },
    fields: { type: [String], default: [], index: true },
    degreeLevels: { type: [String], default: [] },
    languages: { type: [String], default: [] },
    programs: [{ _id: false, name: String, degree: String, language: String }],
    tuition: {
      min: { type: Number, default: null },
      max: { type: Number, default: null },
      currency: { type: String, default: 'USD' },
      period: { type: String, default: 'yil' },
      note: { type: String, default: '' },
      ...sourced
    },
    scholarships: [{ _id: false, name: String, description: String, url: String, ...sourced }],
    admission: { requirements: { type: [String], default: [] }, ...sourced },
    deadlines: [{ _id: false, label: String, date: Date, ...sourced }],
    location: {
      lat: { type: Number, default: null },
      lng: { type: Number, default: null },
      approximate: { type: Boolean, default: true }
    },
    dataStatus: { type: String, enum: ['demo', 'partial', 'verified'], default: 'demo' },
    lastVerifiedAt: { type: Date, default: null },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('University', universitySchema);
