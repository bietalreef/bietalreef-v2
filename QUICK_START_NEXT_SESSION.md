# 🚀 دليل البدء السريع - الجلسة القادمة

## 📋 ابدأ بهذا الأمر:
```
أكمل تطوير منصة بيت الريف من حيث توقفنا. راجع ملف SESSION_PROGRESS_REPORT.md
```

---

## ✅ الأولويات (بالترتيب)

### 1. إصلاح البنية التحتية (15 دقيقة)
```bash
# إنشاء جدول profiles في Supabase
# انتقل إلى: https://supabase.com/dashboard/project/pczhhuzpspruiubxxhys/editor
```

**SQL المطلوب**:
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  user_type TEXT CHECK (user_type IN ('client', 'provider')),
  phone TEXT,
  location TEXT,
  verification_status TEXT DEFAULT 'unverified',
  is_verified BOOLEAN DEFAULT FALSE,
  business_license_url TEXT,
  id_photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

---

### 2. إصلاح صفحة /home (15 دقيقة)
**المشكلة**: الصفحة تظهر فارغة بعد تسجيل الدخول

**الملف**: `/home/ubuntu/bietalreef-v2/client/src/pages/HomeUser.tsx`

**الحل**:
- تحقق من أن المكونات تُرجع JSX صحيح
- أضف console.log للتحقق من البيانات
- تأكد من أن Routing يعمل بشكل صحيح

---

### 3. تحويل homepage.html (60 دقيقة)
**الملف المصدر**: `/home/ubuntu/package_extracted/homepage.html` (217 KB)

**المطلوب**:
1. قراءة وتحليل الملف
2. إنشاء مكونين:
   - `HomeClient.tsx` - للعملاء (عروض، شركات، خدمات)
   - `HomeProvider.tsx` - للمزودين (عملاء محتملين، طلبات، أدوات AI)
3. ربطهما بـ `user_type` من profiles

**الأقسام الرئيسية**:
- Hero Section
- عروض خاصة
- الشركات المميزة
- الخدمات
- أدوات AI (للمزودين فقط)

---

### 4. تحويل dashboard.html (60 دقيقة)
**الملف المصدر**: `/home/ubuntu/package_extracted/dashboard.html` (217 KB)

**المطلوب**:
1. قراءة وتحليل الملف
2. إنشاء مكونين:
   - `DashboardClient.tsx` - للعملاء
   - `DashboardProvider.tsx` - للمزودين
3. إضافة جميع الأقسام

**الأقسام للعملاء**:
- طلباتي
- سلتي
- رسائلي
- الإعدادات

**الأقسام للمزودين**:
- طلبات العروض (RFQs)
- العقود
- لوحة المزود
- أدوات AI
- الإعدادات

---

### 5. نظام التوثيق (30 دقيقة)
**المطلوب**:
1. إنشاء Supabase Storage bucket للمستندات
2. رفع الهوية والرخصة
3. عرض حالة التوثيق في Dashboard
4. Banner للمستخدمين غير الموثقين

**الملف**: `/home/ubuntu/bietalreef-v2/client/src/components/VerificationModal.tsx`

---

## 📁 الملفات المهمة

### المشروع الرئيسي:
```
/home/ubuntu/bietalreef-v2/
├── client/src/
│   ├── pages/
│   │   ├── AuthCallback.tsx ✅ (محدّث)
│   │   ├── HomeUser.tsx ⚠️ (يحتاج إصلاح)
│   │   └── Dashboard.tsx ⚠️ (يحتاج تحديث)
│   └── components/
│       ├── UserTypeModal.tsx ✅
│       └── VerificationModal.tsx ✅
└── SESSION_PROGRESS_REPORT.md ✅
```

### الملفات المصدر:
```
/home/ubuntu/package_extracted/
├── homepage.html (217 KB) ⭐ أهم ملف
├── dashboard.html (217 KB) ⭐ أهم ملف
├── styles.css (15 KB)
└── styles-dashboard.css (108 KB)
```

---

## 🔧 الأوامر السريعة

### التنقل:
```bash
cd /home/ubuntu/bietalreef-v2
```

### Git:
```bash
git status
git add -A
git commit -m "Your message"
git push origin master
```

### قراءة الملفات:
```bash
# قراءة homepage.html
cat /home/ubuntu/package_extracted/homepage.html

# قراءة dashboard.html
cat /home/ubuntu/package_extracted/dashboard.html
```

---

## 🎯 الهدف النهائي

**واجهتان مختلفتان تماماً**:

### للعملاء:
- `/home` - عروض، شركات، خدمات
- `/dashboard` - طلباتي، سلتي، رسائلي

### للمزودين:
- `/home` - عملاء محتملين، طلبات، أدوات AI
- `/dashboard` - طلبات العروض، العقود، لوحة المزود، أدوات AI

**الفرق بين الموثق وغير الموثق**:
- غير موثق: ميزات محدودة + banner "وثق حسابك"
- موثق: جميع الميزات المتقدمة

---

## 📊 الإحصائيات الحالية

- **الإنجاز**: 60%
- **الرصيد المستخدم**: 79,487 tokens (39.7%)
- **المتبقي**: 120,513 tokens
- **المقدر للإكمال**: ~80,000 tokens

---

## ⚠️ ملاحظات مهمة

1. **Landing Page** (`/`) يجب أن تبقى متاحة للجميع
2. **اختيار النوع** إلزامي بعد تسجيل الدخول
3. **التوثيق** اختياري (يمكن التخطي)
4. **الألوان**: #2D5016 (primary), #EAF0E7 (light)
5. **RTL Support**: جميع الصفحات بالعربية

---

## 🚀 ابدأ الآن!

```
أكمل تطوير منصة بيت الريف من حيث توقفنا. راجع ملف SESSION_PROGRESS_REPORT.md
```

---

**آخر تحديث**: 6 نوفمبر 2025  
**الحالة**: جاهز للجلسة القادمة ✅
