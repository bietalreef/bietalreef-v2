import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Home, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

interface Room {
  id: string;
  name: string;
  length: string;
  width: string;
}

export default function AreaCalculator() {
  const [rooms, setRooms] = useState<Room[]>([
    { id: "1", name: "غرفة المعيشة", length: "", width: "" },
  ]);

  const addRoom = () => {
    setRooms([
      ...rooms,
      { id: Date.now().toString(), name: `غرفة ${rooms.length + 1}`, length: "", width: "" },
    ]);
  };

  const removeRoom = (id: string) => {
    if (rooms.length > 1) {
      setRooms(rooms.filter((room) => room.id !== id));
    }
  };

  const updateRoom = (id: string, field: keyof Room, value: string) => {
    setRooms(rooms.map((room) => (room.id === id ? { ...room, [field]: value } : room)));
  };

  const calculateRoomArea = (room: Room) => {
    const length = parseFloat(room.length) || 0;
    const width = parseFloat(room.width) || 0;
    return length * width;
  };

  const totalArea = rooms.reduce((sum, room) => sum + calculateRoomArea(room), 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <img src="/logo.png" alt="بيت الريف" className="h-10 w-auto cursor-pointer" />
            </Link>
            <span className="text-lg font-bold">حاسبة المساحات</span>
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

      <div className="container py-8 max-w-6xl">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <LayoutDashboard className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">حاسبة المساحات والمخططات</h1>
          <p className="text-muted-foreground">خطط مساحات منزلك بدقة واحترافية</p>
        </div>

        <Tabs defaultValue="rooms" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rooms">حساب الغرف</TabsTrigger>
            <TabsTrigger value="land">حساب الأرض</TabsTrigger>
          </TabsList>

          {/* حساب الغرف */}
          <TabsContent value="rooms">
            <div className="grid gap-6 md:grid-cols-3">
              {/* قائمة الغرف */}
              <div className="md:col-span-2 space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>الغرف والمساحات</CardTitle>
                        <CardDescription>أضف غرف منزلك واحسب مساحاتها</CardDescription>
                      </div>
                      <Button onClick={addRoom} size="sm">
                        <Plus className="ml-2 h-4 w-4" />
                        إضافة غرفة
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {rooms.map((room, index) => (
                      <Card key={room.id} className="border-2">
                        <CardContent className="pt-6">
                          <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                              <Label className="text-base font-medium">غرفة {index + 1}</Label>
                              {rooms.length > 1 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeRoom(room.id)}
                                  className="text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor={`name-${room.id}`}>اسم الغرفة</Label>
                              <Input
                                id={`name-${room.id}`}
                                value={room.name}
                                onChange={(e) => updateRoom(room.id, "name", e.target.value)}
                                placeholder="مثال: غرفة النوم الرئيسية"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`length-${room.id}`}>الطول (متر)</Label>
                                <Input
                                  id={`length-${room.id}`}
                                  type="number"
                                  value={room.length}
                                  onChange={(e) => updateRoom(room.id, "length", e.target.value)}
                                  placeholder="0"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`width-${room.id}`}>العرض (متر)</Label>
                                <Input
                                  id={`width-${room.id}`}
                                  type="number"
                                  value={room.width}
                                  onChange={(e) => updateRoom(room.id, "width", e.target.value)}
                                  placeholder="0"
                                />
                              </div>
                            </div>

                            <div className="bg-primary/5 rounded-lg p-3 text-center">
                              <p className="text-sm text-muted-foreground mb-1">المساحة</p>
                              <p className="text-2xl font-bold text-primary">
                                {calculateRoomArea(room).toFixed(2)} م²
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* الملخص */}
              <div className="space-y-6">
                <Card className="border-primary">
                  <CardHeader>
                    <CardTitle>الملخص الإجمالي</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-6 bg-primary/5 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">المساحة الإجمالية</p>
                      <p className="text-4xl font-bold text-primary">{totalArea.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground mt-1">متر مربع</p>
                    </div>

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">عدد الغرف:</span>
                        <span className="font-medium">{rooms.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">متوسط مساحة الغرفة:</span>
                        <span className="font-medium">
                          {rooms.length > 0 ? (totalArea / rooms.length).toFixed(2) : 0} م²
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">تفاصيل الغرف</h4>
                      <div className="space-y-1 text-xs">
                        {rooms.map((room) => {
                          const area = calculateRoomArea(room);
                          return area > 0 ? (
                            <div key={room.id} className="flex justify-between">
                              <span className="text-muted-foreground truncate">{room.name}</span>
                              <span className="font-medium">{area.toFixed(2)} م²</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">نصائح مفيدة</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs text-muted-foreground">
                    <p>• قس الغرف من الداخل (بدون الجدران)</p>
                    <p>• استخدم شريط القياس للدقة</p>
                    <p>• احسب الحمامات والممرات أيضاً</p>
                    <p>• المساحة الإجمالية = مجموع كل الغرف</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* حساب الأرض */}
          <TabsContent value="land">
            <LandCalculator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function LandCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [shape, setShape] = useState<"rectangle" | "irregular">("rectangle");

  const area = parseFloat(length) * parseFloat(width) || 0;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>حساب مساحة الأرض</CardTitle>
          <CardDescription>احسب مساحة قطعة الأرض الخاصة بك</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="land-length">الطول (متر)</Label>
            <Input
              id="land-length"
              type="number"
              placeholder="مثال: 20"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="land-width">العرض (متر)</Label>
            <Input
              id="land-width"
              type="number"
              placeholder="مثال: 15"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="text-lg"
            />
          </div>

          <div className="bg-primary/5 rounded-lg p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">مساحة الأرض</p>
            <p className="text-4xl font-bold text-primary">{area.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-1">متر مربع</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>معلومات إضافية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">المحيط:</span>
              <span className="font-medium">
                {((parseFloat(length) + parseFloat(width)) * 2 || 0).toFixed(2)} متر
              </span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">القطر (تقريبي):</span>
              <span className="font-medium">
                {(Math.sqrt(Math.pow(parseFloat(length) || 0, 2) + Math.pow(parseFloat(width) || 0, 2))).toFixed(2)} متر
              </span>
            </div>
          </div>

          <Separator />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs text-blue-800">
              <strong>نصيحة:</strong> للأراضي غير المنتظمة، قسّم الأرض إلى أشكال منتظمة واحسب كل جزء على حدة.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">نسبة البناء الموصى بها</h4>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>• السكني: 60-70% من مساحة الأرض</p>
              <p>• التجاري: 70-80% من مساحة الأرض</p>
              <p>• الصناعي: 50-60% من مساحة الأرض</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
