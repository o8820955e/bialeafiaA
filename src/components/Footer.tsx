import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-background border-t p-4 text-center text-sm text-muted-foreground">
      <div className="flex items-center justify-center gap-1">
        <span>تطوير: عمر شديقات</span>
        <Heart className="w-4 h-4 text-red-500 fill-current" />
        <span>لطلاب جامعة الطفيلة التقنية</span>
      </div>
      <div className="mt-2">
        <span>© 2024 بالعافية - جميع الحقوق محفوظة</span>
      </div>
    </footer>
  );
};