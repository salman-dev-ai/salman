// الملف: CVModal.tsx
// الوظيفة: نافذة منبثقة لعرض معاينة السيرة الذاتية وتحميلها بالعربية والإنجليزية
// المحتوى: مكوّن CVModal مع handleDownload وhandlePrint ومعاينة ترويسة مختصرة للسيرة
// الاعتماديات: useLanguage وsiteConfig وأيقونات lucide-react (مكوّن عميل)
import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';
import { siteConfig } from '../../config/site.ts';
import { X, Download, FileText, Printer, Mail, Globe } from 'lucide-react';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const { t, locale, dir } = useLanguage();

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = (lang: 'en' | 'ar') => {
    // Generates a clean printable window or triggers download
    const cvPath = lang === 'ar' ? siteConfig.cvArabicPath : siteConfig.cvEnglishPath;
    const link = document.createElement('a');
    link.href = cvPath;
    link.download = cvPath.split('/').pop() ?? `Salman_CV_${lang.toUpperCase()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = (lang: 'en' | 'ar') => {
    // يطبع ملف السيرة الذاتية الفعلي للغة التي يختارها مسؤول التوظيف عبر إطار مخفي
    const cvPath = lang === 'ar' ? siteConfig.cvArabicPath : siteConfig.cvEnglishPath;
    let frame = document.getElementById('cv-print-frame') as HTMLIFrameElement | null;
    if (!frame) {
      frame = document.createElement('iframe');
      frame.id = 'cv-print-frame';
      frame.style.position = 'fixed';
      frame.style.width = '0';
      frame.style.height = '0';
      frame.style.border = '0';
      frame.style.visibility = 'hidden';
      document.body.appendChild(frame);
    }
    frame.onload = () => {
      frame?.contentWindow?.focus();
      frame?.contentWindow?.print();
    };
    frame.src = cvPath;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-[#0E151E] border border-[#1E2630] rounded-2xl p-6 sm:p-8 text-white shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#1E2630] mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FF641C]/15 border border-[#FF641C]/30 flex items-center justify-center text-[#FF641C]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 id="cv-modal-title" className="text-xl sm:text-2xl font-bold text-white">
                {t('cvModal.title')} - {siteConfig.name}
              </h2>
              <p className="text-xs text-gray-400">
                {t('cvModal.subtitle')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t('cvModal.close')}
            className="w-9 h-9 rounded-full bg-[#131D2A] border border-[#1E2630] hover:border-[#FF641C] text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CV Summary Document Preview */}
        <div className="bg-[#080D12] border border-[#1E2630] rounded-xl p-6 mb-6 space-y-6">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b border-[#1E2630] gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">
                {siteConfig.name}
              </h3>
              <p className="text-xs font-semibold text-[#FF641C]">
                {locale === 'ar' ? siteConfig.titleAr : siteConfig.titleEn}
              </p>
            </div>

            <div className="text-xs text-gray-400 space-y-1">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                <span>{siteConfig.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-gray-400" />
                <span>linkedin.com/in/salman-al-ansi-93ab92397</span>
              </div>
            </div>
          </div>

        </div>

        {/* Download Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => handleDownload('en')}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#FF641C] hover:bg-[#E05312] text-white text-xs font-bold rounded-full transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{t('cvModal.downloadEn')}</span>
          </button>

          <button
            type="button"
            onClick={() => handleDownload('ar')}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#131D2A] hover:bg-[#1A2636] border border-[#1E2630] text-gray-200 hover:text-white text-xs font-bold rounded-full transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{t('cvModal.downloadAr')}</span>
          </button>

          <button
            type="button"
            onClick={() => handlePrint('en')}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{t('cvModal.printEn')}</span>
          </button>

          <button
            type="button"
            onClick={() => handlePrint('ar')}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{t('cvModal.printAr')}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="ms-auto px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            {t('cvModal.close')}
          </button>
        </div>
      </div>
    </div>
  );
};
