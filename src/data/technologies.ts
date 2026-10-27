// الملف: technologies.ts
// الوظيفة: بيانات التقنيات التي يعمل بها المهندس لعرض المهارات.
// المحتوى: واجهة TechItem ومصفوفة techStackData مصنّفة إلى Web و AI و Mobile مع اسم ملف الأيقونة.
// الاعتماديات: بدون استيرادات؛ تعريف الواجهة محلي.
export type TechCategory = 'Web' | 'AI' | 'Mobile';

export interface TechItem {
  name: string;
  category: TechCategory;
  /** اسم ملف أيقونة SVG داخل public/assets/MySkills بدون الامتداد */
  icon: string;
  descriptionEn: string;
  descriptionAr: string;
}

export const techStackData: TechItem[] = [
  // Web Development
  {
    name: 'React',
    category: 'Web',
    icon: 'react',
    descriptionEn: 'Component-based library for dynamic client interfaces.',
    descriptionAr: 'مكتبة الواجهات البرمجية التفاعلية المعتمدة على المكونات.',
  },
  {
    name: 'Next.js',
    category: 'Web',
    icon: 'nextdotjs',
    descriptionEn: 'React framework for production SSR, SSG, and App Router.',
    descriptionAr: 'إطار عمل React المتقدم للعرض من الخادم والتوليد الثابت.',
  },
  {
    name: 'TypeScript',
    category: 'Web',
    icon: 'tsnode',
    descriptionEn: 'Strongly typed JavaScript providing enterprise safety.',
    descriptionAr: 'جافاسكريبت المكتوبة بالأنواع الصارمة لبرمجيات متينة.',
  },
  {
    name: 'Tailwind CSS',
    category: 'Web',
    icon: 'tailwindcss',
    descriptionEn: 'Utility-first modern styling system.',
    descriptionAr: 'نظام تنسيق مبني على الأدوات السريعة والمرنة.',
  },
  {
    name: 'HTML5',
    category: 'Web',
    icon: 'html5',
    descriptionEn: 'Semantic, accessible markup foundation for the web.',
    descriptionAr: 'البنية الأساسية الدلالية والمتوافقة لصفحات الويب.',
  },
  {
    name: 'CSS3',
    category: 'Web',
    icon: 'css',
    descriptionEn: 'Modern layouts, animations, and responsive design.',
    descriptionAr: 'التنسيقات الحديثة والحركات والتصميم المتجاوب.',
  },
  {
    name: 'JSS',
    category: 'Web',
    icon: 'jss',
    descriptionEn: 'CSS-in-JS authoring for component-scoped styles.',
    descriptionAr: 'كتابة الأنماط داخل جافاسكريبت لتغليف تنسيقات المكوّنات.',
  },
  {
    name: 'PHP',
    category: 'Web',
    icon: 'php',
    descriptionEn: 'Server-side scripting powering dynamic web applications.',
    descriptionAr: 'لغة البرمجة من جهة الخادم لبناء تطبيقات الويب الديناميكية.',
  },
  {
    name: 'Laravel',
    category: 'Web',
    icon: 'laravel',
    descriptionEn: 'Robust PHP web framework with elegant syntax.',
    descriptionAr: 'إطار عمل ويب قوي ومرن بلغة PHP.',
  },
  {
    name: 'Node.js',
    category: 'Web',
    icon: 'nodedotjs',
    descriptionEn: 'Asynchronous event-driven JavaScript runtime.',
    descriptionAr: 'بيئة تشغيل جافاسكريبت غير متزامنة وسريعة.',
  },
  {
    name: 'Express',
    category: 'Web',
    icon: 'express',
    descriptionEn: 'Minimalist and flexible web framework for Node.',
    descriptionAr: 'إطار عمل سريع ومرن لبناء الواجهات الخلفية والـ APIs.',
  },
  {
    name: 'MySQL',
    category: 'Web',
    icon: 'mysql',
    descriptionEn: 'Relational database management and query optimization.',
    descriptionAr: 'نظام إدارة قواعد البيانات العلائقية الموثوق.',
  },
  {
    name: 'Docker',
    category: 'Web',
    icon: 'docker',
    descriptionEn: 'Containerization for consistent environments.',
    descriptionAr: 'تقنية الحاويات لعزل البيئات وتوحيدها عبر مراحل النشر.',
  },
  {
    name: 'Git',
    category: 'Web',
    icon: 'git',
    descriptionEn: 'Distributed version control and branching workflows.',
    descriptionAr: 'نظام التحكم في الإصدارات وإدارة فروع العمل البرمجية.',
  },
  {
    name: 'GitHub',
    category: 'Web',
    icon: 'github',
    descriptionEn: 'Collaborative code review, Actions CI/CD pipelines.',
    descriptionAr: 'منصة التعاون البرمجي وأنابيب الأتمتة GitHub Actions.',
  },

  // Artificial Intelligence
  {
    name: 'Python',
    category: 'AI',
    icon: 'python',
    descriptionEn: 'Core language for automation, data, and machine learning.',
    descriptionAr: 'اللغة الأساسية للأتمتة وعلوم البيانات وتعلّم الآلة.',
  },
  {
    name: 'NumPy',
    category: 'AI',
    icon: 'numpy',
    descriptionEn: 'High-performance numerical computing with arrays.',
    descriptionAr: 'الحوسبة الرقمية عالية الأداء باستخدام المصفوفات.',
  },
  {
    name: 'Pandas',
    category: 'AI',
    icon: 'pandas',
    descriptionEn: 'Data analysis and manipulation with DataFrames.',
    descriptionAr: 'تحليل البيانات ومعالجتها باستخدام إطارات البيانات.',
  },
  {
    name: 'Scikit-learn',
    category: 'AI',
    icon: 'scikitlearn',
    descriptionEn: 'Classical machine learning models and pipelines.',
    descriptionAr: 'نماذج تعلّم الآلة الكلاسيكية وبناء خطوط المعالجة.',
  },
  {
    name: 'OpenCV',
    category: 'AI',
    icon: 'opencv',
    descriptionEn: 'Computer vision and real-time image processing.',
    descriptionAr: 'الرؤية الحاسوبية ومعالجة الصور في الزمن الحقيقي.',
  },
  {
    name: 'YOLO',
    category: 'AI',
    icon: 'yolo',
    descriptionEn: 'Real-time object detection and recognition.',
    descriptionAr: 'كشف الأجسام والتعرّف عليها في الزمن الحقيقي.',
  },
  {
    name: 'n8n',
    category: 'AI',
    icon: 'n8n',
    descriptionEn: 'Workflow automation wiring APIs, LLMs, and bots.',
    descriptionAr: 'أتمتة سير العمل وربط الـ APIs والـ LLMs والبوتات.',
  },

  // Mobile Development
  {
    name: 'Flutter',
    category: 'Mobile',
    icon: 'flutter',
    descriptionEn: 'Cross-platform mobile apps from a single codebase.',
    descriptionAr: 'تطبيقات جوال متعددة المنصات من كود واحد.',
  },
];
