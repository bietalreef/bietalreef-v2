import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useProfile } from "@/hooks/useProfile";
import BottomNav from "@/components/BottomNav";
import { 
  Building2, 
  Calculator, 
  FileText, 
  Hammer, 
  Home as HomeIcon, 
  LayoutDashboard,
  MessageSquare, 
  Settings,
  Users,
  Wrench,
  ShoppingCart,
  Package,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Briefcase,
  Image,
  Bot,
  Megaphone,
  Share2,
  Upload,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import { Link } from "wouter";

// Mock data for client orders
const mockClientOrders = [
  {
    id: 1,
    title: "طلب مواد بناء",
    company: "متجر مواد البناء الإماراتي",
    status: "قيد التنفيذ",
    total: "15,000 درهم",
    date: "2025-11-01",
    progress: 60
  },
  {
    id: 2,
    title: "خدمة تنظيف",
    company: "شركة النظافة المتقدمة",
    status: "مكتمل",
    total: "2,500 درهم",
    date: "2025-10-28",
    progress: 100
  },
  {
    id: 3,
    title: "إيجار معدات",
    company: "مؤسسة رابتور",
    status: "جديد",
    total: "8,000 درهم",
    date: "2025-11-05",
    progress: 10
  }
];

// Mock data for provider contracts
const mockProviderContracts = [
  {
    id: 1,
    title: "بناء فيلا في دبي",
    client: "أحمد محمد",
    status: "نشط",
    value: "500,000 درهم",
    startDate: "2025-10-15",
    endDate: "2026-01-15",
    progress: 35
  },
  {
    id: 2,
    title: "تصميم داخلي لشقة",
    client: "فاطمة علي",
    status: "نشط",
    value: "85,000 درهم",
    startDate: "2025-11-01",
    endDate: "2025-12-01",
    progress: 20
  },
  {
    id: 3,
    title: "صيانة مبنى تجاري",
    client: "شركة الخليج",
    status: "مكتمل",
    value: "250,000 درهم",
    startDate: "2025-09-01",
    endDate: "2025-10-30",
    progress: 100
  }
];

// Mock data for messages
const mockMessages = [
  {
    id: 1,
    from: "شركة النظافة المتقدمة",
    subject: "تأكيد موعد الخدمة",
    preview: "نود تأكيد موعد خدمة التنظيف المقررة ليوم الأحد...",
    date: "منذ ساعتين",
    unread: true
  },
  {
    id: 2,
    from: "متجر مواد البناء",
    subject: "تحديث الطلب #1234",
    preview: "تم شحن طلبك وسيصل خلال يومين...",
    date: "منذ 5 ساعات",
    unread: true
  },
  {
    id: 3,
    from: "مقاولات البناء الحديث",
    subject: "عرض سعر جديد",
    preview: "نرسل لكم عرض السعر المطلوب للمشروع...",
    date: "أمس",
    unread: false
  }
];

// Client Dashboard Component
function ClientDashboard({ user }: any) {
  return (
    <div className="space-y-6">
      {/* Overview Tab */}
      <TabsContent value="overview" className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 هذا الشهر
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">قيد التنفيذ</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                طلبات نشطة
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الإنفاق</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45,000</div>
              <p className="text-xs text-muted-foreground">
                درهم إماراتي
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الرسائل</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                رسائل غير مقروءة
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>الطلبات الأخيرة</CardTitle>
            <CardDescription>آخر 3 طلبات لك</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockClientOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium">{order.title}</p>
                    <p className="text-xs text-muted-foreground">{order.company}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        order.status === "مكتمل" ? "default" :
                        order.status === "قيد التنفيذ" ? "secondary" : "outline"
                      }>
                        {order.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{order.date}</span>
                    </div>
                    <Progress value={order.progress} className="h-2" />
                  </div>
                  <div className="text-left mr-4">
                    <p className="text-sm font-bold text-green-600">{order.total}</p>
                    <Button variant="ghost" size="sm" className="mt-2">
                      عرض التفاصيل
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Cart Tab */}
      <TabsContent value="cart" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>سلة التسوق</CardTitle>
            <CardDescription>المنتجات والخدمات المضافة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">سلتك فارغة حالياً</p>
              <Button className="mt-4" asChild>
                <Link href="/home">تصفح الخدمات</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Orders Tab */}
      <TabsContent value="orders" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>طلباتي</CardTitle>
            <CardDescription>جميع طلباتك ومشترياتك</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockClientOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{order.title}</h3>
                          <Badge variant={
                            order.status === "مكتمل" ? "default" :
                            order.status === "قيد التنفيذ" ? "secondary" : "outline"
                          }>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{order.company}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {order.date}
                          </span>
                          <span className="flex items-center gap-1 text-green-600 font-semibold">
                            <DollarSign className="h-4 w-4" />
                            {order.total}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span>التقدم</span>
                            <span>{order.progress}%</span>
                          </div>
                          <Progress value={order.progress} className="h-2" />
                        </div>
                      </div>
                      <div className="flex gap-2 mr-4">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Messages Tab */}
      <TabsContent value="messages" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>الرسائل</CardTitle>
            <CardDescription>تواصل مع مزودي الخدمات</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockMessages.map((message) => (
                <Card key={message.id} className={message.unread ? "bg-blue-50" : ""}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{message.from}</h4>
                          {message.unread && (
                            <Badge variant="default" className="text-xs">جديد</Badge>
                          )}
                        </div>
                        <p className="text-sm font-medium">{message.subject}</p>
                        <p className="text-sm text-muted-foreground">{message.preview}</p>
                        <p className="text-xs text-muted-foreground">{message.date}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Settings Tab */}
      <TabsContent value="settings" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>الإعدادات</CardTitle>
            <CardDescription>إدارة حسابك ومعلوماتك</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">الاسم</label>
              <p className="text-sm text-muted-foreground">{user?.name || user?.email}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">البريد الإلكتروني</label>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">نوع الحساب</label>
              <Badge>عميل</Badge>
            </div>
            <div className="pt-4">
              <Button variant="outline">تعديل المعلومات</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
}

