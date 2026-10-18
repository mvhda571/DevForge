import mongoose from 'mongoose';

const parentStudentLinkSchema = new mongoose.Schema(
  {
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    status: { type: String, enum: ['pending', 'active', 'declined', 'revoked'], default: 'pending' },
    relation: { type: String, default: 'ota-ona', maxlength: 40 },
    respondedAt: Date
  },
  { timestamps: true }
);

parentStudentLinkSchema.index({ parent: 1, student: 1 }, { unique: true });

export default mongoose.model('ParentStudentLink', parentStudentLinkSchema);
