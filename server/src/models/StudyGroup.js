import mongoose from 'mongoose';

const studyGroupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, default: '', maxlength: 500 },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    joinCode: { type: String, required: true, unique: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    career: { type: mongoose.Schema.Types.ObjectId, ref: 'Career', default: null },
    archived: { type: Boolean, default: false }
  },
  { timestamps: true }
);

studyGroupSchema.index({ members: 1 });

export default mongoose.model('StudyGroup', studyGroupSchema);
