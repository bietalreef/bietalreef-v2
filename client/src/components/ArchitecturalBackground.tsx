export function ArchitecturalBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Desert gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5f1e8] via-[#ebe5d9] to-[#e8dfd0]" />
      
      {/* Architectural grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      {/* Decorative architectural elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Top left corner */}
        <div className="absolute top-0 left-0 w-64 h-64 opacity-5">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path d="M0,0 L200,0 L200,200 Z" fill="currentColor" className="text-[#8B7355]" />
          </svg>
        </div>
        
        {/* Bottom right corner */}
        <div className="absolute bottom-0 right-0 w-96 h-96 opacity-5">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path d="M0,200 L200,200 L200,0 Z" fill="currentColor" className="text-[#8B7355]" />
          </svg>
        </div>
        
        {/* Center decorative circles */}
        <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full border border-[#8B7355]/10 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full border border-[#8B7355]/10 translate-x-1/2 -translate-y-1/2" />
      </div>
      
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
