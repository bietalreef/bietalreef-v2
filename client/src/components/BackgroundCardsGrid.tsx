import { Star, MapPin, Zap, Tag } from 'lucide-react';

const adsData = [
  // Column 1
  { id: 1, image: 'https://images.unsplash.com/photo-1679797870465-b4eda40ead96?w=400', type: 'service', title: 'مقاولات عامة', provider: 'شركة البناء الحديث', rating: 4.9, reviews: 127, location: 'دبي', badge: 'موثق', column: 0 },
  { id: 2, image: 'https://images.unsplash.com/photo-1646592491560-e121e097dcf2?w=400', type: 'offer', title: 'تصميم داخلي فاخر', provider: 'استوديو الإبداع', price: '15% خصم', tag: 'عرض محدود', location: 'أبوظبي', column: 0 },
  { id: 3, image: 'https://images.unsplash.com/photo-1636218685495-8f6545aadb71?w=400', type: 'service', title: 'كهربائي محترف', provider: 'أحمد الكهربائي', rating: 5.0, reviews: 89, location: 'الشارقة', badge: 'سريع', column: 0 },
  { id: 4, image: 'https://images.unsplash.com/photo-1578611709914-0dda0b55f9b0?w=400', type: 'service', title: 'خدمات السباكة', provider: 'فريق الخبراء', rating: 4.8, reviews: 64, location: 'عجمان', column: 0 },
  
  // Column 2
  { id: 5, image: 'https://images.unsplash.com/photo-1751666526244-40239a251eae?w=400', type: 'offer', title: 'صباغة وديكور', provider: 'ألوان الإمارات', price: '20% خصم', tag: 'الأكثر طلباً', location: 'دبي', column: 1 },
  { id: 6, image: 'https://images.unsplash.com/photo-1695687349399-452a14c409be?w=400', type: 'service', title: 'نجارة وأثاث', provider: 'ورشة الحرفيين', rating: 4.9, reviews: 156, location: 'دبي', badge: 'متميز', column: 1 },
  { id: 7, image: 'https://images.unsplash.com/photo-1679797870465-b4eda40ead96?w=400', type: 'project', title: 'فيلا بمساحة 400م²', provider: 'مكتمل في 6 أشهر', location: 'أم القيوين', column: 1 },
  { id: 8, image: 'https://images.unsplash.com/photo-1646592491560-e121e097dcf2?w=400', type: 'service', title: 'تجديد شامل', provider: 'شركة التجديد الذكي', rating: 4.7, reviews: 93, location: 'رأس الخيمة', column: 1 },
  
  // Column 3
  { id: 9, image: 'https://images.unsplash.com/photo-1636218685495-8f6545aadb71?w=400', type: 'offer', title: 'تركيب كهرباء ذكية', provider: 'سمارت هوم الإمارات', price: 'استشارة مجانية', tag: 'جديد', location: 'دبي', column: 2 },
  { id: 10, image: 'https://images.unsplash.com/photo-1578611709914-0dda0b55f9b0?w=400', type: 'service', title: 'صيانة شاملة', provider: 'فريق الصيانة السريع', rating: 4.9, reviews: 201, location: 'أبوظبي', badge: 'موصى به', column: 2 },
  { id: 11, image: 'https://images.unsplash.com/photo-1751666526244-40239a251eae?w=400', type: 'project', title: 'مجمع سكني حديث', provider: 'منجز بتقنية BIM', location: 'دبي', column: 2 },
  { id: 12, image: 'https://images.unsplash.com/photo-1695687349399-452a14c409be?w=400', type: 'service', title: 'أعمال الخشب الفاخرة', provider: 'نجارة الإتقان', rating: 5.0, reviews: 78, location: 'الشارقة', column: 2 },
  
  // Column 4
  { id: 13, image: 'https://images.unsplash.com/photo-1679797870465-b4eda40ead96?w=400', type: 'offer', title: 'باقة البناء الكاملة', provider: 'بيت الريف للمقاولات', price: 'وفّر 30%', tag: 'عرض حصري', location: 'دبي', column: 3 },
  { id: 14, image: 'https://images.unsplash.com/photo-1646592491560-e121e097dcf2?w=400', type: 'service', title: 'استشارات معمارية', provider: 'مكتب الهندسة الحديثة', rating: 4.8, reviews: 142, location: 'أبوظبي', badge: 'خبير', column: 3 },
  { id: 15, image: 'https://images.unsplash.com/photo-1636218685495-8f6545aadb71?w=400', type: 'project', title: 'توسعة منزل عائلي', provider: 'مكتمل بجودة عالية', location: 'العين', column: 3 },
];

