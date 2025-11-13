export function FloatingCards() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating card 1 - Top Left */}
      <div 
        className="absolute top-20 left-10 w-32 h-40 bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 transform -rotate-12 animate-float"
        style={{
          animationDelay: '0s',
          animationDuration: '6s',
        }}
      >
        <div className="p-4 h-full flex flex-col justify-between">
          <div className="w-8 h-8 bg-emerald-500/30 rounded-lg" />
          <div className="space-y-2">
            <div className="w-full h-2 bg-white/40 rounded" />
            <div className="w-3/4 h-2 bg-white/30 rounded" />
          </div>
        </div>
      </div>

      {/* Floating card 2 - Top Right */}
      <div 
        className="absolute top-40 right-16 w-40 h-32 bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 transform rotate-6 animate-float"
        style={{
          animationDelay: '1s',
          animationDuration: '7s',
        }}
      >
        <div className="p-4 h-full flex flex-col justify-between">
          <div className="w-10 h-10 bg-amber-500/30 rounded-full" />
          <div className="space-y-2">
            <div className="w-full h-2 bg-white/40 rounded" />
            <div className="w-2/3 h-2 bg-white/30 rounded" />
          </div>
        </div>
      </div>

      {/* Floating card 3 - Bottom Left */}
      <div 
        className="absolute bottom-32 left-20 w-36 h-36 bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 transform rotate-12 animate-float"
        style={{
          animationDelay: '2s',
          animationDuration: '8s',
        }}
      >
        <div className="p-4 h-full flex flex-col justify-between">
          <div className="flex gap-2">
            <div className="w-6 h-6 bg-blue-500/30 rounded" />
            <div className="w-6 h-6 bg-purple-500/30 rounded" />
          </div>
          <div className="space-y-2">
            <div className="w-full h-2 bg-white/40 rounded" />
            <div className="w-4/5 h-2 bg-white/30 rounded" />
            <div className="w-3/5 h-2 bg-white/25 rounded" />
          </div>
        </div>
      </div>

      {/* Floating card 4 - Bottom Right */}
      <div 
        className="absolute bottom-40 right-24 w-28 h-36 bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 transform -rotate-6 animate-float"
        style={{
          animationDelay: '3s',
          animationDuration: '9s',
        }}
      >
        <div className="p-3 h-full flex flex-col justify-between">
          <div className="w-full h-12 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 rounded-lg" />
          <div className="space-y-1.5">
            <div className="w-full h-1.5 bg-white/40 rounded" />
            <div className="w-3/4 h-1.5 bg-white/30 rounded" />
            <div className="w-1/2 h-1.5 bg-white/25 rounded" />
          </div>
        </div>
      </div>

      {/* Floating card 5 - Middle Left */}
      <div 
        className="absolute top-1/2 left-32 w-32 h-28 bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 transform -rotate-3 animate-float"
        style={{
          animationDelay: '1.5s',
          animationDuration: '7.5s',
        }}
      >
        <div className="p-3 h-full flex flex-col justify-center gap-2">
          <div className="w-full h-2 bg-white/40 rounded" />
          <div className="w-5/6 h-2 bg-white/35 rounded" />
          <div className="w-4/6 h-2 bg-white/30 rounded" />
        </div>
      </div>

      {/* Floating card 6 - Middle Right */}
      <div 
        className="absolute top-1/3 right-32 w-36 h-32 bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 transform rotate-3 animate-float"
        style={{
          animationDelay: '2.5s',
          animationDuration: '8.5s',
        }}
      >
        <div className="p-4 h-full flex flex-col justify-between">
          <div className="flex gap-1.5">
            <div className="w-4 h-4 bg-rose-500/30 rounded-full" />
            <div className="w-4 h-4 bg-orange-500/30 rounded-full" />
            <div className="w-4 h-4 bg-yellow-500/30 rounded-full" />
          </div>
          <div className="space-y-2">
            <div className="w-full h-2 bg-white/40 rounded" />
            <div className="w-3/4 h-2 bg-white/30 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
