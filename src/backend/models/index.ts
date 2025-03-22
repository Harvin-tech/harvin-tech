import { model, models } from 'mongoose';
import { userSchema } from './user.model';
import { chapterSchema } from './chapter.model';
import { lessonSchema } from './lesson.model';
import { enrollmentSchema } from './enrollment.model';
import { mediaSchema } from './media.model';
import { courseSchema } from './course.model';
import { quizSurveySchema } from './quiz-survey.model';

export const User = models?.users || model('users', userSchema);
export const Course = models?.courses || model('courses', courseSchema);
export const Chapter = models?.chapters || model('chapters', chapterSchema);
export const Lesson = models?.lessons || model('lessons', lessonSchema);
export const Enrollment =
  models?.enrollments || model('enrollments', enrollmentSchema);
export const Media = models?.medias || model('medias', mediaSchema);
export const QuizSurvey =
  models?.['quiz-surveys'] || model('quiz-surveys', quizSurveySchema);
