import { Star, Clock, MapPin, Zap, Award } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Restaurant } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

export const RestaurantCard = ({ restaurant, onClick }: RestaurantCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 30 
      }}
      className="group"
    >
      <Card 
        className={`overflow-hidden cursor-pointer bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 ${
          !restaurant.isOpen ? 'opacity-70' : ''
        }`}
        onClick={onClick}
      >
        <div className="relative overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <ImageWithFallback
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-40 object-cover"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Status Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-3 right-3"
            >
              <Badge 
                className={`px-2 py-1 text-xs font-medium backdrop-blur-sm ${
                  restaurant.isOpen 
                    ? 'bg-green-500/90 text-white border-green-400/50' 
                    : 'bg-red-500/90 text-white border-red-400/50'
                }`}
              >
                {restaurant.isOpen ? 'مفتوح الآن' : 'مغلق'}
              </Badge>
            </motion.div>
            
            {/* Featured / Discount Badge */}
            {typeof restaurant.discountPercent === 'number' && (
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute top-3 left-3"
              >
                <Badge className="bg-red-500/90 text-white border-red-400/50 backdrop-blur-sm px-2 py-1">
                  خصم {restaurant.discountPercent}%
                </Badge>
              </motion.div>
            )}
            {/* Featured Badge */}
            {restaurant.rating >= 4.5 && (
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-3 left-3"
              >
                <Badge className="bg-yellow-500/90 text-yellow-900 border-yellow-400/50 backdrop-blur-sm px-2 py-1">
                  <Award className="w-3 h-3 mr-1" />
                  الأكثر تقييماً
                </Badge>
              </motion.div>
            )}
            
            {/* Quick Delivery Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-3 right-3"
            >
              <Badge className="bg-orange-500/90 text-white border-orange-400/50 backdrop-blur-sm px-2 py-1 text-xs">
                <Zap className="w-3 h-3 mr-1" />
                {restaurant.deliveryTime}
              </Badge>
            </motion.div>
          </motion.div>
          
          {!restaurant.isOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm"
            >
              <Badge variant="destructive" className="text-lg px-4 py-2 shadow-lg">
                مغلق مؤقتاً
              </Badge>
            </motion.div>
          )}
        </div>
        
        <div className="p-5 space-y-3">
          {/* Restaurant Name & Rating */}
          <div className="flex items-start justify-between">
            <motion.h3 
              className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              {restaurant.name}
            </motion.h3>
            <motion.div 
              className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full"
              whileHover={{ scale: 1.1 }}
            >
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-700">{restaurant.rating}</span>
            </motion.div>
          </div>
          
          {/* Description */}
          {restaurant.description && (
            <motion.p 
              className="text-sm text-gray-600 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {restaurant.description}
            </motion.p>
          )}
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {restaurant.categories.slice(0, 2).map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Badge 
                  variant="secondary" 
                  className="text-xs bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100 transition-colors"
                >
                  {category}
                </Badge>
              </motion.div>
            ))}
            {restaurant.categories.length > 2 && (
              <Badge variant="secondary" className="text-xs bg-gray-50 text-gray-600">
                +{restaurant.categories.length - 2}
              </Badge>
            )}
          </div>
          
          {/* Footer Info */}
          <motion.div 
            className="flex items-center justify-between pt-2 border-t border-gray-100"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>2.5 كم</span>
              </div>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge 
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all duration-300 px-3 py-1 cursor-pointer shadow-md"
              >
                عرض القائمة
              </Badge>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Hover Effect Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      </Card>
    </motion.div>
  );
};
