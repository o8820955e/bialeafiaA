import { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CategoryTabs } from './components/CategoryTabs';
import { RestaurantCard } from './components/RestaurantCard';
import { RestaurantDetails } from './components/RestaurantDetails';
import { Cart } from './components/Cart';
import { PickupPointSelector } from './components/PickupPointSelector';
import { EmptyState } from './components/EmptyState';
import { Toaster } from './components/Toaster';
import { Footer } from './components/Footer';
import { SplashScreen } from './components/SplashScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { FloatingActionButton } from './components/FloatingActionButton';
import { DiscountSection } from './components/DiscountSection';
import { useCart } from './hooks/useCart';
import { restaurants, Restaurant, MenuItem, pickupPoints } from './data/mockData';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Page = 'splash' | 'onboarding' | 'home' | 'restaurant' | 'cart' | 'pickup';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('splash');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  // Onboarding flag is managed via currentPage only
  
  const {
    cartItems,
    selectedPickupPoint,
    setSelectedPickupPoint,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    getCurrentRestaurantId
  } = useCart();

  // Filter restaurants based on search and category
  const filteredRestaurants = useMemo(() => {
    const list = restaurants.filter(restaurant => {
      const matchesSearch = searchQuery === '' || 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'الكل' || 
        restaurant.categories.some(cat => {
          // Handle compound categories
          if (selectedCategory === 'مندي & زربيان') {
            return cat.includes('مندي') || cat.includes('زربيان') || cat === 'مندي & زربيان';
          }
          if (selectedCategory === 'بيتزا & معجنات') {
            return cat.includes('بيتزا') || cat.includes('معجنات') || cat === 'بيتزا & معجنات';
          }
          return cat === selectedCategory;
        });
      
      return matchesSearch && matchesCategory;
    });
    // Keep Haboob at the bottom of the list
    return list.sort((a, b) => (a.id === 'haboob' ? 1 : 0) - (b.id === 'haboob' ? 1 : 0));
  }, [searchQuery, selectedCategory]);

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentPage('restaurant');
  };

  const handleAddToCart = (menuItem: MenuItem) => {
    if (!selectedRestaurant) return;
    
    addToCart({
      menuItemId: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      restaurantId: selectedRestaurant.id,
      restaurantName: selectedRestaurant.name
    });
  };

  // Check if user has seen onboarding (no state needed)
  useEffect(() => {
    /* reserved for future onboarding checks */
  }, []);

  const handleSplashComplete = () => {
    // تحقق مباشر من localStorage
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (hasSeenOnboarding === 'true') {
      setCurrentPage('home');
    } else {
      setCurrentPage('onboarding');
    }
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setCurrentPage('home');
  };

  const handleOrderViaWhatsApp = () => {
    const currentPickupPoint = pickupPoints.find(p => p.id === selectedPickupPoint);
    const restaurantName = cartItems[0]?.restaurantName;
    const restaurantPhone = restaurants.find(r => r.id === cartItems[0]?.restaurantId)?.phone;
    
    let message = `مرحبا، أريد طلب من ${restaurantName}:\n\n`;
    
    cartItems.forEach(item => {
      message += `• ${item.name} × ${item.quantity} = ${(item.price * item.quantity).toFixed(2)} د.أ\n`;
    });
    
    message += `\nالمجموع: ${getCartTotal().toFixed(2)} د.أ\n`;
    message += `نقطة الاستلام: ${currentPickupPoint?.name}\n\n`;
    message += `شكراً لكم`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${restaurantPhone?.replace('+', '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  // FAB Actions
  const handleFABSearch = () => {
    // Focus search input or show search modal
    const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
    }
  };

  const handleFABSupport = () => {
    const supportMessage = encodeURIComponent('مرحبا، أحتاج مساعدة في تطبيق بالعافية');
    window.open(`https://wa.me/+962791234567?text=${supportMessage}`, '_blank');
  };

  const handleFABCall = () => {
    window.open('tel:+962791234567', '_self');
  };

  const handleFABFavorites = () => {
    // Could implement favorites functionality
    console.log('Favorites clicked');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;
        
      case 'onboarding':
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
        
      case 'restaurant':
        return selectedRestaurant ? (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <RestaurantDetails
              restaurant={selectedRestaurant}
              onBack={() => setCurrentPage('home')}
              onAddToCart={handleAddToCart}
              currentRestaurantId={getCurrentRestaurantId()}
            />
          </motion.div>
        ) : null;
        
      case 'cart':
        return (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
          >
            <Cart
              cartItems={cartItems}
              selectedPickupPoint={selectedPickupPoint}
              onBack={() => setCurrentPage('home')}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              onClearCart={clearCart}
              onOrderViaWhatsApp={handleOrderViaWhatsApp}
            />
          </motion.div>
        );
        
      case 'pickup':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <PickupPointSelector
              selectedPickupPoint={selectedPickupPoint}
              onSelectPickupPoint={setSelectedPickupPoint}
              onBack={() => setCurrentPage('home')}
            />
          </motion.div>
        );
        
      default:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-red-50/50"
          >
            <Header
              selectedPickupPoint={selectedPickupPoint}
              cartItemsCount={getCartItemsCount()}
              onCartClick={() => setCurrentPage('cart')}
              onPickupPointClick={() => setCurrentPage('pickup')}
            />
            
            {/* Enhanced Welcome Section */}
            <motion.div 
              className="px-4 pt-6 pb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="relative">
                <motion.h2 
                  className="text-2xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  أهلاً وسهلاً 👋
                </motion.h2>
                <motion.p 
                  className="text-gray-600 text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  شو نفسك تاكل اليوم؟
                </motion.p>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-20 animate-float" />
                <div className="absolute -bottom-2 -left-8 w-12 h-12 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }} />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <CategoryTabs
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </motion.div>

            {/* Discounts Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              <DiscountSection onSelect={handleRestaurantClick} />
            </motion.div>
            
            <motion.div 
              className="p-4 space-y-6 pb-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {filteredRestaurants.length > 0 ? (
                <AnimatePresence mode="wait">
                  {filteredRestaurants.map((restaurant, index) => (
                    <motion.div
                      key={restaurant.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <RestaurantCard
                        restaurant={restaurant}
                        onClick={() => handleRestaurantClick(restaurant)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <EmptyState
                    icon={Search}
                    title="ما لقينا نتائج"
                    description="ما لقينا نتائج تناسب بحثك. جرّب كلمات أقل أو غيّر الفلاتر."
                    actionLabel="إعادة تعيين"
                    onAction={() => {
                      setSearchQuery('');
                      setSelectedCategory('الكل');
                    }}
                  />
                </motion.div>
              )}
            </motion.div>
            
            <Footer />
            
            {/* Floating Action Button - only on home page */}
            <FloatingActionButton
              onSearch={handleFABSearch}
              onSupport={handleFABSupport}
              onCall={handleFABCall}
              onFavorites={handleFABFavorites}
            />
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen custom-scrollbar bg-[image:var(--background)]" dir="rtl">
      <AnimatePresence mode="wait">
        {renderCurrentPage()}
      </AnimatePresence>
      <Toaster />
    </div>
  );
}
