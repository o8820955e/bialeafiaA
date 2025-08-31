import { ShoppingCart, MapPin, Bell } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { pickupPoints } from '../data/mockData';
import { motion } from 'motion/react';

interface HeaderProps {
  selectedPickupPoint: string;
  cartItemsCount: number;
  onCartClick: () => void;
  onPickupPointClick: () => void;
}

export const Header = ({ 
  selectedPickupPoint, 
  cartItemsCount, 
  onCartClick, 
  onPickupPointClick 
}: HeaderProps) => {
  const currentPickupPoint = pickupPoints.find(p => p.id === selectedPickupPoint);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-40 backdrop-blur-xl bg-white/95 border-b border-orange-100 shadow-lg"
    >
      <div className="flex items-center justify-between p-4">
        {/* Logo Section */}
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg"
              animate={{ 
                boxShadow: [
                  "0 4px 6px -1px rgba(234, 88, 12, 0.1)",
                  "0 10px 15px -3px rgba(234, 88, 12, 0.3)",
                  "0 4px 6px -1px rgba(234, 88, 12, 0.1)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-white font-bold text-lg">ب</span>
            </motion.div>
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
          <div>
            <motion.span 
              className="font-bold text-xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              بالعافية
            </motion.span>
          </div>
        </motion.div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Pickup Point */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={onPickupPointClick}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50/80 hover:bg-gray-100/80 transition-all duration-300 max-w-36"
            >
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MapPin className="w-4 h-4 text-orange-600" />
              </motion.div>
              <span className="text-xs font-medium truncate text-gray-700">
                {currentPickupPoint?.name || 'اختر النقطة'}
              </span>
            </Button>
          </motion.div>

          {/* Notifications */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="relative p-2 rounded-xl bg-gray-50/80 hover:bg-gray-100/80 transition-all duration-300"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <motion.div
                className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </Button>
          </motion.div>

          {/* Cart */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={onCartClick}
              className="relative p-2 rounded-xl bg-orange-50/80 hover:bg-orange-100/80 transition-all duration-300"
            >
              <motion.div
                animate={cartItemsCount > 0 ? { 
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.1, 1]
                } : {}}
                transition={{ duration: 0.5 }}
              >
                <ShoppingCart className="w-5 h-5 text-orange-600" />
              </motion.div>
              {cartItemsCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2"
                >
                  <Badge 
                    className="h-6 w-6 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg animate-pulse"
                  >
                    {cartItemsCount}
                  </Badge>
                </motion.div>
              )}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Gradient Border */}
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </motion.header>
  );
};