import { Link } from 'wouter';
import { Building2, Phone, Mail, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#1a4d2e] to-[#0d2818] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Logo and Description */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 className="w-10 h-10 text-[#d4af37]" />
            <div>
              <h3 className="text-2xl font-bold">بيت الريف</h3>
              <p className="text-sm text-gray-300">منصة البناء الذكية</p>
            </div>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            منصة شاملة لخدمات البناء والتشييد والتصميم المعماري في دولة الإمارات العربية المتحدة
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-[#d4af37]">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/home" className="text-gray-300 hover:text-white transition-colors">
                  الخدمات
                </Link>
              </li>
              <li>
                <Link href="/home" className="text-gray-300 hover:text-white transition-colors">
                  المميزات
                </Link>
              </li>
              <li>
                <Link href="/home" className="text-gray-300 hover:text-white transition-colors">
                  بلدية العين
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  الشروط والأحكام
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  سياسة الخصوصية
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-[#d4af37]">خدماتنا</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">البناء والتشييد</li>
              <li className="text-gray-300">التصميم المعماري</li>
              <li className="text-gray-300">الاستشارات الهندسية</li>
              <li className="text-gray-300">إدارة المشاريع</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-[#d4af37]">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-300">
                <Phone className="w-4 h-4 text-[#d4af37]" />
                <a href="tel:+971567856001" className="hover:text-white transition-colors">
                  +971 56 785 6001
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Mail className="w-4 h-4 text-[#d4af37]" />
                <a href="mailto:info@bietalreef.ae" className="hover:text-white transition-colors">
                  info@bietalreef.ae
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                <span>المنطقة الصناعية، مدينة العين، الإمارات</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Weyaak Section */}
        <div className="bg-white/10 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-lg p-4 shadow-lg">
                <div className="text-[#1a4d2e] font-bold text-center">
                  <div className="text-2xl">وياك</div>
                  <div className="text-xs">مساعد الذكاء الاصطناعي</div>
                  <div className="text-xs">على منصة بيت الريف</div>
                </div>
              </div>
              <div className="text-right">
                <h5 className="text-xl font-bold mb-1 flex items-center gap-2">
                  <span>👋</span>
                  <span>وياك في خدمتكم</span>
                </h5>
                <p className="text-gray-300">
                  مساعدك الذكي جاهز للإجابة على جميع استفساراتكم
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>
              © 2025 بيت الريف - منصة البناء والتشييد الإماراتية. جميع الحقوق محفوظة.
            </p>
            <p className="flex items-center gap-1">
              صُنع بـ <Heart className="w-4 h-4 text-red-500 fill-red-500" /> في دولة الإمارات العربية المتحدة 🇦🇪
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
