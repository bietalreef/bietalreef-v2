import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Wrench, Home, Check } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

interface Material {
  id: string;
  name: string;
  category: string;
  price: string;
  quality: "basic" | "standard" | "premium";
  description: string;
  features: string[];
}

const materials: Material[] = [
  // أرضيات
  {
    id: "floor-1",
    name: "بلاط سيراميك",
    category: "flooring",
    price: "50-80 درهم/م²",
    quality: "basic",
    description: "بلاط سيراميك عالي الجودة مناسب لجميع الغرف",
    features: ["سهل التنظيف", "مقاوم للماء", "متين"],
  },
  {
    id: "floor-2",
    name: "بورسلان",
    category: "flooring",
    price: "100-150 درهم/م²",
    quality: "standard",
    description: "بلاط بورسلان فاخر بتصاميم عصرية",
    features: ["مقاوم للخدش", "عمر افتراضي طويل", "تصاميم متنوعة"],
  },
  {
    id: "floor-3",
    name: "رخام طبيعي",
    category: "flooring",
    price: "300-500 درهم/م²",
    quality: "premium",
    description: "رخام طبيعي فاخر من أفضل المحاجر",
    features: ["فخامة عالية", "قيمة استثمارية", "تصميم فريد"],
  },
  // دهانات
  {
    id: "paint-1",
    name: "دهان اقتصادي",
    category: "paint",
    price: "15-25 درهم/م²",
    quality: "basic",
    description: "دهان بلاستيك عالي الجودة للجدران الداخلية",
    features: ["سهل التطبيق", "ألوان متنوعة", "سعر مناسب"],
  },
  {
    id: "paint-2",
    name: "دهان مقاوم للرطوبة",
    category: "paint",
    price: "35-50 درهم/م²",
    quality: "standard",
    description: "دهان خاص مقاوم للرطوبة والعفن",
    features: ["مقاوم للرطوبة", "قابل للغسل", "عمر افتراضي طويل"],
  },
  {
    id: "paint-3",
    name: "دهان فاخر مضاد للبكتيريا",
    category: "paint",
    price: "70-100 درهم/م²",
    quality: "premium",
    description: "دهان فاخر بتقنية مضادة للبكتيريا",
    features: ["مضاد للبكتيريا", "صديق للبيئة", "جودة عالمية"],
  },
  // أبواب ونوافذ
  {
    id: "door-1",
    name: "أبواب خشب MDF",
    category: "doors",
    price: "400-600 درهم/باب",
    quality: "basic",
    description: "أبواب خشب MDF بتشطيب جيد",
    features: ["خفيف الوزن", "سهل التركيب", "تصاميم متنوعة"],
  },
  {
    id: "door-2",
    name: "أبواب خشب صلب",
    category: "doors",
    price: "1000-1500 درهم/باب",
    quality: "standard",
    description: "أبواب خشب صلب طبيعي عالي الجودة",
    features: ["متين جداً", "عازل للصوت", "مظهر فاخر"],
  },
  {
    id: "door-3",
    name: "أبواب أمنية ذكية",
    category: "doors",
    price: "3000-5000 درهم/باب",
    quality: "premium",
    description: "أبواب أمنية بتقنية ذكية وبصمة",
    features: ["أمان عالي", "تقنية ذكية", "ضمان طويل"],
  },
];

