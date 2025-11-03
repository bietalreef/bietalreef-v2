import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Hammer, Home, Search, Star, MapPin, Phone, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

interface Craftsman {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  experience: number;
  verified: boolean;
  phone: string;
  description: string;
}

const craftsmen: Craftsman[] = [
  {
    id: "1",
    name: "محمد أحمد البلوشي",
    specialty: "مقاول عام",
    location: "العين",
    rating: 4.8,
    reviews: 45,
    experience: 15,
    verified: true,
    phone: "+971 50 123 4567",
    description: "مقاول معتمد متخصص في بناء الفلل والمباني السكنية",
  },
  {
    id: "2",
    name: "عبدالله سالم الكعبي",
    specialty: "نجار",
    location: "العين",
    rating: 4.9,
    reviews: 62,
    experience: 12,
    verified: true,
    phone: "+971 50 234 5678",
    description: "نجار محترف متخصص في الأبواب والنوافذ والديكورات الخشبية",
  },
  {
    id: "3",
    name: "خالد حسن المنصوري",
    specialty: "كهربائي",
    location: "العين",
    rating: 4.7,
    reviews: 38,
    experience: 10,
    verified: true,
    phone: "+971 50 345 6789",
    description: "كهربائي معتمد لجميع أعمال الكهرباء السكنية والتجارية",
  },
  {
    id: "4",
    name: "سعيد علي الظاهري",
    specialty: "سباك",
    location: "العين",
    rating: 4.6,
    reviews: 29,
    experience: 8,
    verified: true,
    phone: "+971 50 456 7890",
    description: "سباك محترف لجميع أعمال السباكة والصرف الصحي",
  },
  {
    id: "5",
    name: "أحمد راشد النعيمي",
    specialty: "دهان",
    location: "العين",
    rating: 4.8,
    reviews: 51,
    experience: 14,
    verified: true,
    phone: "+971 50 567 8901",
    description: "دهان محترف متخصص في جميع أنواع الدهانات الداخلية والخارجية",
  },
  {
    id: "6",
    name: "يوسف محمد الشامسي",
    specialty: "بلاط وسيراميك",
    location: "العين",
    rating: 4.9,
    reviews: 44,
    experience: 11,
    verified: true,
    phone: "+971 50 678 9012",
    description: "متخصص في تركيب البلاط والسيراميك والرخام بأعلى جودة",
  },
];

const specialties = [
  "مقاول عام",
  "نجار",
  "كهربائي",
  "سباك",
  "دهان",
  "بلاط وسيراميك",
  "حداد",
  "ديكور",
];

export default function Craftsmen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState<string>("all");

  const filteredCraftsmen = craftsmen.filter((craftsman) => {
    const matchesSearch = craftsman.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         craftsman.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialtyFilter === "all" || craftsman.specialty === specialtyFilter;
    return matchesSearch && matchesSpecialty;
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
            <span className="text-lg font-bold">الحرفيون والمقاولون</span>
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
          <h1 className="text-3xl font-bold mb-2">الحرفيون والمقاولون المعتمدون</h1>
          <p className="text-muted-foreground">تواصل مع أفضل الحرفيين والمقاولين في مدينة العين</p>
        </div>

        {/* البحث والفلاتر */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="ابحث عن حرفي أو مقاول..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div>
              </div>

              <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="التخصص" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع التخصصات</SelectItem>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* قائمة الحرفيين */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCraftsmen.map((craftsman) => (
            <CraftsmanCard key={craftsman.id} craftsman={craftsman} />
          ))}
        </div>

        {filteredCraftsmen.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Hammer className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" />
              <h3 className="text-lg font-medium mb-2">لا توجد نتائج</h3>
              <p className="text-muted-foreground">جرب تغيير معايير البحث</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

interface CraftsmanCardProps {
  craftsman: Craftsman;
}

function CraftsmanCard({ craftsman }: CraftsmanCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg bg-primary/10 text-primary">
              {craftsman.name.split(" ")[0][0]}{craftsman.name.split(" ")[1]?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-lg line-clamp-1">{craftsman.name}</CardTitle>
              {craftsman.verified && (
                <Badge variant="default" className="shrink-0">
                  معتمد
                </Badge>
              )}
            </div>
            <CardDescription className="mt-1">
              <Hammer className="h-3 w-3 inline ml-1" />
              {craftsman.specialty}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {craftsman.description}
          </p>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{craftsman.rating}</span>
              <span className="text-muted-foreground">({craftsman.reviews})</span>
            </div>
            <div className="text-muted-foreground">
              {craftsman.experience} سنوات خبرة
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {craftsman.location}
          </div>

          <div className="flex gap-2">
            <Button className="flex-1" size="sm">
              <Phone className="ml-2 h-4 w-4" />
              اتصل الآن
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <MessageSquare className="ml-2 h-4 w-4" />
              محادثة
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
