import { Home, MessageSquare, ShoppingBag, User, ChevronDown } from 'lucide-react';
import { useLocation } from 'wouter';
import { useState, useRef, useEffect } from 'react';

export default function BottomNav() {
  const [location, setLocation] = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => location === path;

  const navItems = [
    { path: '/home', icon: Home, label: 'الرئيسية', color: 'text-green-600' },
    { path: '/properties', icon: ShoppingBag, label: 'العروض', color: 'text-blue-600' },
    { path: '/messages', icon: MessageSquare, label: 'الرسائل', color: 'text-purple-600' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 pb-safe">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => setLocation(item.path)}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${
                active
                  ? `${item.color} scale-110 font-bold`
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className={`w-6 h-6 ${active ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}

        {/* Profile Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${
              isActive('/profile') || isActive('/dashboard') || isActive('/settings')
                ? 'text-orange-600 scale-110 font-bold'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="relative">
              <User className={`w-6 h-6 ${isActive('/profile') || isActive('/dashboard') || isActive('/settings') ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
              <ChevronDown className={`w-3 h-3 absolute -top-1 -right-2 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
            </div>
            <span className="text-xs font-medium">الملف الشخصي</span>
          </button>

          {/* Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-56 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => {
                  setLocation('/profile');
                  setShowProfileMenu(false);
                }}
                className={`w-full text-right px-4 py-3 hover:bg-gray-50 transition-colors ${
                  isActive('/profile') ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5" />
                  <span>الصفحة الشخصية</span>
                </div>
              </button>

              <div className="border-t border-gray-100">
                <div className="px-4 py-2 bg-gray-50 text-xs font-semibold text-gray-500">
                  لوحة التحكم
                </div>
                <button
                  onClick={() => {
                    setLocation('/dashboard');
                    setShowProfileMenu(false);
                  }}
                  className={`w-full text-right px-4 py-3 hover:bg-gray-50 transition-colors ${
                    isActive('/dashboard') ? 'bg-purple-50 text-purple-600 font-semibold' : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3 pr-6">
                    <span>📊</span>
                    <span>نظرة عامة</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setLocation('/dashboard?tab=orders');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-right px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 pr-6">
                    <span>📦</span>
                    <span>طلباتي</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setLocation('/dashboard?tab=contracts');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-right px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 pr-6">
                    <span>📄</span>
                    <span>العقود</span>
                  </div>
                </button>
              </div>

              <div className="border-t border-gray-100">
                <button
                  onClick={() => {
                    setLocation('/settings');
                    setShowProfileMenu(false);
                  }}
                  className={`w-full text-right px-4 py-3 hover:bg-gray-50 transition-colors ${
                    isActive('/settings') ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span>⚙️</span>
                    <span>الإعدادات</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
