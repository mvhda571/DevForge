import mongoose from 'mongoose';

export const ROLES = ['student', 'teacher', 'parent', 'admin'];
export const SELF_ASSIGNABLE_ROLES = ['student', 'teacher', 'parent'];

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 160 },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ROLES, default: 'student', index: true },
    status: { type: String, enum: ['active', 'disabled'], default: 'active' },
    birthYear: { type: Number, min: 1920, max: 2100 },
    locale: { type: String, enum: ['uz', 'en', 'ru'], default: 'uz' },
    onboardingCompleted: { type: Boolean, default: false },
    xp: { type: Number, default: 0, min: 0 },
    streak: {
      current: { type: Number, default: 0 },
      best: { type: Number, default: 0 },
      lastActiveDay: { type: String, default: null }
    },
    notificationPrefs: {
      reminders: { type: Boolean, default: true },
      deadlines: { type: Boolean, default: true },
      achievements: { type: Boolean, default: true },
      groupUpdates: { type: Boolean, default: true },
      email: { type: Boolean, default: false }
    },
    tokenVersion: { type: Number, default: 0 },
    lastLoginAt: Date
  },
  { timestamps: true }
);

userSchema.methods.toSafeJSON = function toSafeJSON() {
  const { _id, name, email, role, status, birthYear, locale, onboardingCompleted, xp, streak, notificationPrefs, createdAt } = this;
  return { id: _id, name, email, role, status, birthYear, locale, onboardingCompleted, xp, streak, notificationPrefs, createdAt };
};

userSchema.virtual('isMinor').get(function isMinor() {
  if (!this.birthYear) return null;
  return new Date().getFullYear() - this.birthYear < 18;
});

export default mongoose.model('User', userSchema);
