import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Calculator, Home, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function CostCalculator() {
  const [area, setArea] = useState("");
  const [buildingType, setBuildingType] = useState("villa");
  const [finishingLevel, setFinishingLevel] = useState("standard");
  const [floors, setFloors] = useState("1");
  const [result, setResult] = useState<number | null>(null);

  // أسعار تقريبية بالدرهم الإماراتي لكل متر مربع
  const pricePerSqm = {
    villa: {
      basic: 2500,
      standard: 3500,
      luxury: 5500,
    },
    apartment: {
      basic: 2000,
      standard: 3000,
      luxury: 4500,
    },
    commercial: {
      basic: 3000,
      standard: 4000,
      luxury: 6000,
    },
  };

  const calculateCost = () => {
    if (!area || parseFloat(area) <= 0) {
      alert("الرجاء إدخال مساحة صحيحة");
      return;
    }

    const areaNum = parseFloat(area);
    const floorsNum = parseInt(floors);
    const basePrice = pricePerSqm[buildingType as keyof typeof pricePerSqm][finishingLevel as keyof typeof pricePerSqm.villa];
    
    // حساب التكلفة الإجمالية مع مراعاة عدد الطوابق
    const totalCost = areaNum * basePrice * floorsNum;
    setResult(totalCost);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ar-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <img src="/logo.png" alt="بيت الريف" className="h-10 w-auto cursor-pointer" />
            </Link>
            <span className="text-lg font-bold">حاسبة تكلفة البناء</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard">
                <Home className="ml-2 h-4 w-4" />
                لوحة التحكم
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Calculator className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">حاسبة تكلفة البناء</h1>
          <p className="text-muted-foreground">احسب التكلفة التقريبية لمشروع البناء الخاص بك</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* نموذج الإدخال */}
          <Card>
            <CardHeader>
              <CardTitle>معلومات المشروع</CardTitle>
              <CardDescription>أدخل تفاصيل مشروعك للحصول على تقدير دقيق</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="area">المساحة الإجمالية (متر مربع)</Label>
                <Input
                  id="area"
                  type="number"
                  placeholder="مثال: 300"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="building-type">نوع المبنى</Label>
                <Select value={buildingType} onValueChange={setBuildingType}>
                  <SelectTrigger id="building-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="villa">فيلا سكنية</SelectItem>
                    <SelectItem value="apartment">شقة سكنية</SelectItem>
                    <SelectItem value="commercial">مبنى تجاري</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="finishing">مستوى التشطيب</Label>
                <Select value={finishingLevel} onValueChange={setFinishingLevel}>
                  <SelectTrigger id="finishing">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">تشطيب أساسي</SelectItem>
                    <SelectItem value="standard">تشطيب قياسي</SelectItem>
                    <SelectItem value="luxury">تشطيب فاخر</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="floors">عدد الطوابق</Label>
                <Select value={floors} onValueChange={setFloors}>
                  <SelectTrigger id="floors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">طابق واحد</SelectItem>
                    <SelectItem value="2">طابقين</SelectItem>
                    <SelectItem value="3">ثلاثة طوابق</SelectItem>
                    <SelectItem value="4">أربعة طوابق</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={calculateCost} className="w-full" size="lg">
                <Calculator className="ml-2 h-5 w-5" />
                احسب التكلفة
              </Button>
            </CardContent>
          </Card>

          {/* النتائج */}
          <div className="space-y-6">
            <Card className={result ? "border-primary" : ""}>
              <CardHeader>
                <CardTitle>التكلفة التقديرية</CardTitle>
                <CardDescription>تقدير تقريبي بناءً على المعلومات المدخلة</CardDescription>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-4">
                    <div className="text-center p-6 bg-primary/5 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">التكلفة الإجمالية التقريبية</p>
                      <p className="text-4xl font-bold text-primary">{formatCurrency(result)}</p>
                    </div>

                    <Separator />

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">المساحة:</span>
                        <span className="font-medium">{area} م²</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">عدد الطوابق:</span>
                        <span className="font-medium">{floors}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">المساحة الكلية:</span>
                        <span className="font-medium">{parseFloat(area) * parseInt(floors)} م²</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">السعر للمتر:</span>
                        <span className="font-medium">
                          {formatCurrency(pricePerSqm[buildingType as keyof typeof pricePerSqm][finishingLevel as keyof typeof pricePerSqm.villa])}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-xs text-amber-800">
                        <strong>ملاحظة:</strong> هذه تكلفة تقديرية قد تختلف حسب الموقع، المواد المستخدمة، وظروف السوق. 
                        للحصول على عرض سعر دقيق، يرجى التواصل مع أحد مقاولينا المعتمدين.
                      </p>
                    </div>

                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/craftsmen">
                        <ArrowRight className="ml-2 h-4 w-4" />
                        تواصل مع مقاول
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Calculator className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <p>أدخل معلومات مشروعك للحصول على التقدير</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">معلومات مفيدة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium mb-1">تشطيب أساسي</h4>
                  <p className="text-muted-foreground text-xs">مواد بناء قياسية، تشطيبات بسيطة</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-1">تشطيب قياسي</h4>
                  <p className="text-muted-foreground text-xs">مواد جيدة، تشطيبات متوسطة الجودة</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-1">تشطيب فاخر</h4>
                  <p className="text-muted-foreground text-xs">مواد ممتازة، تشطيبات راقية ومميزة</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
