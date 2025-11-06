import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, User, CheckCircle, Briefcase, Wrench } from "lucide-react";

interface UserTypeModalProps {
  open: boolean;
  onSelect: (type: 'client' | 'provider', providerSubtype?: 'company' | 'craftsman') => void;
}

export default function UserTypeModal({ open, onSelect }: UserTypeModalProps) {
  const [selected, setSelected] = useState<'client' | 'provider' | null>(null);
  const [providerSubtype, setProviderSubtype] = useState<'company' | 'craftsman' | null>(null);

  const handleConfirm = () => {
    if (selected === 'client') {
      onSelect('client');
    } else if (selected === 'provider' && providerSubtype) {
      onSelect('provider', providerSubtype);
    }
  };

  const canContinue = selected === 'client' || (selected === 'provider' && providerSubtype);

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto" hideClose>
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">مرحباً بك في بيت الريف! 🏠</DialogTitle>
          <DialogDescription className="text-center text-lg">
            لنبدأ بتخصيص تجربتك - ما هو دورك في المنصة؟
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 py-6">
          {/* خيار العميل */}
          <Card
            className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
              selected === 'client' ? 'ring-2 ring-primary bg-primary/5' : ''
            }`}
            onClick={() => {
              setSelected('client');
              setProviderSubtype(null);
            }}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className={`p-4 rounded-full ${
                selected === 'client' ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
              }`}>
                <User className="h-12 w-12" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2">أنا عميل</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  أبحث عن خدمات، شركات، ومقاولين لمشروعي
                </p>
              </div>

              <ul className="text-sm text-right space-y-2 w-full">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>تصفح العروض والخدمات</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>طلب عروض أسعار</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>التواصل مع المقاولين</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>إدارة طلباتي ومشاريعي</span>
                </li>
              </ul>

              {selected === 'client' && (
                <div className="w-full pt-2">
                  <div className="flex items-center justify-center gap-2 text-primary font-medium">
                    <CheckCircle className="h-5 w-5" />
                    <span>تم الاختيار</span>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* خيار المزود */}
          <Card
            className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
              selected === 'provider' ? 'ring-2 ring-primary bg-primary/5' : ''
            }`}
            onClick={() => setSelected('provider')}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className={`p-4 rounded-full ${
                selected === 'provider' ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
              }`}>
                <Building2 className="h-12 w-12" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2">أنا مزود خدمة</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  أقدم خدمات البناء، التصميم، أو المقاولات
                </p>
              </div>

              <ul className="text-sm text-right space-y-2 w-full">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>عرض خدماتك ومنتجاتك</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>استقبال طلبات العملاء</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>إدارة العقود والمشاريع</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>أدوات الذكاء الاصطناعي</span>
                </li>
              </ul>

              {selected === 'provider' && (
                <div className="w-full pt-2">
                  <div className="flex items-center justify-center gap-2 text-primary font-medium">
                    <CheckCircle className="h-5 w-5" />
                    <span>تم الاختيار</span>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Provider Sub-type Selection */}
        {selected === 'provider' && (
          <div className="space-y-4 pb-4">
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-2">حدد نوع مزود الخدمة</h4>
              <p className="text-sm text-muted-foreground">اختر الفئة التي تنطبق عليك</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Company with License */}
              <Card
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  providerSubtype === 'company' ? 'ring-2 ring-primary bg-primary/5' : ''
                }`}
                onClick={() => setProviderSubtype('company')}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={`p-3 rounded-full ${
                    providerSubtype === 'company' ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                  }`}>
                    <Briefcase className="h-8 w-8" />
                  </div>
                  <div>
                    <h5 className="font-bold mb-1">شركة برخصة</h5>
                    <p className="text-xs text-muted-foreground">
                      شركة مسجلة رسمياً مع رخصة تجارية
                    </p>
                  </div>
                  {providerSubtype === 'company' && (
                    <div className="flex items-center gap-1 text-primary text-sm font-medium">
                      <CheckCircle className="h-4 w-4" />
                      <span>محدد</span>
                    </div>
                  )}
                </div>
              </Card>

              {/* Craftsman without License */}
              <Card
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  providerSubtype === 'craftsman' ? 'ring-2 ring-primary bg-primary/5' : ''
                }`}
                onClick={() => setProviderSubtype('craftsman')}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={`p-3 rounded-full ${
                    providerSubtype === 'craftsman' ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                  }`}>
                    <Wrench className="h-8 w-8" />
                  </div>
                  <div>
                    <h5 className="font-bold mb-1">حرفي / عامل ماهر</h5>
                    <p className="text-xs text-muted-foreground">
                      فرد يقدم خدمات حرفية بدون رخصة تجارية
                    </p>
                  </div>
                  {providerSubtype === 'craftsman' && (
                    <div className="flex items-center gap-1 text-primary text-sm font-medium">
                      <CheckCircle className="h-4 w-4" />
                      <span>محدد</span>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}

        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            onClick={handleConfirm}
            disabled={!canContinue}
            className="w-full md:w-auto px-12"
          >
            {canContinue ? 'متابعة' : 'اختر نوع الحساب للمتابعة'}
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          يمكنك تغيير نوع حسابك لاحقاً من الإعدادات
        </p>
      </DialogContent>
    </Dialog>
  );
}
