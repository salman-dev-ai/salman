import { Course } from '../types/portfolio.ts';

export type UpcomingCourse = {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  badge: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  accent: string;
};

export const upcomingCourses: UpcomingCourse[] = [
  {
    id: 'python',
    title: {
      en: 'Python Course',
      ar: 'دورة بايثون',
    },
    badge: {
      en: 'In Progress',
      ar: 'قيد العمل',
    },
    description: {
      en: 'We are currently preparing a practical Python course for beginners and intermediate developers.',
      ar: 'نحن الآن نعمل على دورة عملية في بايثون للمبتدئين والمطورين المتوسطين.',
    },
    accent: 'from-[#FF641C] to-[#F59E0B]',
  },
  {
    id: 'ai',
    title: {
      en: 'AI Course',
      ar: 'دورة الذكاء الاصطناعي',
    },
    badge: {
      en: 'Coming Soon',
      ar: 'قريباً',
    },
    description: {
      en: 'A future course focused on AI foundations, practical tools, and real-world applications.',
      ar: 'دورة مستقبلية تركز على أساسيات الذكاء الاصطناعي والأدوات العملية وتطبيقاتها الواقعية.',
    },
    accent: 'from-[#3B82F6] to-[#8B5CF6]',
  },
  
];

export const coursesData: Course[] = [
  
 
  {
    id: 'n8n-crash-course',
    title: {
      en: 'n8n Crash Course',
      ar: 'n8n Crash Course - دورة أتمتة المهام',
    },
    thumbnail: '/assets/courses/crash_course.webP',
    difficulty: 'Beginner',
    lessonsCount: 3,
    durationHours: 2,
    featured: true,
    githubUrl: 'https://github.com/salman-dev-ai/Crash_courase_n8n',
    shortDescription: {
      en: 'From repetitive tasks to smart automation... start with n8n! Learn how to connect apps and automate your workflow.',
      ar: 'من المهام المتكررة إلى أتمتة ذكية… ابدأ مع n8n! تعلّم كيف تستخدم n8n لربط التطبيقات وأتمتة المهام وتوظيف الذكاء الاصطناعي.',
    },
    fullDescription: {
      en: 'Learn how to use n8n to connect applications and automate tasks, and learn how to use artificial intelligence to build practical and customizable solutions. This course is suitable for all majors and levels, from beginners to experienced users. You do not have to be a programmer; you will start by learning n8n and learning through practical application.',
      ar: 'تعلّم كيف تستخدم n8n لربط التطبيقات وأتمتة المهام، وتعرّف على طرق توظيف الذكاء الاصطناعي في بناء حلول عملية قابلة للتخصيص. الكورس مناسب لجميع التخصصات والمستويات، من المبتدئين إلى أصحاب الخبرة. ولا يشترط أن تكون مبرمجًا؛ ستبدأ بالتعرّف على n8n وتتعلم من خلال التطبيق العملي.',
    },
    syllabus: {
      en: [
        'Introduction to n8n and Automation',
        'Summarizing Emails and sending to Telegram',
        'Content aggregation and summarization (Text/Voice)',
        'Building Customer Support AI Bots',
        'Customizing Workflows for your needs',
      ],
      ar: [
        'مقدمة في n8n والأتمتة',
        'تلخيص رسائل البريد الإلكتروني المهمة وإرسالها إلى Telegram',
        'جمع محتوى من مصادر تختارها، ثم تلخيصه وإرساله كنص أو صوت',
        'بناء بوت يرد على استفسارات العملاء، ويحوّل الأسئلة التي تحتاج إلى متابعة',
        'تعديل المشاريع والـWorkflows لتناسب تخصصك واحتياجاتك',
      ],
    },
  },
];