export function BackgroundCardsGrid() {
  const columns = [0, 1, 2, 3].map(colIndex => 
    adsData.filter(card => card.column === colIndex)
  );

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Columns Container */}
      <div className="relative w-full h-full flex justify-center items-start gap-6 px-8 pt-8">
        {columns.map((columnCards, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-6">
            {columnCards.map((card, cardIndex) => (
              <div
                key={card.id}
                className="relative w-[280px] rounded-[20px] overflow-hidden bg-white opacity-0 animate-fadeInUp"
                style={{
                  boxShadow: '0 10px 25px rgba(91, 127, 232, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)',
                  animationDelay: `${columnIndex * 0.15 + cardIndex * 0.1}s`,
                  animationFillMode: 'forwards',
                }}
              >
                <div 
                  className="w-full animate-floatSlow"
                  style={{
                    animationDelay: `${cardIndex * 0.4}s`,
                    animationDuration: `${3 + columnIndex * 0.5}s`,
                  }}
                >
                  {/* Card Image */}
                  <div className="relative h-[140px]">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-br from-[#5B7FE8]/10 via-transparent to-[#7B5FE8]/5" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Badge/Tag */}
                    {card.type === 'offer' && card.tag && (
                      <div className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-full flex items-center gap-1">
                        <Zap className="w-3 h-3 text-white fill-white" />
                        <span className="text-white text-xs font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
                          {card.tag}
                        </span>
                      </div>
                    )}
                    
                    {card.type === 'service' && card.badge && (
                      <div className="absolute top-3 left-3 px-3 py-1 bg-[#5B7FE8]/90 backdrop-blur-sm rounded-full">
                        <span className="text-white text-xs font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
                          {card.badge}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-4">
                    <h3 className="text-[15px] text-[#1A1A1A] mb-2 text-right font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
                      {card.title}
                    </h3>
                    
                    <p className="text-xs text-[#6F6F6F] mb-3 text-right" style={{ fontFamily: 'Cairo, sans-serif' }}>
                      {card.provider}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#6F6F6F]" />
                        <span className="text-xs text-[#6F6F6F]" style={{ fontFamily: 'Cairo, sans-serif' }}>
                          {card.location}
                        </span>
                      </div>
                      
                      {card.type === 'service' && card.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-[#1A1A1A] font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
                            {card.rating}
                          </span>
                          <span className="text-xs text-[#6F6F6F]" style={{ fontFamily: 'Cairo, sans-serif' }}>
                            ({card.reviews})
                          </span>
                        </div>
                      )}
                      
                      {card.type === 'offer' && card.price && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-[#5B7FE8]/10 rounded-lg">
                          <Tag className="w-3 h-3 text-[#5B7FE8]" />
                          <span className="text-xs text-[#5B7FE8] font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
                            {card.price}
                          </span>
                        </div>
                      )}
                      
                      {card.type === 'project' && (
                        <div className="px-2 py-1 bg-green-500/10 rounded-lg">
                          <span className="text-xs text-green-600 font-semibold" style={{ fontFamily: 'Cairo, sans-serif' }}>
                            مكتمل
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Blur Overlay */}
      <div 
        className="absolute inset-0 backdrop-blur-[6px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 45%, rgba(245, 238, 225, 0.15) 100%)',
        }}
      />
    </div>
  );
}
