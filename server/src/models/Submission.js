import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema(
  {
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, default: '', maxlength: 10000 },
    link: { type: String, default: '', maxlength: 500 },
    status: { type: String, enum: ['submitted', 'graded'], default: 'submitted' },
    score: { type: Number, default: null },
    feedback: { type: String, default: '', maxlength: 3000 },
    gradedAt: Date
  },
  { timestamps: true }
);

submissionSchema.index({ assignment: 1, student: 1 }, { unique: true });

export default mongoose.model('Submission', submissionSchema);
