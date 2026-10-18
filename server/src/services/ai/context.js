import {
  AssessmentResult,
  LearningProgress,
  LearningRoadmap,
  QuizAttempt,
  StudentProfile
} from '../../models/index.js';

const LEVELS = { beginner: 'boshlang‘ich', intermediate: 'o‘rta', advanced: 'yuqori' };

export async function loadLearnerContext(user) {
  const [profile, result, roadmap, completed, attempts] = await Promise.all([
    StudentProfile.findOne({ user: user._id }),
    AssessmentResult.findOne({ user: user._id }).sort({ createdAt: -1 }),
    LearningRoadmap.findOne({ user: user._id, status: 'active' }).sort({ updatedAt: -1 }).populate('career', 'name slug'),
    LearningProgress.find({ user: user._id, status: 'completed' }).sort({ completedAt: -1 }).limit(10).populate('lesson', 'title'),
    QuizAttempt.find({ user: user._id }).sort({ createdAt: -1 }).limit(10)
  ]);
  const weak = [...new Set(attempts.flatMap((a) => a.weakConcepts))].slice(0, 8);
  return { user, profile, result, roadmap, completed, weak };
}

export function contextToText(ctx) {
  const { user, profile, result, roadmap, completed, weak } = ctx;
  const lines = [`Ism: ${user.name}`];
  if (profile) {
    lines.push(`Daraja: ${LEVELS[profile.level] || profile.level}`);
    if (profile.interests?.length) lines.push(`Qiziqishlari: ${profile.interests.join(', ')}`);
    if (profile.favoriteSubjects?.length) lines.push(`Sevimli fanlari: ${profile.favoriteSubjects.join(', ')}`);
    if (profile.careerInterests?.length) lines.push(`Qiziqtirgan kasblar: ${profile.careerInterests.join(', ')}`);
    lines.push(`Kunlik o‘qish vaqti: ${profile.dailyMinutes} daqiqa, haftasiga ${profile.studyDaysPerWeek} kun`);
    if (profile.goal) lines.push(`Asosiy maqsadi: ${profile.goal}`);
  }
  if (result?.top?.length) {
    lines.push(`Kasb testi natijasi (taxminiy moslik): ${result.top.map((r) => `${r.name} ${r.score}%`).join('; ')}`);
  }
  if (roadmap) lines.push(`Faol yo‘l xaritasi: ${roadmap.title}`);
  if (completed?.length) lines.push(`Yaqinda tugatgan darslari: ${completed.map((p) => p.lesson?.title).filter(Boolean).join(', ')}`);
  if (weak?.length) lines.push(`Testlarda qiynalgan tushunchalari: ${weak.join(', ')}`);
  return lines.join('\n');
}
