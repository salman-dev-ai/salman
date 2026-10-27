// الملف: CoursesPage.tsx
// الوظيفة: صفحة الدورات التدريبية بعرض البانر والإحصائيات وبطاقات الدورات بنفس نمط بطاقات المشاريع، مع نافذة تفاصيل عند الضغط.
// المحتوى: مكوّن CoursesPage مع حالة الدورة المختارة، شبكة بطاقات coursesData، قسم الدورات القادمة upcomingCourses، والنافذة CourseModal.
// الاعتماديات: مكوّن عميل يعتمد useLanguage ويستورد coursesData/upcomingCourses وCourseModal وSpotlightCard وReveal/AnimatedNumber وlucide-react.
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { coursesData, upcomingCourses } from '../../data/courses.ts';
import { Course } from '../../types/portfolio.ts';
import { CourseModal } from './CourseModal';
import { SpotlightCard } from '../projects/ProjectCardFx';
import { AnimatedNumber, Reveal } from './LearningPathMap';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bot,
  Clock,
  Github,
  GraduationCap,
  Layers,
  Sparkles,
  Workflow,
} from 'lucide-react';

interface CoursesPageProps {
  onBackToHome: () => void;
}

// أيقونات الدورات القادمة (دورات لم تُنشر بعد)
const iconMap = {
  python: Sparkles,
  ai: Bot,
  automation: Workflow,
};

// تسميات وألوان مستوى الدورة
const DIFFICULTY_LABEL: Record<string, { en: string; ar: string }> = {
  Beginner: { en: 'Beginner', ar: 'مبتدئ' },
  Intermediate: { en: 'Intermediate', ar: 'متوسط' },
  Advanced: { en: 'Advanced', ar: 'متقدم' },
};

const getDifficultyBadge = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30';
    case 'Intermediate':
      return 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30';
    case 'Advanced':
      return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
    default:
      return 'bg-gray-500/15 text-gray-600 dark:text-gray-400 border-gray-500/30';
  }
};

