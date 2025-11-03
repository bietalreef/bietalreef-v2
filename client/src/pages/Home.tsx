import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE, getLoginUrl, getSignupUrl } from "@/const";
import { Building2, Calculator, FileText, Hammer, Home as HomeIcon, MessageSquare, Phone, Sparkles } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen">
      {/* شريط التنقل */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="بيت الريف" className="h-12 w-auto" />
            <span className="text-xl font-bold text-primary">بيت الريف</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">
              الخدمات
            </a>
            <a href="#providers" className="text-sm font-medium hover:text-primary transition-colors">
              المزودون
            </a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              من نحن
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              اتصل بنا
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">مرحباً، {user?.name}</span>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard">لوحة التحكم</Link>
                </Button>
                <Button variant="outline" size="sm" onClick={() => logout()}>
                  تسجيل الخروج
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <a href={getLoginUrl()}>تسجيل الدخول</a>
                </Button>
                <Button size="sm" asChild>
                  <a href={getSignupUrl()}>إنشاء حساب</a>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* القسم الرئيسي - Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/10 py-20 md:py-32">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* المحتوى النصي */}
            <div className="space-y-6 text-center lg:text-right">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-2 text-sm font-medium text-accent-foreground">
                <Sparkles className="h-4 w-4" />
                <span>منصة البناء الذكية في الإمارات</span>
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                مرحباً بك في{" "}
                <span className="bg-gradient-to-l from-primary to-accent bg-clip-text text-transparent">
                  بيت الريف
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto lg:mx-0">
                منصة شاملة تجمع بين التصميم المعماري، إدارة المشاريع، والتواصل الفوري مع أفضل المقاولين والمصممين في دولة الإمارات العربية المتحدة
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="text-lg h-12 px-8" asChild>
                  <a href="#services">
                    <Sparkles className="ml-2 h-5 w-5" />
                    ابدأ الآن
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="text-lg h-12 px-8" asChild>
                  <a href="#contact">
                    <Phone className="ml-2 h-5 w-5" />
                    تواصل معنا
                  </a>
                </Button>
              </div>
            </div>

            {/* شخصية وياك */}
            <div className="relative">
              <div className="relative rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 p-8 backdrop-blur">
                <img 
                  src="/weyak-character.png" 
                  alt="وياك - المساعد الذكي" 
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-6 max-w-xs border-4 border-accent">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-accent/20 p-2">
                      <MessageSquare className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary mb-1">مرحباً! أنا وياك 👋</h3>
                      <p className="text-sm text-muted-foreground">
                        مساعدك الذكي الإماراتي في منصة بيت الريف
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* عناصر زخرفية */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* قسم الخدمات */}
      <section id="services" className="py-20 md:py-32 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              خدماتنا المتكاملة
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              نوفر لك كل ما تحتاجه لبناء منزل أحلامك من التصميم إلى التنفيذ
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* خدمة التصميم المعماري */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Building2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">التصميم المعماري</h3>
                <p className="text-muted-foreground mb-6">
                  تصاميم معمارية حديثة تجمع بين الأصالة الإماراتية والعصرية
                </p>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                  اعرف المزيد
                </Button>
              </CardContent>
            </Card>

            {/* خدمة إدارة المشاريع */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-accent">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <Hammer className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">إدارة المشاريع</h3>
                <p className="text-muted-foreground mb-6">
                  متابعة شاملة لمشروعك من البداية حتى التسليم النهائي
                </p>
                <Button variant="outline" className="w-full group-hover:bg-accent group-hover:text-accent-foreground">
                  اعرف المزيد
                </Button>
              </CardContent>
            </Card>

            {/* خدمة التمويل */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Calculator className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">حلول التمويل</h3>
                <p className="text-muted-foreground mb-6">
                  خيارات تمويل مرنة تناسب ميزانيتك وتحقق حلمك
                </p>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                  اعرف المزيد
                </Button>
              </CardContent>
            </Card>

            {/* خدمة المقاولين */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-accent">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <HomeIcon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">شبكة المقاولين</h3>
                <p className="text-muted-foreground mb-6">
                  تواصل مع أفضل المقاولين المعتمدين في الإمارات
                </p>
                <Button variant="outline" className="w-full group-hover:bg-accent group-hover:text-accent-foreground">
                  اعرف المزيد
                </Button>
              </CardContent>
            </Card>

            {/* خدمة الاستشارات */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">الاستشارات الهندسية</h3>
                <p className="text-muted-foreground mb-6">
                  استشارات هندسية متخصصة من خبراء في المجال
                </p>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                  اعرف المزيد
                </Button>
              </CardContent>
            </Card>

            {/* خدمة الوثائق */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-accent">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <FileText className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">إدارة الوثائق</h3>
                <p className="text-muted-foreground mb-6">
                  نظام متكامل لإدارة جميع وثائق ومستندات مشروعك
                </p>
                <Button variant="outline" className="w-full group-hover:bg-accent group-hover:text-accent-foreground">
                  اعرف المزيد
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* قسم وياك المساعد الذكي */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="/weyak-character.png" 
                alt="وياك" 
                className="w-full max-w-md mx-auto rounded-3xl shadow-2xl"
              />
            </div>
            
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-2 text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                <span>مساعد ذكي بالذكاء الاصطناعي</span>
              </div>
              
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                تعرف على{" "}
                <span className="text-accent">وياك</span>
                <br />
                مساعدك الذكي
              </h2>
              
              <p className="text-lg text-muted-foreground">
                وياك هو مساعدك الشخصي الذكي الذي يعمل بتقنية الذكاء الاصطناعي المتقدمة. يساعدك في كل خطوة من خطوات بناء منزلك، من اختيار التصميم المناسب إلى التواصل مع المقاولين وإدارة الميزانية.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2 mt-1">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">إجابات فورية</h4>
                    <p className="text-sm text-muted-foreground">
                      احصل على إجابات لجميع استفساراتك في ثوانٍ معدودة
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-accent/10 p-2 mt-1">
                    <Sparkles className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">اقتراحات ذكية</h4>
                    <p className="text-sm text-muted-foreground">
                      توصيات مخصصة بناءً على احتياجاتك وميزانيتك
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2 mt-1">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">متاح دائماً</h4>
                    <p className="text-sm text-muted-foreground">
                      وياك معك 24/7 لمساعدتك في أي وقت
                    </p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="text-lg h-12 px-8">
                <MessageSquare className="ml-2 h-5 w-5" />
                ابدأ المحادثة مع وياك
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* التذييل */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo.png" alt="بيت الريف" className="h-10 w-auto brightness-0 invert" />
                <span className="text-lg font-bold">بيت الريف</span>
              </div>
              <p className="text-sm text-primary-foreground/80">
                منصة شاملة لخدمات البناء والتشييد والتصميم المعماري في دولة الإمارات العربية المتحدة
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">روابط سريعة</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="#services" className="hover:text-primary-foreground transition-colors">الخدمات</a></li>
                <li><a href="#providers" className="hover:text-primary-foreground transition-colors">المزودون</a></li>
                <li><a href="#about" className="hover:text-primary-foreground transition-colors">من نحن</a></li>
                <li><a href="#contact" className="hover:text-primary-foreground transition-colors">اتصل بنا</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">قانوني</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="/terms" className="hover:text-primary-foreground transition-colors">الشروط والأحكام</a></li>
                <li><a href="/privacy" className="hover:text-primary-foreground transition-colors">سياسة الخصوصية</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">تواصل معنا</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>البريد الإلكتروني: info@bietalreef.ae</li>
                <li>الهاتف: +971 XX XXX XXXX</li>
                <li>العنوان: أبوظبي، الإمارات</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
            <p>© 2025 بيت الريف - منصة البناء والتشييد الإماراتية. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>

      {/* أزرار عائمة */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
        <Button
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all"
          title="تواصل عبر الواتساب"
        >
          <Phone className="h-6 w-6" />
        </Button>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          variant="default"
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all bg-accent hover:bg-accent/90"
          title="ابدأ المحادثة مع وياك"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
