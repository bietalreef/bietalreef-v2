import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useProfile } from "@/hooks/useProfile";
import { Shield, Upload, Phone, MapPin, FileText, X, Loader2, AlertCircle, CheckCircle } from "lucide-react";

interface VerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
}

export default function VerificationModal({ open, onOpenChange, onComplete }: VerificationModalProps) {
  const { profile, uploadVerificationDocument, updateProfile } = useProfile();
  const [phone, setPhone] = useState(profile?.phone || "");
  const [location, setLocation] = useState(profile?.location || "");
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [businessLicense, setBusinessLicense] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const isProvider = profile?.user_type === 'provider';

  const handleSubmit = async () => {
    setError(null);
    setUploading(true);

    try {
      // Update phone and location
      await updateProfile({ phone, location });

      // Upload ID document if provided
      if (idDocument) {
        await uploadVerificationDocument(idDocument, 'id_photo');
      }

      // Upload business license if provided (for providers)
      if (businessLicense && isProvider) {
        await uploadVerificationDocument(businessLicense, 'business_license');
      }

      setSuccess(true);
      setTimeout(() => {
        onComplete?.();
        onOpenChange(false);
      }, 2000);
    } catch (err) {
      console.error("Error submitting verification:", err);
      setError("حدث خطأ أثناء إرسال البيانات. يرجى المحاولة مرة أخرى.");
    } finally {
      setUploading(false);
    }
  };

  const handleSkip = () => {
    onOpenChange(false);
    onComplete?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl" dir="rtl">
        <button
          onClick={handleSkip}
          className="absolute left-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          disabled={uploading}
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

        {success ? (
          <div className="py-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">تم الإرسال بنجاح!</h3>
            <p className="text-gray-600">
              سيتم مراجعة مستنداتك خلال 24-48 ساعة
            </p>
          </div>
        ) : (
          <>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

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
                onClick={handleSkip}
                className="flex-1"
                disabled={uploading}
              >
                سأوثق لاحقاً
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!phone || !location || uploading}
                className="flex-1"
              >
                {uploading ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    جارٍ الإرسال...
                  </>
                ) : (
                  "إرسال طلب التوثيق"
                )}
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              يمكنك توثيق حسابك لاحقاً من الإعدادات
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
