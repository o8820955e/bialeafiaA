import { motion } from 'motion/react';
import { UtensilsCrossed } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner = ({ 
  size = 'md', 
  text = 'جاري التحميل...', 
  fullScreen = false 
}: LoadingSpinnerProps) => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const containerClass = fullScreen 
    ? 'fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50'
    : 'flex flex-col items-center justify-center p-8';

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center space-y-4">
        {/* Animated Logo */}
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className={`${sizeMap[size]} bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center`}>
            <UtensilsCrossed className="w-1/2 h-1/2 text-white" />
          </div>
          
          {/* Orbit Dots */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-orange-400 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transformOrigin: `${size === 'lg' ? '24px' : size === 'md' ? '16px' : '12px'} 0`,
              }}
              animate={{ 
                rotate: 360,
                scale: [1, 1.5, 1]
              }}
              transition={{ 
                rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity, delay: i * 0.2 }
              }}
              initial={{ rotate: i * 120 }}
            />
          ))}
        </motion.div>

        {/* Loading Text */}
        <motion.p
          className="text-gray-600 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {text}
        </motion.p>

        {/* Loading Dots */}
        <div className="flex space-x-1 space-x-reverse">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-orange-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Skeleton Components for better UX
export const RestaurantCardSkeleton = () => (
  <div className="bg-white rounded-xl p-4 shadow-lg animate-pulse">
    <div className="w-full h-40 bg-gray-200 rounded-lg mb-4" />
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <div className="w-3/4 h-4 bg-gray-200 rounded" />
        <div className="w-12 h-4 bg-gray-200 rounded" />
      </div>
      <div className="w-full h-3 bg-gray-200 rounded" />
      <div className="w-2/3 h-3 bg-gray-200 rounded" />
      <div className="flex justify-between items-center">
        <div className="w-20 h-3 bg-gray-200 rounded" />
        <div className="w-16 h-6 bg-gray-200 rounded-full" />
      </div>
    </div>
  </div>
);

export const MenuItemSkeleton = () => (
  <div className="bg-white rounded-lg p-4 shadow-sm animate-pulse">
    <div className="flex gap-4">
      <div className="w-20 h-20 bg-gray-200 rounded-lg" />
      <div className="flex-1 space-y-2">
        <div className="w-3/4 h-4 bg-gray-200 rounded" />
        <div className="w-full h-3 bg-gray-200 rounded" />
        <div className="w-1/3 h-4 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);