import { useMemo } from 'react';
import { restaurants, Restaurant } from '../data/mockData';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { motion } from 'motion/react';

interface DiscountSectionProps {
  onSelect: (restaurant: Restaurant) => void;
}

export const DiscountSection = ({ onSelect }: DiscountSectionProps) => {
  const discounted = useMemo(() => restaurants.filter(r => r.discountPercent && r.discountPercent > 0), []);

  if (discounted.length === 0) return null;

  return (
    <div className="px-4 pt-2 pb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-lg gradient-text">عروض وخصومات</h3>
        <Badge className="bg-orange-100 text-orange-800 border-orange-200">محدودة</Badge>
      </div>
      <Carousel opts={{ align: 'start' }}>
        <CarouselContent className="-ml-2">
          {discounted.map((r) => (
            <CarouselItem key={r.id} className="basis-3/4 sm:basis-1/3 pl-2">
              <motion.div whileHover={{ y: -6, scale: 1.02 }}>
                <Card className="overflow-hidden cursor-pointer" onClick={() => onSelect(r)}>
                  <div className="relative">
                    <ImageWithFallback src={r.image} alt={r.name} className="w-full h-36 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white border-red-400/50">
                      خصم {r.discountPercent}%
                    </Badge>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold truncate">{r.name}</h4>
                      <span className="text-xs text-muted-foreground">{r.deliveryTime}</span>
                    </div>
                    {r.description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{r.description}</p>
                    )}
                    <Button size="sm" className="mt-3 w-full btn-primary">شوف العرض</Button>
                  </div>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
};

