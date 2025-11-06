import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Upload, Phone, MapPin, FileText, X } from "lucide-react";

interface VerificationModalProps {
  open: boolean;
  userType: 'client' | 'provider';
  onSkip: () => void;
  onSubmit: (data: VerificationData) => void;
}

export interface VerificationData {
  phone: string;
  location: string;
  idDocument?: File;
  businessLicense?: File;
}

export default function VerificationModal({ open, userType, onSkip, onSubmit }: VerificationModalProps) {
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [businessLicense, setBusinessLicense] = useState<File | null>(null);

  const handleSubmit = () => {
    const data: VerificationData = {
      phone,
      location,
      idDocument: idDocument || undefined,
      businessLicense: businessLicense || undefined,
    };
    onSubmit(data);
  };

  const isProvider = userType === 'provider';

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-xl">
        <button
          onClick={onSkip}
          className="absolute left-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">إغلاق</span>
        </button>

        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-2xl text-center">توثيق الحساب</DialogTitle>
          <DialogDescription className="text-center">
            {isProvider
              ? "وثق حسابك الآن لتظهر في نتائج البحث وتستقبل طلبات العملاء"
              : "وثق حسابك للحصول على ميزات إضافية وزيادة الثقة"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* رقم الهاتف */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              رقم الهاتف
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+971 50 123 4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              dir="ltr"
            />
          </div>

          {/* الموقع */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              الموقع / المدينة
            </Label>
            <Input
              id="location"
              type="text"
              placeholder="دبي، أبوظبي، الشارقة..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* صورة الهوية */}
          <div className="space-y-2">
            <Label htmlFor="id-document" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              صورة الهوية الإماراتية
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="id-document"
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setIdDocument(e.target.files?.[0] || null)}
                className="flex-1"
              />
              {idDocument && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIdDocument(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              صورة واضحة للهوية الإماراتية (JPG, PNG, PDF)
            </p>
          </div>

          {/* رخصة العمل (للمزودين فقط) */}
          {isProvider && (
            <div className="space-y-2">
              <Label htmlFor="business-license" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                رخصة العمل / السجل التجاري
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="business-license"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setBusinessLicense(e.target.files?.[0] || null)}
                  className="flex-1"
                />
                {businessLicense && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setBusinessLicense(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                رخصة تجارية سارية المفعول (JPG, PNG, PDF)
              </p>
            </div>
          )}

          {/* ملاحظة */}
          <div className="bg-primary/5 p-4 rounded-lg">
            <p className="text-sm text-center">
              <Shield className="h-4 w-4 inline ml-1" />
              معلوماتك آمنة ومشفرة. سيتم مراجعتها خلال 24-48 ساعة
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={onSkip}
            className="flex-1"
          >
            سأوثق لاحقاً
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!phone || !location}
            className="flex-1"
          >
            إرسال طلب التوثيق
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          يمكنك توثيق حسابك لاحقاً من الإعدادات
        </p>
      </DialogContent>
    </Dialog>
  );
}
