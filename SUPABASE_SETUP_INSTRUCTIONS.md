# تعليمات إعداد قاعدة بيانات Supabase

## الخطوة 1: تنفيذ SQL

1. افتح [Supabase Dashboard](https://supabase.com/dashboard)
2. اختر مشروعك: **pczhhuzpspruiubxxhys**
3. انتقل إلى: **SQL Editor**
4. انسخ محتوى ملف `supabase_setup.sql` بالكامل
5. الصق المحتوى في SQL Editor
6. اضغط على **Run** لتنفيذ الأوامر

## الخطوة 2: إنشاء Storage Bucket

1. في Supabase Dashboard، انتقل إلى: **Storage**
2. اضغط على **Create Bucket**
3. أدخل الاسم: `verification-documents`
4. اختر **Public bucket** (لا)
5. اضغط على **Create Bucket**

## الخطوة 3: إعداد Storage Policies

بعد إنشاء الـ bucket، قم بإضافة السياسات التالية:

### سياسة 1: السماح للمستخدمين برفع ملفاتهم

```sql
CREATE POLICY "Users can upload own documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'verification-documents' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);
```

### سياسة 2: السماح للمستخدمين بقراءة ملفاتهم

```sql
CREATE POLICY "Users can read own documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'verification-documents' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);
```

### سياسة 3: السماح للمستخدمين بحذف ملفاتهم

```sql
CREATE POLICY "Users can delete own documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'verification-documents' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);
```

## الخطوة 4: التحقق من الإعداد

قم بتشغيل الاستعلام التالي للتحقق من أن الجدول تم إنشاؤه بنجاح:

```sql
SELECT * FROM profiles LIMIT 10;
```

## الخطوة 5: اختبار التطبيق

1. قم بتشغيل التطبيق محلياً: `pnpm run dev`
2. سجل دخول مستخدم جديد
3. تحقق من أن profile تم إنشاؤه تلقائياً
4. اختر نوع المستخدم (عميل/مزود)
5. جرب رفع مستندات التوثيق

## ملاحظات مهمة

- ✅ جدول profiles يتم إنشاؤه تلقائياً عند تسجيل مستخدم جديد
- ✅ RLS مفعل لحماية البيانات
- ✅ المستخدمون يمكنهم قراءة وتعديل ملفاتهم الشخصية فقط
- ✅ الملفات الشخصية للمزودين الموثقين متاحة للجميع للقراءة
- ⚠️ تأكد من إعداد متغيرات البيئة في `.env`:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

## معلومات المشروع

- **Supabase Project ID**: pczhhuzpspruiubxxhys
- **Project Name**: bietalreef-v2
- **Database**: PostgreSQL
- **Storage Bucket**: verification-documents

---

**تم إنشاء هذا الملف تلقائياً بواسطة Manus AI**
