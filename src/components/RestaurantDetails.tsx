import { Star, Clock, ArrowRight, Plus } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Restaurant, MenuItem } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner';
// import { HaboobShowcase } from './HaboobShowcase';

interface RestaurantDetailsProps {
  restaurant: Restaurant;
  onBack: () => void;
  onAddToCart: (item: MenuItem) => void;
  currentRestaurantId: string | null;
}

export const RestaurantDetails = ({ 
  restaurant, 
  onBack, 
  onAddToCart,
  currentRestaurantId 
}: RestaurantDetailsProps) => {
  // Classic list view requested for Haboob (no 3D showcase)
  const canAddFromThisRestaurant = !currentRestaurantId || currentRestaurantId === restaurant.id;
  
  const groupedMenuItems = restaurant.menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const handleAddToCart = (item: MenuItem) => {
    if (!restaurant.isOpen || !item.isAvailable) return;
    
    if (!canAddFromThisRestaurant) {
      if (confirm('لديك طلب من مطعم آخر. هل تريد بدء طلب جديد من هذا المطعم؟')) {
        onAddToCart(item);
        toast.success(`أُضيف ${item.name} للسلة`, {
          description: 'تم بدء طلب جديد من هذا المطعم'
        });
      }
      return;
    }
    
    onAddToCart(item);
    toast.success(`أُضيف ${item.name} للسلة`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative">
        <ImageWithFallback
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={onBack}
          className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
        {!restaurant.isOpen && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg px-4 py-2">
              مغلق
            </Badge>
          </div>
        )}
      </div>

      {/* Restaurant Info */}
      <div className="p-4 border-b">
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-2xl font-bold">{restaurant.name}</h1>
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span>{restaurant.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-muted-foreground mb-3">
          <Clock className="w-4 h-4" />
          <span>{restaurant.deliveryTime}</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {restaurant.categories.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-6">
        {Object.entries(groupedMenuItems).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-lg font-semibold mb-3">{category}</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <Card key={item.id} className="p-4 relative">
                  {restaurant.id === 'haboob' && (
                    <ImageWithFallback
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="absolute left-3 top-3 w-8 h-8 object-cover rounded-md ring-1 ring-orange-200"
                    />
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{item.name}</h3>
                      <p className="text-primary font-semibold">
                        {item.price.toFixed(2)} د.أ
                      </p>
                      {!item.isAvailable && (
                        <Badge variant="destructive" className="mt-2">
                          غير متاح
                        </Badge>
                      )}
                    </div>
                    <Button
                      onClick={() => handleAddToCart(item)}
                      disabled={!restaurant.isOpen || !item.isAvailable}
                      variant="default"
                      size="sm"
                      className={`min-w-[110px] transition-colors ${
                        item.isAvailable && restaurant.isOpen
                          ? 'btn-primary'
                          : 'bg-gray-200 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {item.isAvailable && restaurant.isOpen ? (
                        <>
                          <Plus className="w-4 h-4 ml-1" />
                          أضف للسلة
                        </>
                      ) : (
                        'غير متاح'
                      )}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
