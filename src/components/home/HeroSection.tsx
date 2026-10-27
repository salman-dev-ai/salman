// الملف: HeroSection.tsx
// الوظيفة: القسم الافتتاحي الرئيسي الذي يعرض الاسم والعنوان والإحصائيات وشريط التقنيات
// المحتوى: مكوّن HeroSection مع أزرار CTA وشبكة الإحصائيات وبطاقة مساحة العمل وشريط أيقونات من assets/MySkills
// الاعتماديات: useLanguage وsiteConfig ومكوّن TechIcon وأيقونات lucide-react مع props للتنقل وفتح السيرة
import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { siteConfig } from '../../config/site.ts';
import { ArrowRight, Mail, Briefcase, BookOpen, Clock, Sparkles } from 'lucide-react';
import { StrandsBackground } from './StrandsBackground.tsx';
import { TechIcon } from './TechIcon.tsx';

interface HeroSectionProps {
  onExploreWork: () => void;
  onContactMe: () => void;
  onOpenCvModal: () => void;
}

/** شريط التقنيات في الهيرو: الاسم المعروض + اسم ملف الأيقونة في assets/MySkills */
const HERO_TECH = [
  { label: 'Next.js', icon: 'nextdotjs' },
  { label: 'React', icon: 'react' },
  { label: 'TypeScript', icon: 'tsnode' },
  { label: 'Tailwind CSS', icon: 'tailwindcss' },
  { label: 'Laravel', icon: 'laravel' },
  { label: 'PHP', icon: 'php' },
  { label: 'Node.js', icon: 'nodedotjs' },
  { label: 'Python', icon: 'python' },
  { label: 'Docker', icon: 'docker' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreWork,
  onContactMe,
  onOpenCvModal,
}) => {
  const { t, locale, dir } = useLanguage();

  const isRtl = dir === 'rtl';

  return (
    <section id="home" className="relative isolate w-full pt-6 pb-12 overflow-hidden">
      {/* Animated background: Interactive Interwoven Strands (non-interactive layer, sits behind content) */}
      <StrandsBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Bio & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Greeting */}
            <p className="text-sm font-semibold tracking-wide text-[#6B7280] dark:text-[#9CA3AF] mb-1.5">
              {t('hero.hello')}
            </p>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#080D12] dark:text-white leading-[1.1] mb-2.5">
              <span>{t('hero.nameFirst')} </span>
              <span className="text-[#FF641C]">{t('hero.nameLast')}</span>
            </h1>

            {/* Subtitle */}
            <h2 className="text-lg sm:text-xl font-bold text-[#1F2937] dark:text-[#E5E7EB] mb-4">
              {locale === 'ar' ? siteConfig.titleAr : siteConfig.titleEn}
            </h2>

            {/* Intro Lead */}
            <p className="text-base text-[#4B5563] dark:text-[#9CA3AF] max-w-xl leading-relaxed mb-6">
              {locale === 'ar' ? siteConfig.taglineAr : siteConfig.taglineEn}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <button
                type="button"
                onClick={onExploreWork}
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#FF641C] hover:bg-[#E05312] active:scale-98 rounded-full shadow-md shadow-[#FF641C]/30 transition-all cursor-pointer"
              >
                <span>{t('hero.exploreWork')}</span>
                <ArrowRight className={`w-4 h-4 transition-transform ${isRtl ? 'rotate-180' : ''}`} />
              </button>

              <button
                type="button"
                onClick={onContactMe}
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#080D12] dark:text-white bg-transparent border border-[#D1D5DB] dark:border-[#374151] hover:border-[#080D12] dark:hover:border-white rounded-full transition-all cursor-pointer"
              >
                <span>{t('hero.contactMe')}</span>
                <Mail className="w-4 h-4 text-[#4B5563] dark:text-[#9CA3AF]" />
              </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-[#E8E0D5] dark:border-[#1E2630] mb-8">
              <div>
                <div className="text-2xl font-extrabold text-[#080D12] dark:text-white tracking-tight tabular-nums">
                  {siteConfig.stats.projectsCount}
                </div>
                <div className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-medium">
                  {t('hero.statProjects')}
                </div>
              </div>

              <div>
                <div className="text-2xl font-extrabold text-[#080D12] dark:text-white tracking-tight tabular-nums">
                  {siteConfig.stats.coursesCount}
                </div>
                <div className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-medium">
                  {t('hero.statCourses')}
                </div>
              </div>

              <div>
                <div className="text-2xl font-extrabold text-[#080D12] dark:text-white tracking-tight tabular-nums">
                  {siteConfig.stats.yearsExperience}
                </div>
                <div className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-medium">
                  {t('hero.statExperience')}
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FF641C] mb-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF641C]"></span>
                  <span>{t('hero.statOpen')}</span>
                </div>
                <div className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                  Full-time & Remote
                </div>
              </div>
            </div>

            {/* Tech Logo Strip — أيقونات من assets/MySkills مع كشف الاسم عند المرور */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
              {HERO_TECH.map((tech) => (
                <div
                  key={tech.label}
                  className="group flex items-center gap-2 text-xs font-semibold text-[#374151] dark:text-[#D1D5DB] cursor-pointer"
                >
                  <TechIcon name={tech.icon} label={tech.label} className="w-5 h-5" />
                  <span className="max-w-0 overflow-hidden opacity-0 transition-all duration-300 ease-in-out group-hover:max-w-[100px] group-hover:opacity-100 whitespace-nowrap">
                    {tech.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Cinematic Workspace & Floating Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#E8E0D5] dark:border-[#1E2630] bg-[#0E151E] group">
              {/* Cinematic Workspace Image — الصورة مربعة (1:1) فالإطار مربع لعرضها كاملة */}
              <img
                src="/assets/images/hero_workspace_sunset_1792383939734.png"
                alt="Developer workspace of Salman Al-Ansi overlooking a sunset landscape"
                className="relative w-full aspect-square object-cover object-center transition-transform duration-700 group-hover:scale-102"
              />

              {/* تدرّج خفيف أسفل الصورة لإبراز التوقيع والبطاقة العائمة */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent"
              ></div>

              {/* Top-Right Handwritten Annotation */}
              <div className="absolute top-4 right-4 pointer-events-none select-none">
                <span className="font-handwriting text-2xl sm:text-3xl text-amber-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] -rotate-6 block font-bold tracking-wide">
                  Better Code<br />Better Products
                </span>
              </div>

              {/* Floating Dark Card: Currently Learning */}
              <div className="absolute bottom-16 right-4 sm:right-6 bg-[#080D12]/92 backdrop-blur-md border border-white/10 rounded-xl p-3.5 shadow-xl max-w-[210px] text-white">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FF641C] mb-2.5 pb-1.5 border-b border-white/10">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t('hero.currentlyLearning')}</span>
                </div>
                <div className="space-y-1.5 text-xs text-gray-300">
                  {siteConfig.learningStack.map((tech) => (
                    <div key={tech} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF641C]/80"></span>
                      <span className="font-medium text-gray-200">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Signature Annotation */}
              <div className="absolute bottom-3 left-4 pointer-events-none select-none">
                <span className="font-handwriting text-3xl sm:text-4xl text-white/80 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] -rotate-3">
                  Salman
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
