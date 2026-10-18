import {
  AIConversation,
  Achievement,
  ActivityLog,
  Assignment,
  AssessmentResult,
  CareerAssessment,
  Favorite,
  LearningProgress,
  LearningRoadmap,
  Notification,
  ParentStudentLink,
  QuizAttempt,
  Reminder,
  StudentProfile,
  StudyGroup,
  Submission,
  User
} from '../models/index.js';

export async function deleteUserData(userId) {
  const groups = await StudyGroup.find({ teacher: userId }).select('_id');
  const groupIds = groups.map((g) => g._id);
  const assignments = await Assignment.find({ group: { $in: groupIds } }).select('_id');
  await Promise.all([
    StudentProfile.deleteMany({ user: userId }),
    CareerAssessment.deleteMany({ user: userId }),
    AssessmentResult.deleteMany({ user: userId }),
    LearningRoadmap.deleteMany({ user: userId }),
    LearningProgress.deleteMany({ user: userId }),
    QuizAttempt.deleteMany({ user: userId }),
    Favorite.deleteMany({ user: userId }),
    Reminder.deleteMany({ user: userId }),
    Notification.deleteMany({ user: userId }),
    Achievement.deleteMany({ user: userId }),
    AIConversation.deleteMany({ user: userId }),
    ActivityLog.deleteMany({ user: userId }),
    Submission.deleteMany({ $or: [{ student: userId }, { assignment: { $in: assignments.map((a) => a._id) } }] }),
    ParentStudentLink.deleteMany({ $or: [{ parent: userId }, { student: userId }] }),
    StudyGroup.updateMany({ members: userId }, { $pull: { members: userId } })
  ]);
  await Assignment.deleteMany({ group: { $in: groupIds } });
  await StudyGroup.deleteMany({ teacher: userId });
  await User.deleteOne({ _id: userId });
}

export async function exportUserData(userId) {
  const [user, profile, results, roadmaps, progress, attempts, favorites, reminders, achievements, conversations] = await Promise.all([
    User.findById(userId),
    StudentProfile.findOne({ user: userId }).lean(),
    AssessmentResult.find({ user: userId }).lean(),
    LearningRoadmap.find({ user: userId }).lean(),
    LearningProgress.find({ user: userId }).lean(),
    QuizAttempt.find({ user: userId }).lean(),
    Favorite.find({ user: userId }).lean(),
    Reminder.find({ user: userId }).lean(),
    Achievement.find({ user: userId }).lean(),
    AIConversation.find({ user: userId }).lean()
  ]);
  return {
    exportedAt: new Date().toISOString(),
    user: user?.toSafeJSON(),
    profile,
    assessmentResults: results,
    roadmaps,
    progress,
    quizAttempts: attempts,
    favorites,
    reminders,
    achievements,
    aiConversations: conversations
  };
}
