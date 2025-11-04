import { useEffect, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useNavigate } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Wrench, 
  ShoppingCart, 
  Sparkles, 
  Search,
  MapPin,
  Phone,
  Star,
  TrendingUp,
  Package,
  Hammer,
  Home as HomeIcon,
  MessageSquare
} from "lucide-react";

// Mock data for companies
const featuredCompanies = [
  {
    id: 1,
    name: "مؤسسة رابتور لتأجير المعدات الثقيلة",
    category: "rental_heavy",
    categoryAr: "إيجار معدات ثقيلة",
    location: { city: "دبي", area: "جبل علي" },
    contact: { phone: "+971501234567", whatsapp: "+971501234567" },
    rating: 4.6,
    services: ["بولدوزرات", "كوماتر", "حفارات"],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    name: "شركة النظافة المتقدمة",
    category: "cleaning",
    categoryAr: "خدمات النظافة",
    location: { city: "أبوظبي", area: "المصفح" },
    contact: { phone: "+971502345678", whatsapp: "+971502345678" },
    rating: 4.8,
    services: ["تنظيف منازل", "تنظيف مكاتب", "تنظيف بعد البناء"],
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    name: "متجر مواد البناء الإماراتي",
    category: "building_materials",
    categoryAr: "مواد بناء",
    location: { city: "العين", area: "الطوية" },
    contact: { phone: "+971503456789", whatsapp: "+971503456789" },
    rating: 4.5,
    services: ["أسمنت", "طوب", "حديد تسليح", "أدوات"],
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    name: "شركة الإمارات لإيجار المعدات الخفيفة",
    category: "rental_light",
    categoryAr: "إيجار معدات خفيفة",
    location: { city: "الشارقة", area: "الصناعية" },
    contact: { phone: "+971504567890", whatsapp: "+971504567890" },
    rating: 4.7,
    services: ["مثاقب", "منشار كهربائي", "سقالات"],
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    name: "مقاولات البناء الحديث",
    category: "contractor",
    categoryAr: "مقاولون",
    location: { city: "أبوظبي", area: "المصفح" },
    contact: { phone: "+971505678901", whatsapp: "+971505678901" },
    rating: 4.9,
    services: ["بناء فلل", "تشطيبات", "صيانة"],
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    name: "متجر الخليج لمواد البناء",
    category: "building_materials",
    categoryAr: "مواد بناء",
    location: { city: "دبي", area: "القوز" },
    contact: { phone: "+971506789012", whatsapp: "+971506789012" },
    rating: 4.4,
    services: ["سيراميك", "دهانات", "أدوات كهربائية"],
    image: "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=400&h=300&fit=crop"
  }
];

const categories = [
  { id: "rental_light", name: "إيجار معدات خفيفة", icon: Wrench, color: "bg-blue-500" },
  { id: "rental_heavy", name: "إيجار معدات ثقيلة", icon: Building2, color: "bg-orange-500" },
  { id: "cleaning", name: "شركات النظافة", icon: Sparkles, color: "bg-green-500" },
  { id: "building_materials", name: "مواد البناء", icon: Package, color: "bg-purple-500" },
  { id: "contractor", name: "مقاولون", icon: Hammer, color: "bg-red-500" },
  { id: "general_business", name: "شركات محلية", icon: HomeIcon, color: "bg-indigo-500" }
];

const offers = [
  {
    id: 1,
    title: "خصم 20% على إيجار المعدات الثقيلة",
    description: "احصل على خصم 20% على جميع المعدات الثقيلة لمدة أسبوع",
    discount: "20%",
    validUntil: "2025-11-15",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    title: "عرض خاص على مواد البناء",
    description: "اشترِ 3 واحصل على الرابع مجاناً على جميع مواد البناء",
    discount: "اشترِ 3 واحصل على 1 مجاناً",
    validUntil: "2025-11-20",
    image: "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=600&h=400&fit=crop"
  },
  {
    id: 3,
    title: "خدمات تنظيف مجانية",
    description: "احجز خدمة تنظيف واحصل على خدمة تنظيف نوافذ مجاناً",
    discount: "خدمة مجانية",
    validUntil: "2025-11-25",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop"
  }
];