// Provider Dashboard Component
function ProviderDashboard({ user, profile }: any) {
  return (
    <div className="space-y-6">
      {/* Overview Tab */}
      <TabsContent value="overview" className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">العقود النشطة</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                +2 هذا الشهر
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">طلبات جديدة</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                تحتاج للرد
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الإيرادات</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85,000</div>
              <p className="text-xs text-muted-foreground">
                درهم هذا الشهر
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">التقييم</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">
                من 5 نجوم
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Active Contracts */}
        <Card>
          <CardHeader>
            <CardTitle>العقود النشطة</CardTitle>
            <CardDescription>المشاريع الجارية حالياً</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProviderContracts.filter(c => c.status === "نشط").map((contract) => (
                <div key={contract.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium">{contract.title}</p>
                    <p className="text-xs text-muted-foreground">العميل: {contract.client}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{contract.status}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {contract.startDate} - {contract.endDate}
                      </span>
                    </div>
                    <Progress value={contract.progress} className="h-2" />
                  </div>
                  <div className="text-left mr-4">
                    <p className="text-sm font-bold text-green-600">{contract.value}</p>
                    <Button variant="ghost" size="sm" className="mt-2">
                      إدارة
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Requests Tab */}
      <TabsContent value="requests" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>طلبات العروض</CardTitle>
            <CardDescription>طلبات جديدة من العملاء</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                لديك 12 طلب جديد يحتاج للرد
              </AlertDescription>
            </Alert>
            <div className="mt-4 text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">قريباً: إدارة طلبات العروض</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Contracts Tab */}
      <TabsContent value="contracts" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>العقود</CardTitle>
            <CardDescription>جميع عقودك ومشاريعك</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProviderContracts.map((contract) => (
                <Card key={contract.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{contract.title}</h3>
                          <Badge variant={contract.status === "نشط" ? "default" : "secondary"}>
                            {contract.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">العميل: {contract.client}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {contract.startDate} - {contract.endDate}
                          </span>
                          <span className="flex items-center gap-1 text-green-600 font-semibold">
                            <DollarSign className="h-4 w-4" />
                            {contract.value}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span>التقدم</span>
                            <span>{contract.progress}%</span>
                          </div>
                          <Progress value={contract.progress} className="h-2" />
                        </div>
                      </div>
                      <div className="flex gap-2 mr-4">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* AI Tools Tab */}
      <TabsContent value="ai-tools" className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Image className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle>محرر الصور بالذكاء الاصطناعي</CardTitle>
                  <CardDescription>تحسين صور مشاريعك</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full">جرب الآن</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Bot className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle>مصمم 2D/3D</CardTitle>
                  <CardDescription>إنشاء تصاميم احترافية</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full">جرب الآن</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Megaphone className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle>إدارة الحملات الإعلانية</CardTitle>
                  <CardDescription>تسويق خدماتك بذكاء</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full">جرب الآن</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Share2 className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <CardTitle>إدارة السوشيال ميديا</CardTitle>
                  <CardDescription>جدولة ونشر المحتوى</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full">جرب الآن</Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* Messages Tab */}
      <TabsContent value="messages" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>الرسائل</CardTitle>
            <CardDescription>تواصل مع العملاء</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockMessages.map((message) => (
                <Card key={message.id} className={message.unread ? "bg-blue-50" : ""}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{message.from}</h4>
                          {message.unread && (
                            <Badge variant="default" className="text-xs">جديد</Badge>
                          )}
                        </div>
                        <p className="text-sm font-medium">{message.subject}</p>
                        <p className="text-sm text-muted-foreground">{message.preview}</p>
                        <p className="text-xs text-muted-foreground">{message.date}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Settings Tab */}
      <TabsContent value="settings" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>الإعدادات</CardTitle>
            <CardDescription>إدارة حسابك ومعلومات شركتك</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">الاسم</label>
              <p className="text-sm text-muted-foreground">{user?.name || user?.email}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">البريد الإلكتروني</label>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">نوع الحساب</label>
              <Badge variant="secondary">مزود خدمة</Badge>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">حالة التوثيق</label>
              <Badge variant={profile?.is_verified ? "default" : "outline"}>
                {profile?.is_verified ? "موثق" : "غير موثق"}
              </Badge>
            </div>
            <div className="pt-4 space-x-2 space-x-reverse">
              <Button variant="outline">تعديل المعلومات</Button>
              {!profile?.is_verified && (
                <Button>توثيق الحساب</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
}

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const { profile, loading: profileLoading } = useProfile();

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>تسجيل الدخول مطلوب</CardTitle>
            <CardDescription>يجب تسجيل الدخول للوصول إلى لوحة التحكم</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/">العودة للرئيسية</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const userType = profile?.user_type || 'client';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="بيت الريف" className="h-10 w-auto" />
            <span className="text-lg font-bold">لوحة التحكم</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium">مرحباً، {user?.name || user?.email}</span>
              <Badge variant="outline" className="text-xs">
                {userType === 'client' ? 'عميل' : 'مزود خدمة'}
              </Badge>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/home">الرئيسية</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">لوحة التحكم</h1>
          <p className="text-muted-foreground">
            {userType === 'client' ? 'إدارة طلباتك ومشترياتك' : 'إدارة عقودك وخدماتك'}
          </p>
        </div>

        {/* Verification Alert */}
        {profile && !profile.is_verified && (
          <Alert className="mb-6 bg-yellow-50 border-yellow-200">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              حسابك غير موثق. وثق حسابك للحصول على جميع الميزات المتقدمة وزيادة مصداقيتك.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          {userType === 'client' ? (
            <>
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
                <TabsTrigger value="overview">
                  <LayoutDashboard className="ml-2 h-4 w-4" />
                  نظرة عامة
                </TabsTrigger>
                <TabsTrigger value="cart">
                  <ShoppingCart className="ml-2 h-4 w-4" />
                  السلة
                </TabsTrigger>
                <TabsTrigger value="orders">
                  <Package className="ml-2 h-4 w-4" />
                  طلباتي
                </TabsTrigger>
                <TabsTrigger value="messages">
                  <MessageSquare className="ml-2 h-4 w-4" />
                  الرسائل
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="ml-2 h-4 w-4" />
                  الإعدادات
                </TabsTrigger>
              </TabsList>
              <ClientDashboard user={user} />
            </>
          ) : (
            <>
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
                <TabsTrigger value="overview">
                  <LayoutDashboard className="ml-2 h-4 w-4" />
                  نظرة عامة
                </TabsTrigger>
                <TabsTrigger value="requests">
                  <FileText className="ml-2 h-4 w-4" />
                  طلبات العروض
                </TabsTrigger>
                <TabsTrigger value="contracts">
                  <Briefcase className="ml-2 h-4 w-4" />
                  العقود
                </TabsTrigger>
                <TabsTrigger value="ai-tools">
                  <Bot className="ml-2 h-4 w-4" />
                  أدوات AI
                </TabsTrigger>
                <TabsTrigger value="messages">
                  <MessageSquare className="ml-2 h-4 w-4" />
                  الرسائل
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="ml-2 h-4 w-4" />
                  الإعدادات
                </TabsTrigger>
              </TabsList>
              <ProviderDashboard user={user} profile={profile} />
            </>
          )}
        </Tabs>
      </div>
      <BottomNav />
    </div>
  );
}
