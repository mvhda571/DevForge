import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema(
  {
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'StudyGroup', required: true, index: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true, maxlength: 150 },
    description: { type: String, default: '', maxlength: 3000 },
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', default: null },
    dueAt: { type: Date, required: true },
    maxScore: { type: Number, default: 100, min: 1, max: 1000 }
  },
  { timestamps: true }
);

export default mongoose.model('Assignment', assignmentSchema);
