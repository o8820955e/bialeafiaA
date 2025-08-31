import { ArrowRight, MapPin, Check } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { pickupPoints } from '../data/mockData';
import { toast } from 'sonner';

interface PickupPointSelectorProps {
  selectedPickupPoint: string;
  onSelectPickupPoint: (pointId: string) => void;
  onBack: () => void;
}

export const PickupPointSelector = ({
  selectedPickupPoint,
  onSelectPickupPoint,
  onBack
}: PickupPointSelectorProps) => {
  const handleSelect = (pointId: string) => {
    const point = pickupPoints.find(p => p.id === pointId);
    onSelectPickupPoint(pointId);
    if (point) {
      toast.success(`تم اختيار نقطة الاستلام: ${point.name}`);
    }
    onBack();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">نقطة الاستلام</h1>
        </div>
      </div>

      {/* Pickup Points */}
      <div className="p-4 space-y-3">
        <p className="text-sm text-muted-foreground mb-4">
          اختر النقطة الأنسب لك لاستلام طلبك
        </p>
        
        {pickupPoints.map((point) => (
          <Card 
            key={point.id}
            className={`p-4 cursor-pointer transition-all hover:shadow-md border-2 ${
              selectedPickupPoint === point.id 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => handleSelect(point.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className={`p-2 rounded-lg ${
                  selectedPickupPoint === point.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary'
                }`}>
                  <MapPin className="w-4 h-4" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{point.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {point.description}
                  </p>
                </div>
              </div>
              
              {selectedPickupPoint === point.id && (
                <div className="p-1 bg-primary rounded-full text-primary-foreground">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Confirm Button */}
      <div className="p-4 border-t bg-background sticky bottom-0">
        <Button onClick={onBack} className="w-full">
          حفظ
        </Button>
      </div>
    </div>
  );
};