export default function MaterialSelector() {
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [qualityFilter, setQualityFilter] = useState<string>("all");

  const toggleMaterial = (id: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const filteredMaterials = materials.filter(
    (m) => qualityFilter === "all" || m.quality === qualityFilter
  );

  const getQualityBadge = (quality: string) => {
    const badges = {
      basic: { label: "أساسي", variant: "secondary" as const },
      standard: { label: "قياسي", variant: "default" as const },
      premium: { label: "فاخر", variant: "destructive" as const },
    };
    return badges[quality as keyof typeof badges] || badges.basic;
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
            <span className="text-lg font-bold">اختيار المواد والتشطيبات</span>
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

      <div className="container py-8 max-w-7xl">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Wrench className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">اختيار المواد والتشطيبات</h1>
          <p className="text-muted-foreground">اختر أفضل المواد لمشروعك حسب ميزانيتك واحتياجاتك</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* الفلاتر */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">الفلاتر</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">مستوى الجودة</h4>
                <div className="space-y-2">
                  <Button
                    variant={qualityFilter === "all" ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setQualityFilter("all")}
                  >
                    الكل
                  </Button>
                  <Button
                    variant={qualityFilter === "basic" ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setQualityFilter("basic")}
                  >
                    أساسي
                  </Button>
                  <Button
                    variant={qualityFilter === "standard" ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setQualityFilter("standard")}
                  >
                    قياسي
                  </Button>
                  <Button
                    variant={qualityFilter === "premium" ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setQualityFilter("premium")}
                  >
                    فاخر
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="text-sm font-medium">المواد المختارة</h4>
                <div className="bg-primary/5 rounded-lg p-3 text-center">
                  <p className="text-3xl font-bold text-primary">{selectedMaterials.length}</p>
                  <p className="text-xs text-muted-foreground">مادة مختارة</p>
                </div>
              </div>

              {selectedMaterials.length > 0 && (
                <>
                  <Separator />
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setSelectedMaterials([])}
                  >
                    مسح الاختيارات
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* قائمة المواد */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="flooring" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="flooring">الأرضيات</TabsTrigger>
                <TabsTrigger value="paint">الدهانات</TabsTrigger>
                <TabsTrigger value="doors">الأبواب والنوافذ</TabsTrigger>
              </TabsList>

              <TabsContent value="flooring">
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredMaterials
                    .filter((m) => m.category === "flooring")
                    .map((material) => (
                      <MaterialCard
                        key={material.id}
                        material={material}
                        isSelected={selectedMaterials.includes(material.id)}
                        onToggle={() => toggleMaterial(material.id)}
                        getQualityBadge={getQualityBadge}
                      />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="paint">
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredMaterials
                    .filter((m) => m.category === "paint")
                    .map((material) => (
                      <MaterialCard
                        key={material.id}
                        material={material}
                        isSelected={selectedMaterials.includes(material.id)}
                        onToggle={() => toggleMaterial(material.id)}
                        getQualityBadge={getQualityBadge}
                      />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="doors">
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredMaterials
                    .filter((m) => m.category === "doors")
                    .map((material) => (
                      <MaterialCard
                        key={material.id}
                        material={material}
                        isSelected={selectedMaterials.includes(material.id)}
                        onToggle={() => toggleMaterial(material.id)}
                        getQualityBadge={getQualityBadge}
                      />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MaterialCardProps {
  material: Material;
  isSelected: boolean;
  onToggle: () => void;
  getQualityBadge: (quality: string) => { label: string; variant: any };
}

function MaterialCard({ material, isSelected, onToggle, getQualityBadge }: MaterialCardProps) {
  const badge = getQualityBadge(material.quality);

  return (
    <Card className={`cursor-pointer transition-all ${isSelected ? "border-primary border-2" : ""}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{material.name}</CardTitle>
            <Badge variant={badge.variant}>{badge.label}</Badge>
          </div>
          {isSelected && (
            <div className="bg-primary text-primary-foreground rounded-full p-1">
              <Check className="h-4 w-4" />
            </div>
          )}
        </div>
        <CardDescription className="mt-2">{material.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">السعر التقريبي</span>
            <span className="font-bold text-primary">{material.price}</span>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="text-sm font-medium">المميزات:</h4>
            <ul className="space-y-1">
              {material.features.map((feature, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                  <Check className="h-3 w-3 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <Button
            variant={isSelected ? "default" : "outline"}
            className="w-full"
            onClick={onToggle}
          >
            {isSelected ? "تم الاختيار" : "اختر هذه المادة"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