export const CoursesPage: React.FC<CoursesPageProps> = ({ onBackToHome }) => {
  const { t, locale, dir } = useLanguage();
  const isRtl = dir === 'rtl';
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const totalLessons = coursesData.reduce((sum, course) => sum + (Number(course.lessonsCount) || 0), 0);
  const totalHours = Math.round(coursesData.reduce((sum, course) => sum + (Number(course.durationHours) || 0), 0) * 10) / 10;

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] dark:bg-[#03070B] text-[#080D12] dark:text-[#F3F4F6] transition-colors pb-24">
      {/* Top Breadcrumb & Return Bar */}
      <div className="w-full border-b border-[#E8E0D5]/80 dark:border-[#1E2630] bg-[#FAF7F0]/60 dark:bg-[#060B10]/60 backdrop-blur-sm sticky top-18 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#FF641C] hover:text-[#E05312] transition-colors cursor-pointer group"
          >
            {isRtl ? (
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            ) : (
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            )}
            <span>{isRtl ? 'العودة إلى الصفحة الرئيسية' : 'Back to Home'}</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-[#6B7280] dark:text-[#9CA3AF]">
            <span>{isRtl ? 'الرئيسية' : 'Home'}</span>
            <span>/</span>
            <span className="font-semibold text-[#080D12] dark:text-white">
              {isRtl ? 'الدورات' : 'Courses'}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Banner for Courses */}
      <div className="relative overflow-hidden pt-10 pb-12 sm:pb-16 border-b border-[#E8E0D5]/70 dark:border-[#1E2630]/70">
        <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 bg-[radial-gradient(#FF641C_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#FF641C]/10 text-[#FF641C] border border-[#FF641C]/20 mb-4">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{isRtl ? 'دورات تطبيقية ومهارات عملية' : 'Hands-on Courses & Practical Skills'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#080D12] dark:text-white mb-4">
              {isRtl ? 'الدورات التدريبية' : 'Training Courses'}
            </h1>

            <p className="text-base sm:text-lg text-[#4B5563] dark:text-[#9CA3AF] leading-relaxed">
              {isRtl
                ? 'دورات عملية تركّز على التطبيق المباشر، تساعدك على تعلّم مهارات حقيقية تخدم دراستك ومشاريعك واهتماماتك — اضغط على أي بطاقة لعرض تفاصيل الدورة كاملة.'
                : 'Practical, project-based courses that help you build real skills for your studies, projects, and interests — click any card to view the full course details.'}
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#E8E0D5]/60 dark:border-[#1E2630]/60">
            <div className="p-4 rounded-xl bg-white/70 dark:bg-[#080D12] border border-[#E8E0D5] dark:border-[#1E2630]">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#FF641C]"><AnimatedNumber value={coursesData.length} /></p>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
                {isRtl ? 'دورات متاحة' : 'Available Courses'}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/70 dark:bg-[#080D12] border border-[#E8E0D5] dark:border-[#1E2630]">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#080D12] dark:text-white"><AnimatedNumber value={totalLessons} suffix="+" /></p>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
                {isRtl ? 'درساً تطبيقياً' : 'Practical Lessons'}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/70 dark:bg-[#080D12] border border-[#E8E0D5] dark:border-[#1E2630]">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#080D12] dark:text-white"><AnimatedNumber value={totalHours} decimals={1} /></p>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
                {isRtl ? 'ساعة تدريب' : 'Training Hours'}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/70 dark:bg-[#080D12] border border-[#E8E0D5] dark:border-[#1E2630]">
              <p className="text-sm sm:text-base font-extrabold text-[#080D12] dark:text-white">
                {isRtl ? 'م. سلمان الأنسي' : 'Eng. Salman Al-Ansi'}
              </p>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
                {isRtl ? 'تقديم' : 'Instructor'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid (same card template as the projects showcase) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between gap-3 mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-[#080D12] dark:text-white">
            {isRtl ? 'دورات متاحة الآن' : 'Courses Available Now'}
          </h2>
          <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
            {isRtl ? 'اضغط على البطاقة لعرض التفاصيل' : 'Click a card to view details'}
          </span>
        </div>

        {coursesData.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-[#080D12] rounded-2xl border border-[#E8E0D5] dark:border-[#1E2630] p-8">
            <Layers className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#080D12] dark:text-white mb-1">
              {isRtl ? 'لا توجد دورات متاحة حالياً' : 'No courses available yet'}
            </h3>
            <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              {isRtl ? 'ترقّب الدورات القادمة في الأسفل' : 'Stay tuned for the upcoming courses below'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursesData.map((course, idx) => {
              const courseTitle = course.title[locale];
              const courseDesc = course.shortDescription[locale];
              const difficulty = DIFFICULTY_LABEL[course.difficulty]?.[locale] ?? course.difficulty;

              return (
                <Reveal key={course.id} delay={Math.min(idx, 5) * 80} className="h-full">
                  <SpotlightCard className="h-full bg-white dark:bg-[#080D12] border border-[#E8E0D5] dark:border-[#1E2630] rounded-2xl overflow-hidden hover:border-[#FF641C]/60 dark:hover:border-[#FF641C]/60 hover:shadow-xl transition-all duration-300">
                    {/* الضغط على أي مكان في البطاقة يفتح تفاصيل الدورة */}
                    <div
                      onClick={() => setSelectedCourse(course)}
                      className="flex h-full cursor-pointer flex-col"
                    >
                      {/* Thumbnail Banner — الصورة كاملة فوق خلفية مموّهة من الصورة نفسها */}
                      <div className="relative h-full  w-full overflow-hidden bg-[#0B1118]">
                        <img
                          src={course.thumbnail}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 h-full w-full scale-125 object-cover blur-xl saturate-150 opacity-100"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-[#03070B]/25" aria-hidden="true"></div>
                        <img
                          src={course.thumbnail}
                          alt={courseTitle}
                          className="relative mx-auto h-full w-auto max-w-full object-contain p-0 drop-shadow-[0_8px_22px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105 " 
                          loading="lazy"
                        />

                        {/* Difficulty pill */}
                        <span className={`absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md ${getDifficultyBadge(course.difficulty)}`}>
                          {difficulty}
                        </span>

                        {course.featured && (
                          <span className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#FF641C] text-white shadow-sm">
                            <Sparkles className="w-3 h-3" />
                            <span>{isRtl ? 'مميزة' : 'Featured'}</span>
                          </span>
                        )}
                      </div>

                      {/* Card Content */}
                      <div className="flex-1 p-5 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-[#080D12] dark:text-white mb-2 group-hover:text-[#FF641C] transition-colors">
                            {courseTitle}
                          </h3>
                          <p className="text-xs text-[#4B5563] dark:text-[#9CA3AF] leading-relaxed mb-4 line-clamp-3">
                            {courseDesc}
                          </p>

                          {/* Course meta pills */}
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-md border border-[#E5E7EB] dark:border-[#1E2630] bg-[#F3F4F6] dark:bg-[#131D2A] text-[#4B5563] dark:text-gray-300">
                              <BookOpen className="w-3 h-3" />
                              <span>{course.lessonsCount} {t('courses.lessons')}</span>
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-md border border-[#E5E7EB] dark:border-[#1E2630] bg-[#F3F4F6] dark:bg-[#131D2A] text-[#4B5563] dark:text-gray-300">
                              <Clock className="w-3 h-3" />
                              <span>{course.durationHours} {t('courses.hours')}</span>
                            </span>
                          </div>
                        </div>

                        {/* Card Actions */}
                        <div className="pt-4 border-t border-[#E8E0D5]/70 dark:border-[#1E2630] flex items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => setSelectedCourse(course)}
                            className="text-xs font-semibold text-[#FF641C] hover:text-[#E05312] transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <span>{isRtl ? 'تفاصيل الدورة' : 'View Details'}</span>
                            {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                          </button>

                          {course.githubUrl && (
                            <a
                              href={course.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:text-[#080D12] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                              title={isRtl ? 'مستودع المشروع على GitHub' : 'GitHub Repository'}
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>

      {/* Upcoming Courses */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF641C]">
            {isRtl ? 'قريباً' : 'Coming Soon'}
          </p>
          <h2 className="mt-2 text-xl sm:text-2xl font-extrabold text-[#080D12] dark:text-white">
            {isRtl ? 'نحن نعمل على محتوى جديد' : 'We are building new learning content'}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {upcomingCourses.map((course) => {
            const Icon = iconMap[course.id as keyof typeof iconMap] ?? Sparkles;
            const title = course.title[locale];
            const badge = course.badge[locale];
            const description = course.description[locale];

            return (
              <article
                key={course.id}
                className="group rounded-3xl border border-[#E8E0D5] dark:border-[#1E2630] bg-white dark:bg-[#0E151E] p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className={`mb-5 inline-flex rounded-2xl bg-gradient-to-r ${course.accent} p-[1px]`}>
                  <div className="rounded-2xl bg-[#FDFBF7] px-3 py-2 dark:bg-[#0E151E]">
                    <Icon className="h-5 w-5 text-[#FF641C]" />
                  </div>
                </div>

                <div className="mb-4 inline-flex rounded-full border border-[#FF641C]/20 bg-[#FF641C]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#FF641C]">
                  {badge}
                </div>

                <h3 className="text-2xl font-extrabold text-[#080D12] dark:text-white">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#4B5563] dark:text-[#9CA3AF]">{description}</p>
              </article>
            );
          })}
        </div>
      </div>

      {/* Bottom Callout Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-[#080D12] to-[#131D2A] text-white border border-[#1E2630] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-start">
            <h3 className="text-xl font-extrabold text-white">
              {isRtl ? 'هل تريد دورة مخصّصة لتخصصك أو لفريقك؟' : 'Want a course tailored to your field or team?'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
              {isRtl
                ? 'الدورات قابلة للتخصيص بالكامل حسب التخصص والاحتياجات. تواصل مع المهندس سلمان لتحديد المحتوى المناسب.'
                : 'All courses can be fully customized to your field and needs. Connect with Salman Al-Ansi to plan the right content.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onBackToHome}
              className="px-5 py-2.5 text-xs font-bold text-white/90 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-full transition-all cursor-pointer"
            >
              {isRtl ? 'العودة للصفحة الرئيسية' : 'Return to Home'}
            </button>
          </div>
        </div>
      </div>

      {/* Course Detail Modal */}
      <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
    </div>
  );
};
