import { ArrowRight, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { CartItem, pickupPoints } from '../data/mockData';
import { toast } from 'sonner';

interface CartProps {
  cartItems: CartItem[];
  selectedPickupPoint: string;
  onBack: () => void;
  onUpdateQuantity: (menuItemId: string, quantity: number) => void;
  onRemoveItem: (menuItemId: string) => void;
  onClearCart: () => void;
  onOrderViaWhatsApp: () => void;
}

export const Cart = ({
  cartItems,
  selectedPickupPoint,
  onBack,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderViaWhatsApp
}: CartProps) => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const currentPickupPoint = pickupPoints.find(p => p.id === selectedPickupPoint);

  const handleRemoveItem = (menuItemId: string) => {
    const item = cartItems.find(item => item.menuItemId === menuItemId);
    onRemoveItem(menuItemId);
    if (item) {
      toast.info(`تم حذف ${item.name} من السلة`);
    }
  };

  const handleClearCart = () => {
    if (confirm('هل أنت متأكد من حذف جميع العناصر من السلة؟')) {
      onClearCart();
      toast.success('ت�� إفراغ السلة بنجاح');
    }
  };

  const handleOrderViaWhatsApp = () => {
    toast.success('تم إرسال الطلب بنجاح 🎉');
    onOrderViaWhatsApp();
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">سلتك</h1>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center h-96 text-center px-4">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
          <h2 className="text-lg font-semibold mb-2">سلتك فاضية</h2>
          <p className="text-muted-foreground mb-4">
            ابدأ بإضافة ألذ الأطباق 😋
          </p>
          <Button onClick={onBack}>
            تصفح المطاعم
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">سلتك</h1>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClearCart}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4 ml-1" />
            إفراغ السلة
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground">
          من {cartItems[0]?.restaurantName}
        </div>
      </div>

      {/* Cart Items */}
      <div className="p-4 space-y-3">
        {cartItems.map((item) => (
          <Card key={item.menuItemId} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{item.name}</h3>
              <button
                onClick={() => handleRemoveItem(item.menuItemId)}
                className="p-1 text-destructive hover:bg-destructive/10 rounded transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-secondary rounded-lg">
                  <button
                    onClick={() => onUpdateQuantity(item.menuItemId, item.quantity - 1)}
                    className="p-2 hover:bg-secondary/80 rounded-lg transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="min-w-[30px] text-center font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.menuItemId, item.quantity + 1)}
                    className="p-2 hover:bg-secondary/80 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-semibold text-primary">
                  {(item.price * item.quantity).toFixed(2)} د.أ
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.price.toFixed(2)} د.أ للقطعة
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <div className="p-4 border-t bg-background sticky bottom-0">
        <Card className="p-4">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>نقطة الاستلام:</span>
              <span className="font-medium">{currentPickupPoint?.name}</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">المجموع:</span>
              <span className="text-lg font-bold text-primary">
                {total.toFixed(2)} د.أ
              </span>
            </div>
            
            <Button 
              onClick={handleOrderViaWhatsApp} 
              className="w-full btn-primary"
              size="lg"
            >
              تأكيد الطلب
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
