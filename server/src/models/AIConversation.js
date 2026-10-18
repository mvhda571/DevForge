import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true, maxlength: 20000 },
    action: { type: String, default: '' },
    demo: { type: Boolean, default: false }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const aiConversationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    kind: { type: String, enum: ['advisor', 'tutor'], required: true },
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', default: null },
    title: { type: String, default: 'Yangi suhbat', maxlength: 120 },
    messages: { type: [messageSchema], default: [] },
    actionCounts: { type: Map, of: Number, default: {} }
  },
  { timestamps: true }
);

aiConversationSchema.index({ user: 1, kind: 1, updatedAt: -1 });
aiConversationSchema.index({ user: 1, lesson: 1 });

export default mongoose.model('AIConversation', aiConversationSchema);
