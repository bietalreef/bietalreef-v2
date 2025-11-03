import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Wrench
} from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();

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
            <span className="text-sm text-muted-foreground">مرحباً، {user?.name}</span>
            <Button variant="outline" size="sm" asChild>
              <Link href="/">الرئيسية</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">لوحة التحكم</h1>
          <p className="text-muted-foreground">إدارة حسابك وخدماتك في بيت الريف</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="overview">
              <LayoutDashboard className="ml-2 h-4 w-4" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="tools">
              <Calculator className="ml-2 h-4 w-4" />
              الأدوات
            </TabsTrigger>
            <TabsTrigger value="services">
              <Hammer className="ml-2 h-4 w-4" />
              الخدمات
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

          {/* نظرة عامة */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">المشاريع النشطة</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">+2 عن الشهر الماضي</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">الحرفيون المتاحون</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">في منطقتك</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">العقارات المتاحة</CardTitle>
                  <HomeIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">في العين</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">الرسائل الجديدة</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">تحتاج للرد</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>الأدوات المجانية</CardTitle>
                  <CardDescription>استخدم أدواتنا المجانية لتخطيط مشروعك</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/tools/cost-calculator">
                      <Calculator className="ml-2 h-4 w-4" />
                      حاسبة تكلفة البناء
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/tools/area-calculator">
                      <LayoutDashboard className="ml-2 h-4 w-4" />
                      حاسبة المساحات
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/tools/material-selector">
                      <Wrench className="ml-2 h-4 w-4" />
                      اختيار المواد والتشطيبات
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>الخدمات السريعة</CardTitle>
                  <CardDescription>الوصول السريع للخدمات الأساسية</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/properties">
                      <HomeIcon className="ml-2 h-4 w-4" />
                      تصفح العقارات
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/craftsmen">
                      <Hammer className="ml-2 h-4 w-4" />
                      ابحث عن حرفيين
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/chat">
                      <MessageSquare className="ml-2 h-4 w-4" />
                      تحدث مع وياك
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* الأدوات */}
          <TabsContent value="tools">
            <Card>
              <CardHeader>
                <CardTitle>أدوات التصميم المجانية</CardTitle>
                <CardDescription>أدوات احترافية لمساعدتك في تخطيط وتصميم مشروعك</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <Card className="border-2 hover:border-primary transition-colors cursor-pointer">
                    <CardHeader>
                      <Calculator className="h-12 w-12 text-primary mb-2" />
                      <CardTitle className="text-lg">حاسبة التكلفة</CardTitle>
                      <CardDescription>احسب تكلفة مشروعك بدقة</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" asChild>
                        <Link href="/tools/cost-calculator">ابدأ الآن</Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-primary transition-colors cursor-pointer">
                    <CardHeader>
                      <LayoutDashboard className="h-12 w-12 text-primary mb-2" />
                      <CardTitle className="text-lg">حاسبة المساحات</CardTitle>
                      <CardDescription>خطط مساحات منزلك بذكاء</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" asChild>
                        <Link href="/tools/area-calculator">ابدأ الآن</Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-primary transition-colors cursor-pointer">
                    <CardHeader>
                      <Wrench className="h-12 w-12 text-primary mb-2" />
                      <CardTitle className="text-lg">اختيار المواد</CardTitle>
                      <CardDescription>اختر أفضل المواد لمشروعك</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" asChild>
                        <Link href="/tools/material-selector">ابدأ الآن</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* الخدمات */}
          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>خدماتنا</CardTitle>
                <CardDescription>استكشف جميع الخدمات المتاحة</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">قريباً...</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* الرسائل */}
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>الرسائل</CardTitle>
                <CardDescription>تواصل مع الحرفيين والمقاولين</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">قريباً...</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* الإعدادات */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>الإعدادات</CardTitle>
                <CardDescription>إدارة حسابك وتفضيلاتك</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">قريباً...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
