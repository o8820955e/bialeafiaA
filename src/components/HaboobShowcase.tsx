import Tilt from 'react-parallax-tilt';
import { motion } from 'motion/react';
import { Restaurant, MenuItem } from '../data/mockData';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight, Star } from 'lucide-react';

interface Props {
  restaurant: Restaurant;
  onBack: () => void;
  onAddToCart: (item: MenuItem) => void;
}

const Group: React.FC<{ title: string; items: MenuItem[]; accent?: string; onAdd: (i: MenuItem)=>void }>
 = ({ title, items, accent = 'from-orange-500 to-red-500', onAdd }) => (
  <Tilt glareEnable={true} glareColor="#fff" glareMaxOpacity={0.1} tiltMaxAngleX={10} tiltMaxAngleY={10} className="w-full">
    <Card className="p-4 bg-white/80 backdrop-blur-md border-white/30 shadow-xl">
      <div className={`inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full text-white bg-gradient-to-r ${accent}`}>
        <span className="font-semibold">{title}</span>
      </div>
      <div className="space-y-3">
        {items.map((it) => (
          <div key={it.id} className="flex items-center justify-between">
            <div>
              <div className="font-medium">{it.name}</div>
              <div className="text-sm text-muted-foreground">{it.price.toFixed(2)} د.أ</div>
            </div>
            <Button size="sm" className="btn-primary" onClick={() => onAdd(it)}>أضف</Button>
          </div>
        ))}
      </div>
    </Card>
  </Tilt>
);

export const HaboobShowcase: React.FC<Props> = ({ restaurant, onBack, onAddToCart }) => {
  const by = (cat: string) => restaurant.menuItems.filter(m => m.category === cat);

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Hero */}
      <div className="relative">
        <ImageWithFallback src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute top-4 right-4 flex items-center gap-3">
          <button onClick={onBack} className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"><ArrowRight className="w-5 h-5"/></button>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="absolute bottom-3 right-4 left-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold gradient-text drop-shadow">{restaurant.name}</h1>
            <p className="text-white/90 text-sm">{restaurant.specialty}</p>
          </div>
          <Badge className="bg-green-500/90 text-white border-green-400/50 flex items-center gap-1"><Star className="w-3 h-3"/>{restaurant.rating}</Badge>
        </motion.div>
      </div>

      {/* Groups */}
      <div className="p-4 space-y-4 bg-[image:var(--background)]">
        <Group title="وافل" items={by('وافل')} onAdd={onAddToCart} />
        <Group title="كريب" items={by('كريب')} accent="from-yellow-500 to-orange-500" onAdd={onAddToCart} />
        <Group title="سباغيتي" items={by('سباغيتي')} accent="from-pink-500 to-rose-500" onAdd={onAddToCart} />
        <Group title="عصائر" items={by('عصائر')} accent="from-blue-500 to-cyan-500" onAdd={onAddToCart} />
        <Group title="موهيتو" items={by('موهيتو')} accent="from-emerald-500 to-lime-500" onAdd={onAddToCart} />
      </div>
    </div>
  );
};
