// الملف: TechIcon.tsx
// الوظيفة: عرض أيقونة تقنية من مجلد public/assets/MySkills مع تكييف اللون حسب السمة الفاتحة والداكنة.
// المحتوى: مكوّن TechIcon يستقبل اسم ملف الأيقونة والاسم المعروض وحجم الأيقونة.
// الاعتماديات: بدون استيرادات خارجية؛ يقرأ ملفات SVG الثابتة من public/assets/MySkills.
import React from 'react';

interface TechIconProps {
  /** اسم ملف SVG داخل public/assets/MySkills بدون الامتداد */
  name: string;
  /** الاسم المعروض في alt وtitle */
  label: string;
  /** حجم الأيقونة عبر أصناف Tailwind */
  className?: string;
}

// أيقونات MySkills أحادية اللون (سوداء)، لذا تُعكس في السمة الداكنة لتبقى واضحة.
export const TechIcon: React.FC<TechIconProps> = ({
  name,
  label,
  className = 'w-5 h-5',
}) => (
  <img
    src={`/assets/MySkills/${name}.svg`}
    alt={label}
    title={label}
    loading="lazy"
    draggable={false}
    className={`${className} shrink-0 select-none dark:invert`}
  />
);
