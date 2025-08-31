import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, MessageCircle, Phone, Search, Heart, X } from 'lucide-react';
import { Button } from './ui/button';

interface FloatingActionButtonProps {
  onSearch?: () => void;
  onSupport?: () => void;
  onCall?: () => void;
  onFavorites?: () => void;
}

export const FloatingActionButton = ({
  onSearch,
  onSupport,
  onCall,
  onFavorites
}: FloatingActionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: Search,
      label: 'بحث',
      onClick: onSearch,
      color: 'from-blue-500 to-blue-600',
      delay: 0.1
    },
    {
      icon: Heart,
      label: 'المفضلة',
      onClick: onFavorites,
      color: 'from-pink-500 to-red-500',
      delay: 0.2
    },
    {
      icon: MessageCircle,
      label: 'دعم',
      onClick: onSupport,
      color: 'from-green-500 to-green-600',
      delay: 0.3
    },
    {
      icon: Phone,
      label: 'اتصال',
      onClick: onCall,
      color: 'from-purple-500 to-purple-600',
      delay: 0.4
    }
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col space-y-3 mb-4"
          >
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0, x: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  x: 0,
                  transition: { delay: action.delay }
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0, 
                  x: 20,
                  transition: { delay: (actions.length - index) * 0.1 }
                }}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3 space-x-reverse"
              >
                <motion.div
                  className="bg-black/80 text-white px-3 py-2 rounded-lg text-sm font-medium backdrop-blur-sm"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: action.delay + 0.1 }
                  }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  {action.label}
                </motion.div>
                
                <Button
                  size="sm"
                  onClick={() => {
                    action.onClick?.();
                    setIsOpen(false);
                  }}
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${action.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0`}
                >
                  <action.icon className="w-5 h-5" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          rotate: isOpen ? 45 : 0,
          scale: isOpen ? 1.1 : 1
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl hover:shadow-2xl transition-all duration-500 border-0 ${
            isOpen ? 'rotate-45' : ''
          }`}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
          </motion.div>
        </Button>
      </motion.div>

      {/* Ripple Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full -z-10"
        animate={{
          scale: isOpen ? [1, 1.5, 1] : 1,
          opacity: isOpen ? [0.5, 0, 0.5] : 0
        }}
        transition={{ duration: 1, repeat: isOpen ? Infinity : 0 }}
      />
    </div>
  );
};