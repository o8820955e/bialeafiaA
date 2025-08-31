import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Clock, CheckCircle, Truck, MapPin, Phone, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface OrderTrackingProps {
  orderId: string;
  onBack: () => void;
}

type OrderStatus = 'received' | 'preparing' | 'ready' | 'delivering' | 'delivered';

interface OrderStep {
  id: OrderStatus;
  title: string;
  description: string;
  icon: any;
  completed: boolean;
  active: boolean;
  estimatedTime?: string;
}

export const OrderTracking = ({ orderId, onBack }: OrderTrackingProps) => {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('received');
  const [progress, setProgress] = useState(20);
  const [estimatedTime] = useState('25-30');

  const steps: OrderStep[] = [
    {
      id: 'received',
      title: 'قيد المراجعة',
      description: 'تم استلام طلبك وجاري مراجعته',
      icon: CheckCircle,
      completed: true,
      active: currentStatus === 'received',
      estimatedTime: '2 دقائق'
    },
    {
      id: 'preparing',
      title: 'قيد التحضير',
      description: 'بدأ الشيف في تحضير طلبك',
      icon: Clock,
      completed: currentStatus !== 'received',
      active: currentStatus === 'preparing',
      estimatedTime: '15-20 دقيقة'
    },
    {
      id: 'ready',
      title: 'جاهز للاستلام',
      description: 'طلبك جاهز وفي انتظار التوصيل',
      icon: CheckCircle,
      completed: ['ready', 'delivering', 'delivered'].includes(currentStatus),
      active: currentStatus === 'ready',
      estimatedTime: '5 دقائق'
    },
    {
      id: 'delivering',
      title: 'خرج للتوصيل',
      description: 'الطلب في الطريق إليك',
      icon: Truck,
      completed: currentStatus === 'delivered',
      active: currentStatus === 'delivering',
      estimatedTime: '10-15 دقيقة'
    },
    {
      id: 'delivered',
      title: 'تم التسليم',
      description: 'وصل طلبك بالعافية! 🎉',
      icon: MapPin,
      completed: currentStatus === 'delivered',
      active: currentStatus === 'delivered'
    }
  ];

  // Simulate order progress
  useEffect(() => {
    const progressSteps = [
      { status: 'received', progress: 20, time: 3000 },
      { status: 'preparing', progress: 40, time: 8000 },
      { status: 'ready', progress: 70, time: 5000 },
      { status: 'delivering', progress: 90, time: 7000 },
      { status: 'delivered', progress: 100, time: 2000 }
    ];

    let timeoutId: NodeJS.Timeout;
    let currentStep = 0;

    const updateStatus = () => {
      if (currentStep < progressSteps.length - 1) {
        currentStep++;
        setCurrentStatus(progressSteps[currentStep].status as OrderStatus);
        setProgress(progressSteps[currentStep].progress);
        
        timeoutId = setTimeout(updateStatus, progressSteps[currentStep].time);
      }
    };

    timeoutId = setTimeout(updateStatus, progressSteps[0].time);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const activeStep = steps.find(step => step.active);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-10">
        <div className="flex items-center gap-3 p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2 hover:bg-orange-100 rounded-xl"
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">تتبع الطلب</h1>
            <p className="text-sm text-gray-600">رقم الطلب: #{orderId}</p>
          </div>
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            {activeStep?.title}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Progress Overview */}
        <Card className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">طلبك في الطريق إليك</h2>
                <p className="text-orange-100">الوقت المتوقع للوصول: {estimatedTime} دقيقة</p>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
              >
                <Clock className="w-6 h-6" />
              </motion.div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>التقدم</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="bg-white/20" />
            </div>
          </div>
        </Card>

        {/* Order Steps */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">مراحل الطلب</h3>
          
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex items-start gap-4">
                  {/* Step Icon */}
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                      step.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : step.active
                        ? 'bg-orange-500 border-orange-500 text-white'
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                    }`}
                    animate={step.active ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <step.icon className="w-5 h-5" />
                  </motion.div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-semibold ${
                        step.active ? 'text-orange-600' : 
                        step.completed ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        {step.title}
                      </h4>
                      {step.active && step.estimatedTime && (
                        <Badge variant="outline" className="text-xs">
                          {step.estimatedTime}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{step.description}</p>
                    
                    {step.active && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2"
                      >
                        <div className="flex space-x-1 space-x-reverse">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-1.5 h-1.5 bg-orange-400 rounded-full"
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
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="absolute right-6 top-12 w-px h-6 bg-gray-200" />
                )}
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Contact Actions */}
        <Card className="p-4 bg-white/80 backdrop-blur-sm">
          <h3 className="font-semibold mb-3 text-gray-900">تحتاج مساعدة؟</h3>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 hover:bg-green-50 hover:border-green-200"
              onClick={() => {
                const whatsappUrl = `https://wa.me/+962791234567?text=${encodeURIComponent(`مرحبا، أحتاج مساعدة في طلب رقم #${orderId}`)}`;
                window.open(whatsappUrl, '_blank');
              }}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              واتساب
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 hover:bg-blue-50 hover:border-blue-200"
              onClick={() => window.open('tel:+962791234567', '_self')}
            >
              <Phone className="w-4 h-4 mr-2" />
              اتصال
            </Button>
          </div>
        </Card>

        {/* Success Celebration */}
        <AnimatePresence>
          {currentStatus === 'delivered' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            >
              <Card className="p-8 m-4 text-center bg-white max-w-sm">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                  className="text-6xl mb-4"
                >
                  🎉
                </motion.div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">
                  تم التسليم بنجاح!
                </h2>
                <p className="text-gray-600 mb-6">
                  شكراً لك لاستخدام تطبيق بالعافية. نتمنى أن تكون قد استمتعت بوجبتك!
                </p>
                <Button
                  onClick={onBack}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600"
                >
                  العودة للرئيسية
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
