import { useEffect, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation, Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useProfile } from "@/hooks/useProfile";
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
  MessageSquare,
  Users,
  FileText,
  Briefcase,
  Bot,
  Image,
  Megaphone,
  Share2,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign
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

// Mock data for provider leads
const mockLeads = [
  {
    id: 1,
    title: "مطلوب مقاول لبناء فيلا في دبي",
    budget: "500,000 - 750,000 درهم",
    location: "دبي - البرشاء",
    deadline: "3 أشهر",
    status: "جديد",
    postedDate: "منذ ساعتين"
  },
  {
    id: 2,
    title: "تصميم داخلي لشقة في أبوظبي",
    budget: "80,000 - 120,000 درهم",
    location: "أبوظبي - الخالدية",
    deadline: "شهر واحد",
    status: "عاجل",
    postedDate: "منذ 5 ساعات"
  },
  {
    id: 3,
    title: "صيانة وترميم مبنى تجاري",
    budget: "200,000 - 300,000 درهم",
    location: "الشارقة - الخان",
    deadline: "شهرين",
    status: "جديد",
    postedDate: "منذ يوم"
  }
];

// Component for Client View
function ClientView({ user, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, profile }: any) {
  const filteredCompanies = selectedCategory
    ? featuredCompanies.filter(c => c.category === selectedCategory)
    : featuredCompanies;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Verification Banner */}
      {profile && !profile.is_verified && (
        <Alert className="mx-4 mt-4 bg-yellow-50 border-yellow-200">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <div className="flex items-center justify-between">
              <span>حسابك غير موثق. وثق حسابك للحصول على جميع الميزات المتقدمة.</span>
              <Button variant="outline" size="sm" asChild className="mr-4">
                <Link href="/dashboard">توثيق الحساب</Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

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
                    <div className={`${category.color} w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-medium">{category.name}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-12 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              🏢 الشركات المميزة
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
                  <Badge className="absolute top-4 right-4 bg-white/90 text-gray-800">
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
                      <span>{company.location.city}</span>
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
                    <Button variant="outline" className="flex-1" size="sm">
                      عرض التفاصيل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Component for Provider View
function ProviderView({ user, profile }: any) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Verification Banner */}
      {profile && !profile.is_verified && (
        <Alert className="mx-4 mt-4 bg-yellow-50 border-yellow-200">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <div className="flex items-center justify-between">
              <span>حسابك غير موثق. وثق حسابك للحصول على جميع الميزات المتقدمة وزيادة مصداقيتك.</span>
              <Button variant="outline" size="sm" asChild className="mr-4">
                <Link href="/dashboard">توثيق الحساب</Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Hero Section */}
      <section className="relative py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              مرحباً بك في لوحة المزود 💼
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              إدارة خدماتك وطلبات العملاء بكفاءة
            </p>
            <p className="text-lg text-gray-500">
              مرحباً، {user?.email || user?.name || 'مزود الخدمة'}
            </p>
          </div>

          {/* Quick Stats for Providers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="text-3xl font-bold text-gray-800">12</p>
                <p className="text-sm text-gray-600">طلبات جديدة</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <Briefcase className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="text-3xl font-bold text-gray-800">5</p>
                <p className="text-sm text-gray-600">مشاريع نشطة</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <p className="text-3xl font-bold text-gray-800">48</p>
                <p className="text-sm text-gray-600">عميل محتمل</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <p className="text-3xl font-bold text-gray-800">85,000</p>
                <p className="text-sm text-gray-600">درهم (هذا الشهر)</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Potential Leads */}
      <section className="py-12 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              🎯 عملاء محتملون
            </h2>
            <Button variant="outline">عرض الكل</Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockLeads.map((lead) => (
              <Card key={lead.id} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant={lead.status === "عاجل" ? "destructive" : "default"}>
                      {lead.status}
                    </Badge>
                    <span className="text-xs text-gray-500">{lead.postedDate}</span>
                  </div>
                  <CardTitle className="text-right text-lg">{lead.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">الميزانية:</span>
                      <span className="font-semibold text-green-600">{lead.budget}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">الموقع:</span>
                      <span className="font-medium">{lead.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">المدة:</span>
                      <span className="font-medium">{lead.deadline}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      تقديم عرض
                    </Button>
                    <Button variant="outline" className="flex-1" size="sm">
                      التفاصيل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tools Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            🤖 أدوات الذكاء الاصطناعي
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Image className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold mb-2">محرر الصور بالذكاء الاصطناعي</h3>
                <p className="text-sm text-gray-600 mb-4">
                  تحسين وتعديل صور مشاريعك تلقائياً
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  جرب الآن
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6 text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Bot className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-bold mb-2">مصمم 2D/3D</h3>
                <p className="text-sm text-gray-600 mb-4">
                  إنشاء تصاميم احترافية بسهولة
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  جرب الآن
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Megaphone className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold mb-2">إدارة الحملات الإعلانية</h3>
                <p className="text-sm text-gray-600 mb-4">
                  تسويق خدماتك بذكاء
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  جرب الآن
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6 text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Share2 className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-bold mb-2">إدارة السوشيال ميديا</h3>
                <p className="text-sm text-gray-600 mb-4">
                  جدولة ونشر المحتوى تلقائياً
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  جرب الآن
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            ⚡ إجراءات سريعة
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">إنشاء عرض سعر</h3>
                    <p className="text-sm text-gray-600">قدم عرضك للعملاء</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Package className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">إضافة خدمة جديدة</h3>
                    <p className="text-sm text-gray-600">وسع عروضك</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">الرسائل</h3>
                    <p className="text-sm text-gray-600">تواصل مع العملاء</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function HomeUser() {
  const { user, isAuthenticated, loading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setLocation("/");
    }
  }, [loading, isAuthenticated, setLocation]);

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  // If user hasn't selected a type yet, they should be redirected by AuthCallback
  if (!profile?.user_type) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Render different views based on user type from database
  return profile.user_type === 'client' ? (
    <ClientView 
      user={user}
      profile={profile}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    />
  ) : (
    <ProviderView user={user} profile={profile} />
  );
}
