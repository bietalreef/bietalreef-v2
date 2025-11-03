import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, MapPin, Bed, Bath, Maximize, Search, Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  type: "sale" | "rent";
  category: "villa" | "apartment" | "land";
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  featured: boolean;
}

const properties: Property[] = [
  {
    id: "1",
    title: "فيلا فاخرة في المنطقة الخامسة",
    location: "العين - المنطقة الخامسة",
    price: "2,500,000",
    type: "sale",
    category: "villa",
    bedrooms: 5,
    bathrooms: 6,
    area: 450,
    image: "/placeholder-villa.jpg",
    featured: true,
  },
  {
    id: "2",
    title: "شقة عصرية في وسط المدينة",
    location: "العين - المركز",
    price: "850,000",
    type: "sale",
    category: "apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    image: "/placeholder-apartment.jpg",
    featured: false,
  },
  {
    id: "3",
    title: "أرض سكنية في موقع مميز",
    location: "العين - الجاهلي",
    price: "1,200,000",
    type: "sale",
    category: "land",
    bedrooms: 0,
    bathrooms: 0,
    area: 600,
    image: "/placeholder-land.jpg",
    featured: true,
  },
  {
    id: "4",
    title: "فيلا للإيجار السنوي",
    location: "العين - الطوية",
    price: "120,000",
    type: "rent",
    category: "villa",
    bedrooms: 4,
    bathrooms: 4,
    area: 350,
    image: "/placeholder-villa-2.jpg",
    featured: false,
  },
];

export default function Properties() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || property.type === typeFilter;
    const matchesCategory = categoryFilter === "all" || property.category === categoryFilter;
    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <img src="/logo.png" alt="بيت الريف" className="h-10 w-auto cursor-pointer" />
            </Link>
            <span className="text-lg font-bold">العقارات</span>
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

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">تصفح العقارات</h1>
          <p className="text-muted-foreground">اكتشف أفضل العقارات في مدينة العين</p>
        </div>

        {/* البحث والفلاتر */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="ابحث عن عقار..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div>
              </div>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="نوع العرض" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  <SelectItem value="sale">للبيع</SelectItem>
                  <SelectItem value="rent">للإيجار</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="نوع العقار" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع العقارات</SelectItem>
                  <SelectItem value="villa">فيلا</SelectItem>
                  <SelectItem value="apartment">شقة</SelectItem>
                  <SelectItem value="land">أرض</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* قائمة العقارات */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Home className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" />
              <h3 className="text-lg font-medium mb-2">لا توجد نتائج</h3>
              <p className="text-muted-foreground">جرب تغيير معايير البحث</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

interface PropertyCardProps {
  property: Property;
}

function PropertyCard({ property }: PropertyCardProps) {
  const getCategoryLabel = (category: string) => {
    const labels = {
      villa: "فيلا",
      apartment: "شقة",
      land: "أرض",
    };
    return labels[category as keyof typeof labels] || category;
  };

  const getTypeLabel = (type: string) => {
    return type === "sale" ? "للبيع" : "للإيجار";
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <div className="aspect-video bg-muted flex items-center justify-center">
          <Home className="h-16 w-16 text-muted-foreground opacity-20" />
        </div>
        {property.featured && (
          <Badge className="absolute top-3 right-3" variant="destructive">
            مميز
          </Badge>
        )}
        <Badge className="absolute top-3 left-3">
          {getTypeLabel(property.type)}
        </Badge>
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-3 right-3 bg-white/90 hover:bg-white"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-2">{property.title}</CardTitle>
          <Badge variant="outline">{getCategoryLabel(property.category)}</Badge>
        </div>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {property.location}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            {property.category !== "land" && (
              <>
                <div className="flex items-center gap-1">
                  <Bed className="h-4 w-4 text-muted-foreground" />
                  <span>{property.bedrooms} غرف</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="h-4 w-4 text-muted-foreground" />
                  <span>{property.bathrooms} حمام</span>
                </div>
              </>
            )}
            <div className="flex items-center gap-1">
              <Maximize className="h-4 w-4 text-muted-foreground" />
              <span>{property.area} م²</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-primary">
                {property.price}
                <span className="text-sm font-normal text-muted-foreground"> درهم</span>
              </p>
              {property.type === "rent" && (
                <p className="text-xs text-muted-foreground">سنوياً</p>
              )}
            </div>
            <Button size="sm">التفاصيل</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
