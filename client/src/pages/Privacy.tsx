import { Link } from 'wouter';
import { ArrowRight, Shield } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-green-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-bold">🏡</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-green-900">بيت الريف</h1>
                  <p className="text-xs text-green-600">Biet Al Reef</p>
                </div>
              </a>
            </Link>
            <Link href="/">
              <a className="flex items-center gap-2 text-green-700 hover:text-green-900 transition-colors">
                <span className="text-sm font-medium">العودة للرئيسية</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-3">
            سياسة الخصوصية
          </h1>
          <p className="text-center text-green-100 max-w-2xl mx-auto">
            نحن في بيت الريف نلتزم بحماية خصوصيتك وأمان بياناتك الشخصية
          </p>
          <p className="text-center text-green-200 text-sm mt-2">
            آخر تحديث: نوفمبر 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
          
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold">1</span>
              المقدمة
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                نحن في <strong>بيت الريف</strong> نقدر خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح هذه السياسة كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك الشخصية عند استخدامك لمنصتنا.
              </p>
              <p>
                باستخدامك لمنصة بيت الريف، فإنك توافق على جمع واستخدام معلوماتك وفقاً لهذه السياسة.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold">2</span>
              المعلومات التي نجمعها
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div>
                <h3 className="font-bold text-lg text-green-800 mb-2">أ. معلومات التسجيل:</h3>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>الاسم الكامل</li>
                  <li>عنوان البريد الإلكتروني</li>
                  <li>رقم الهاتف</li>
                  <li>الموقع/المدينة</li>
                  <li>نوع الحساب (عميل/مزود)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-green-800 mb-2">ب. معلومات التوثيق (للمزودين):</h3>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>صورة الهوية الإماراتية</li>
                  <li>رخصة العمل (للشركات)</li>
                  <li>شهادات الخبرة (اختياري)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg text-green-800 mb-2">ج. معلومات الاستخدام:</h3>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>عنوان IP</li>
                  <li>نوع المتصفح والجهاز</li>
                  <li>الصفحات التي تزورها</li>
                  <li>وقت ومدة الزيارة</li>
                  <li>مصدر الإحالة</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg text-green-800 mb-2">د. معلومات المعاملات:</h3>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>تفاصيل الطلبات والعروض</li>
                  <li>الرسائل بين العملاء والمزودين</li>
                  <li>التقييمات والمراجعات</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold">3</span>
              كيف نستخدم معلوماتك
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>نستخدم المعلومات التي نجمعها للأغراض التالية:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li><strong>تقديم الخدمات:</strong> تمكينك من استخدام المنصة والتواصل مع الآخرين</li>
                <li><strong>التوثيق:</strong> التحقق من هوية المزودين لضمان الأمان</li>
                <li><strong>التحسين:</strong> تحسين تجربة المستخدم وتطوير المنصة</li>
                <li><strong>الاتصال:</strong> إرسال إشعارات مهمة وتحديثات</li>
                <li><strong>الأمان:</strong> منع الاحتيال وحماية المستخدمين</li>
                <li><strong>التحليل:</strong> فهم كيفية استخدام المنصة</li>
                <li><strong>التسويق:</strong> إرسال عروض وأخبار (يمكنك إلغاء الاشتراك)</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold">4</span>
              مشاركة المعلومات
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>نحن لا نبيع معلوماتك الشخصية. قد نشارك معلوماتك في الحالات التالية:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li><strong>مع المستخدمين الآخرين:</strong> عند التواصل أو طلب خدمة</li>
                <li><strong>مع مقدمي الخدمات:</strong> الذين يساعدوننا في تشغيل المنصة (استضافة، تحليلات، إلخ)</li>
                <li><strong>للامتثال القانوني:</strong> عند الطلب من السلطات المختصة</li>
                <li><strong>لحماية الحقوق:</strong> لحماية حقوقنا وحقوق المستخدمين</li>
                <li><strong>في حالة الاندماج:</strong> إذا تم بيع أو دمج الشركة</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold">5</span>
              حماية المعلومات
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>نتخذ إجراءات أمنية متقدمة لحماية معلوماتك:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li><strong>التشفير:</strong> استخدام SSL/TLS لتشفير البيانات أثناء النقل</li>
                <li><strong>التخزين الآمن:</strong> حفظ البيانات في خوادم آمنة</li>
                <li><strong>الوصول المحدود:</strong> فقط الموظفون المصرح لهم يمكنهم الوصول</li>
                <li><strong>المراقبة:</strong> مراقبة مستمرة للأنشطة المشبوهة</li>
                <li><strong>النسخ الاحتياطي:</strong> نسخ احتياطي منتظم للبيانات</li>
              </ul>
              <p className="mt-4 text-amber-700 bg-amber-50 p-4 rounded-lg border border-amber-200">
                <strong>ملاحظة:</strong> لا يوجد نظام أمان مثالي 100%. نبذل قصارى جهدنا لحماية بياناتك، لكن لا يمكننا ضمان الأمان المطلق.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold">6</span>
              ملفات تعريف الارتباط (Cookies)
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>نستخدم ملفات تعريف الارتباط لتحسين تجربتك:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li><strong>الضرورية:</strong> لتشغيل المنصة بشكل صحيح</li>
                <li><strong>الوظيفية:</strong> لتذكر تفضيلاتك</li>
                <li><strong>التحليلية:</strong> لفهم كيفية استخدام المنصة</li>
                <li><strong>التسويقية:</strong> لعرض إعلانات ذات صلة</li>
              </ul>
              <p className="mt-4">يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات المتصفح.</p>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold">7</span>
              حقوقك
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>لديك الحقوق التالية فيما يتعلق ببياناتك الشخصية:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li><strong>الوصول:</strong> طلب نسخة من بياناتك</li>
                <li><strong>التصحيح:</strong> تصحيح أي معلومات غير دقيقة</li>
                <li><strong>الحذف:</strong> طلب حذف بياناتك</li>
                <li><strong>التقييد:</strong> تقييد معالجة بياناتك</li>
                <li><strong>النقل:</strong> الحصول على بياناتك بصيغة قابلة للنقل</li>
                <li><strong>الاعتراض:</strong> الاعتراض على معالجة بياناتك</li>
                <li><strong>إلغاء الموافقة:</strong> سحب موافقتك في أي وقت</li>
              </ul>
              <p className="mt-4">للممارسة أي من هذه الحقوق، يرجى التواصل معنا على: bietalreef@gmail.com</p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold">8</span>
              الاحتفاظ بالبيانات
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>نحتفظ ببياناتك الشخصية طالما كان ذلك ضرورياً:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>طوال فترة نشاط حسابك</li>
                <li>للامتثال للالتزامات القانونية</li>
                <li>لحل النزاعات</li>
                <li>لإنفاذ اتفاقياتنا</li>
              </ul>
              <p className="mt-4">عند حذف حسابك، سنحذف أو نجعل بياناتك مجهولة المصدر، باستثناء ما يتطلبه القانون.</p>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold">9</span>
              خصوصية الأطفال
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                منصتنا غير موجهة للأطفال دون سن 18 عاماً. نحن لا نجمع عن قصد معلومات شخصية من الأطفال. إذا علمنا أننا جمعنا معلومات من طفل، سنحذفها فوراً.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold">10</span>
              الروابط الخارجية
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                قد تحتوي منصتنا على روابط لمواقع خارجية. نحن لسنا مسؤولين عن ممارسات الخصوصية لهذه المواقع. ننصحك بقراءة سياسات الخصوصية الخاصة بها.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold">11</span>
              التعديلات على السياسة
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>قد نقوم بتحديث سياسة الخصوصية من وقت لآخر:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>سنخطرك بأي تغييرات جوهرية</li>
                <li>سنعرض تاريخ آخر تحديث في أعلى الصفحة</li>
                <li>استمرارك في استخدام المنصة يعني قبولك للتعديلات</li>
              </ul>
            </div>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold">12</span>
              نقل البيانات الدولي
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                قد يتم نقل بياناتك ومعالجتها في دول أخرى. نتخذ الإجراءات المناسبة لضمان حماية بياناتك وفقاً لهذه السياسة والقوانين المعمول بها.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
            <h2 className="text-2xl font-bold text-green-900 mb-4">تواصل معنا</h2>
            <div className="space-y-2 text-gray-700">
              <p>إذا كان لديك أي استفسار حول سياسة الخصوصية أو ترغب في ممارسة حقوقك:</p>
              <div className="space-y-1 mt-4">
                <p><strong>البريد الإلكتروني:</strong> <a href="mailto:bietalreef@gmail.com" className="text-green-600 hover:text-green-700">bietalreef@gmail.com</a></p>
                <p><strong>الموقع:</strong> <a href="https://bietalreef.ae" className="text-green-600 hover:text-green-700">bietalreef.ae</a></p>
              </div>
            </div>
          </section>

        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-8">
          <Link href="/">
            <a className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition-colors shadow-lg">
              <ArrowRight className="w-5 h-5" />
              <span className="font-medium">العودة للرئيسية</span>
            </a>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-green-200">© 2025 بيت الريف. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}
