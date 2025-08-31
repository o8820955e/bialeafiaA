import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Search, ShoppingCart, MapPin } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const slides = [
  {
    id: 1,
    icon: Search,
    title: 'اكتشف مطاعم الطفيلة',
    description: 'قوائم وأسعار محدثة أولاً بأول.',
    gradient: 'from-blue-500 to-purple-600',
    illustration: (
      <div className="relative w-64 h-64 mx-auto">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-4 border-dashed border-blue-300/50"
        />
        <div className="absolute inset-8 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
          <Search className="w-16 h-16 text-white" />
        </div>
      </div>
    ),
  },
  {
    id: 2,
    icon: ShoppingCart,
    title: 'اطلب بسهولة وخيارات متعددة',
    description: 'أضف للسلة بسرعة وحدد خياراتك المفضلة بكل بساطة.',
    gradient: 'from-orange-500 to-red-600',
    illustration: (
      <div className="relative w-64 h-64 mx-auto">
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
        >
          <ShoppingCart className="w-16 h-16 text-white" />
        </motion.div>
      </div>
    ),
  },
  {
    id: 3,
    icon: MapPin,
    title: 'استلام من نقاط قريبة',
    description: 'اختر أقرب نقطة استلام وتابع حالة طلبك لحظة بلحظة.',
    gradient: 'from-green-500 to-teal-600',
    illustration: (
      <div className="relative w-64 h-64 mx-auto">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <MapPin className="w-16 h-16 text-white" />
        </motion.div>
      </div>
    ),
  },
];

export const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const markSeen = () => {
    try {
      localStorage.setItem('hasSeenOnboarding', 'true');
      localStorage.setItem('hasSeenOnboarding_v1', 'true');
    } catch {}
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((s) => s + 1);
    } else {
      markSeen();
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide((s) => s - 1);
  };

  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <div className="fixed inset-0 z-50 bg-background-solid">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className={`h-full bg-gradient-to-br ${slides[currentSlide].gradient} text-white relative overflow-hidden`}
        >
          {/* Decorative overlay should not block clicks */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
          </div>

          <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 py-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8"
            >
              {slides[currentSlide].illustration}
            </motion.div>

            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-3xl font-bold text-center mb-4"
            >
              {slides[currentSlide].title}
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg text-center text-white/90 max-w-sm leading-relaxed"
            >
              {slides[currentSlide].description}
            </motion.p>
          </div>

          <div className="fixed bottom-0 left-0 right-0 z-50 p-6 pb-[max(env(safe-area-inset-bottom),1rem)] bg-gradient-to-t from-black/20 to-transparent">
            <div className="flex justify-center space-x-2 space-x-reverse mb-6">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}
                  aria-label={`الانتقال إلى الشريحة ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4 mr-2" />
                السابق
              </Button>

              <Button
                onClick={() => { markSeen(); onComplete(); }}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                تخطي
              </Button>

              <Button onClick={nextSlide} className="bg-white text-gray-900 hover:bg-white/90" size="sm">
                {currentSlide === slides.length - 1 ? 'ابدأ الآن' : 'التالي'}
                <ChevronLeft className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