export default function HomeUser() {
  const { user, isAuthenticated } = useAuth();
  const isLoading = false;
  const [, navigate] = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const filteredCompanies = selectedCategory
    ? featuredCompanies.filter(c => c.category === selectedCategory)
    : featuredCompanies;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              مرحباً بك في بيت الريف 👋
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              منصتك الشاملة للشركات والخدمات في الإمارات
            </p>
            <p className="text-lg text-gray-500">
              مرحباً، {user?.email || user?.name || 'ضيف'}
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="ابحث عن شركات، خدمات، أو منتجات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-12 py-6 text-lg text-right"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <Building2 className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="text-3xl font-bold text-gray-800">150+</p>
                <p className="text-sm text-gray-600">شركة محلية</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <Wrench className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <p className="text-3xl font-bold text-gray-800">50+</p>
                <p className="text-sm text-gray-600">خدمة متاحة</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <ShoppingCart className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="text-3xl font-bold text-gray-800">200+</p>
                <p className="text-sm text-gray-600">منتج</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <p className="text-3xl font-bold text-gray-800">20+</p>
                <p className="text-sm text-gray-600">عرض خاص</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Offers */}
      <section className="py-12 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              🔥 عروض خاصة
            </h2>
            <Button variant="outline">عرض الكل</Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <Card key={offer.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={offer.image} 
                    alt={offer.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-red-500 text-white text-lg px-4 py-2">
                    {offer.discount}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-right">{offer.title}</CardTitle>
                  <CardDescription className="text-right">{offer.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Button>احجز الآن</Button>
                    <p className="text-sm text-gray-500">
                      صالح حتى: {new Date(offer.validUntil).toLocaleDateString('ar-AE')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            تصفح حسب الفئة
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              return (
                <Card 
                  key={category.id} 
                  className={`cursor-pointer hover:shadow-lg transition-all hover:scale-105 ${
                    isSelected ? 'ring-2 ring-primary shadow-lg' : ''
                  }`}
                  onClick={() => setSelectedCategory(isSelected ? null : category.id)}
                >
                  <CardContent className="pt-6 text-center">
                    <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <p className="font-semibold text-sm">{category.name}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          {selectedCategory && (
            <div className="mt-4 text-center">
              <Button 
                variant="outline" 
                onClick={() => setSelectedCategory(null)}
              >
                إلغاء الفلترة
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-12 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              {selectedCategory ? '🔍 نتائج البحث' : '⭐ شركات مميزة'}
            </h2>
            <Button variant="outline">عرض الكل</Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <Card key={company.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={company.image} 
                    alt={company.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-white/90">
                    {company.categoryAr}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-right text-lg">{company.name}</CardTitle>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{company.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{company.location.area}، {company.location.city}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {company.services.slice(0, 3).map((service, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      <Phone className="w-4 h-4 ml-2" />
                      اتصل الآن
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      عرض التفاصيل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Weyak CTA */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <MessageSquare className="w-12 h-12 text-blue-500" />
                </div>
              </div>
              <CardTitle className="text-3xl mb-4">
                هل تحتاج مساعدة؟ تحدث مع وياك! 🤖
              </CardTitle>
              <CardDescription className="text-white/90 text-lg">
                مساعدك الذكي الإماراتي جاهز لمساعدتك في العثور على أفضل الشركات والخدمات
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <MessageSquare className="w-5 h-5 ml-2" />
                ابدأ المحادثة مع وياك
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Provider CTA Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0">
            <CardHeader>
              <CardTitle className="text-3xl mb-4">
                هل أنت صاحب شركة أو مقاول؟
              </CardTitle>
              <CardDescription className="text-white/90 text-lg">
                انضم إلى منصتنا واحصل على صفحتك الشخصية مع أدوات ذكاء اصطناعي متقدمة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <TrendingUp className="w-5 h-5 ml-2" />
                انضم الآن
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
