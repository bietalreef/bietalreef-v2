import { Home, LayoutDashboard, MessageSquare, ShoppingBag, User } from 'lucide-react';
import { useLocation } from 'wouter';

export default function BottomNav() {
  const [location, setLocation] = useLocation();

  const navItems = [
    {
      icon: Home,
      label: 'الرئيسية',
      path: '/home',
      color: 'text-green-600',
    },
    {
      icon: ShoppingBag,
      label: 'العروض',
      path: '/properties',
      color: 'text-blue-600',
    },
    {
      icon: LayoutDashboard,
      label: 'لوحة التحكم',
      path: '/dashboard',
      color: 'text-purple-600',
    },
    {
      icon: MessageSquare,
      label: 'الرسائل',
      path: '/messages',
      color: 'text-orange-600',
    },
    {
      icon: User,
      label: 'الملف الشخصي',
      path: '/profile',
      color: 'text-pink-600',
    },
  ];

  const handleNavClick = (path: string) => {
    setLocation(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 pb-safe">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? `${item.color} bg-${item.color.split('-')[1]}-50 scale-110`
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon 
                className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : 'stroke-[2]'}`} 
              />
              <span className={`text-xs font-medium ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
