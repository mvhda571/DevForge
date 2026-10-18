import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    kind: { type: String, enum: ['study', 'deadline'], default: 'study' },
    title: { type: String, required: true, trim: true, maxlength: 150 },
    note: { type: String, default: '', maxlength: 1000 },
    dueAt: { type: Date, required: true },
    repeat: { type: String, enum: ['none', 'daily', 'weekly'], default: 'none' },
    university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', default: null },
    done: { type: Boolean, default: false },
    notifiedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

reminderSchema.index({ user: 1, dueAt: 1 });
reminderSchema.index({ done: 1, notifiedAt: 1, dueAt: 1 });

export default mongoose.model('Reminder', reminderSchema);
