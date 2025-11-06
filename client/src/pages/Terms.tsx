import { Link } from 'wouter';
import { ArrowRight, FileText } from 'lucide-react';

export default function Terms() {
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
            <FileText className="w-12 h-12" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-3">
            الشروط والأحكام
          </h1>
          <p className="text-center text-green-100 max-w-2xl mx-auto">
            يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام منصة بيت الريف
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
              التعريفات
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>في هذه الشروط والأحكام:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li><strong>"المنصة"</strong> تعني منصة بيت الريف الإلكترونية المتاحة على bietalreef.ae</li>
                <li><strong>"المستخدم"</strong> يشمل العملاء ومزودي الخدمات المسجلين على المنصة</li>
                <li><strong>"الخدمات"</strong> تعني جميع الخدمات المتاحة عبر المنصة</li>
                <li><strong>"العميل"</strong> هو الشخص الذي يبحث عن خدمات البناء والتشييد</li>
                <li><strong>"المزود"</strong> هو الشركة أو الحرفي الذي يقدم الخدمات</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold">2</span>
              قبول الشروط
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>باستخدامك لمنصة بيت الريف، فإنك توافق على:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>الالتزام بجميع الشروط والأحكام المذكورة</li>
                <li>الالتزام بسياسة الخصوصية الخاصة بالمنصة</li>
                <li>تقديم معلومات صحيحة ودقيقة عند التسجيل</li>
                <li>عدم استخدام المنصة لأي أغراض غير قانونية</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold">3</span>
              التسجيل والحساب
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p><strong>شروط التسجيل:</strong></p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>يجب أن يكون عمرك 18 عاماً على الأقل</li>
                <li>تقديم معلومات صحيحة وكاملة</li>
                <li>الحفاظ على سرية بيانات الدخول</li>
                <li>إخطارنا فوراً بأي استخدام غير مصرح به</li>
              </ul>
              <p className="mt-4"><strong>للمزودين (الشركات):</strong></p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>تقديم رخصة تجارية سارية المفعول</li>
                <li>إثبات الهوية الإماراتية</li>
                <li>تقديم مستندات التأمين إن وجدت</li>
              </ul>
              <p className="mt-4"><strong>للمزودين (الحرفيين):</strong></p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>تقديم إثبات الهوية الإماراتية</li>
                <li>تقديم شهادات الخبرة إن وجدت</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold">4</span>
              استخدام المنصة
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p><strong>يحق لك:</strong></p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>تصفح الخدمات المتاحة</li>
                <li>التواصل مع المزودين</li>
                <li>طلب عروض الأسعار</li>
                <li>تقييم الخدمات المستلمة</li>
              </ul>
              <p className="mt-4"><strong>يُمنع عليك:</strong></p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>نشر محتوى مسيء أو غير لائق</li>
                <li>انتحال شخصية الآخرين</li>
                <li>محاولة اختراق المنصة أو تعطيلها</li>
                <li>استخدام المنصة لأغراض احتيالية</li>
                <li>نسخ أو إعادة نشر محتوى المنصة بدون إذن</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold">5</span>
              الرسوم والدفع
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>بيت الريف منصة وساطة تربط بين العملاء والمزودين:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>التسجيل واستخدام المنصة مجاني للعملاء</li>
                <li>قد تُطبق رسوم على المزودين عند إتمام الصفقات</li>
                <li>جميع المعاملات المالية تتم بين العميل والمزود مباشرة</li>
                <li>بيت الريف غير مسؤولة عن المعاملات المالية بين الأطراف</li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold">6</span>
              المسؤولية
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p><strong>بيت الريف منصة وساطة فقط:</strong></p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>لا نضمن جودة الخدمات المقدمة من المزودين</li>
                <li>لا نتحمل مسؤولية أي نزاعات بين العملاء والمزودين</li>
                <li>لا نتحمل مسؤولية أي أضرار ناتجة عن استخدام الخدمات</li>
                <li>ننصح بالتحقق من مؤهلات المزودين قبل التعاقد</li>
              </ul>
              <p className="mt-4"><strong>مسؤولية المستخدم:</strong></p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>التحقق من مصداقية الطرف الآخر</li>
                <li>قراءة العقود بعناية قبل التوقيع</li>
                <li>الإبلاغ عن أي سلوك مشبوه</li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold">7</span>
              الملكية الفكرية
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>جميع حقوق الملكية الفكرية للمنصة محفوظة لبيت الريف:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>الشعار والعلامة التجارية</li>
                <li>التصميم والواجهة</li>
                <li>المحتوى والنصوص</li>
                <li>الصور والرسومات</li>
              </ul>
              <p className="mt-4">يُمنع نسخ أو استخدام أي محتوى بدون إذن كتابي مسبق.</p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold">8</span>
              إنهاء الحساب
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p><strong>يحق لك:</strong></p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>إلغاء حسابك في أي وقت</li>
                <li>طلب حذف بياناتك الشخصية</li>
              </ul>
              <p className="mt-4"><strong>يحق لنا:</strong></p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>تعليق أو إنهاء حسابك في حالة مخالفة الشروط</li>
                <li>إزالة أي محتوى مخالف</li>
                <li>رفض تقديم الخدمة لأي شخص</li>
              </ul>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold">9</span>
              التعديلات
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>سيتم إخطارك بأي تعديلات جوهرية</li>
                <li>استمرارك في استخدام المنصة يعني قبولك للتعديلات</li>
                <li>يُنصح بمراجعة الشروط بشكل دوري</li>
              </ul>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold">10</span>
              القانون الحاكم
            </h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>تخضع هذه الشروط والأحكام لقوانين دولة الإمارات العربية المتحدة:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>تُحل أي نزاعات ودياً أولاً</li>
                <li>في حالة عدم التوصل لحل، تُحال النزاعات للمحاكم المختصة في الإمارات</li>
              </ul>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
            <h2 className="text-2xl font-bold text-green-900 mb-4">تواصل معنا</h2>
            <div className="space-y-2 text-gray-700">
              <p>إذا كان لديك أي استفسار حول هذه الشروط والأحكام:</p>
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
