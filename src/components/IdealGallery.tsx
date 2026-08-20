import { useState, useEffect } from "react";

interface GalleryItem {
  id: string;
  category: string;
  categoryIcon: string;
  title: string;
  location: string;
  ward: string;
  sla: string;
  citizens: number;
  image: string;
  beforeDesc: string;
  afterDesc: string;
  dept: string;
  actionDate: string;
}

const transformations: GalleryItem[] = [
  {
    id: "TR-2026-01",
    category: "Roads & Infrastructure",
    categoryIcon: "🛣️",
    title: "Crater Potholes to 4-Lane Asphalt Green Corridor",
    location: "Harmu Bypass to Ring Road Junction",
    ward: "Ward 12 (Harmu)",
    sla: "Resolved in 36 Hours",
    citizens: 1420,
    image: "/images/gallery_road_transformation.jpg",
    beforeDesc: "Severe deep potholes causing vehicle damage, dangerous traffic bottlenecks and pedestrian hazards during monsoon.",
    afterDesc: "Completely resurfaced with heavy-duty micro-surfacing asphalt, thermal white road markings, and 50+ fresh saplings planted along median.",
    dept: "Public Works Department (PWD Roads)",
    actionDate: "Completed: 14 August 2026",
  },
  {
    id: "TR-2026-02",
    category: "Swachh Bharat & Sanitation",
    categoryIcon: "🌳",
    title: "Illegal Waste Dump to Swachh Citizen Community Park",
    location: "Sector 4 Civic Complex",
    ward: "Ward 05 (Ashok Nagar)",
    sla: "Resolved in 72 Hours",
    citizens: 3850,
    image: "/images/gallery_park_transformation.jpg",
    beforeDesc: "Over 40 tonnes of unsegregated debris and open garbage dumping creating foul odor and health hazard for neighboring residences.",
    afterDesc: "Bio-cleared & converted into a lush community recreation park with paved walking track, solar illumination, benches & flowering garden beds.",
    dept: "Municipal Solid Waste Management & Horticulture",
    actionDate: "Completed: 10 August 2026",
  },
  {
    id: "TR-2026-03",
    category: "Smart Streetlighting & Energy",
    categoryIcon: "💡",
    title: "Dark Hazard Zone into Solar-Powered Smart Avenue",
    location: "Bariatu Hill Road Pedestrian Stretch",
    ward: "Ward 19 (Bariatu)",
    sla: "Resolved in 24 Hours",
    citizens: 920,
    image: "/images/civic_inspection.jpg",
    beforeDesc: "15 non-functional vintage streetlights causing pitch dark conditions at night, unsafe for evening commuters and women workers.",
    afterDesc: "Installed smart IoT-enabled solar LED streetlights with automatic dusk-to-dawn sensors and zero grid energy consumption.",
    dept: "Municipal Electrical & Smart City Division",
    actionDate: "Completed: 06 August 2026",
  },
];

export default function IdealGallery({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % transformations.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + transformations.length) % transformations.length);
  };

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const current = transformations[currentIndex];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
      {/* Header with Swachh Green Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-emerald-200">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 text-xs font-extrabold uppercase px-3 py-1 rounded-full tracking-wider mb-2 border border-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>✨ Civic Impact & Transformation Gallery</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-sans">
            Real Changes Made: Before & After Proof
          </h2>
          <p className="text-sm text-emerald-800/80 mt-1">
            See how citizen reports directly transform neighborhoods into clean, green, and safe smart communities.
          </p>
        </div>

        {/* Gallery Controls (Side Buttons & AutoPlay) */}
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
              isAutoPlay
                ? "bg-emerald-700 text-white border-emerald-700"
                : "bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-50"
            }`}
          >
            {isAutoPlay ? "⏸ Auto-Slide" : "▶ Resume Slide"}
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                prevSlide();
                setIsAutoPlay(false);
              }}
              className="w-10 h-10 rounded-xl bg-white border border-emerald-300 text-emerald-900 flex items-center justify-center font-bold hover:bg-emerald-700 hover:text-white transition-all shadow-sm active:scale-95"
              aria-label="Previous Transformation"
              title="Previous Slide"
            >
              ❮
            </button>
            <button
              onClick={() => {
                nextSlide();
                setIsAutoPlay(false);
              }}
              className="w-10 h-10 rounded-xl bg-white border border-emerald-300 text-emerald-900 flex items-center justify-center font-bold hover:bg-emerald-700 hover:text-white transition-all shadow-sm active:scale-95"
              aria-label="Next Transformation"
              title="Next Slide"
            >
              ❯
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Carousel Card */}
      <div className="bg-white rounded-3xl border border-emerald-200 shadow-xl overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-0 items-stretch">
          {/* Image Container with Side Nav Overlays */}
          <div className="lg:col-span-7 relative bg-slate-900 min-h-[340px] sm:min-h-[440px] flex items-center justify-center overflow-hidden group">
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
            />

            {/* In-Image Side Buttons */}
            <button
              onClick={() => {
                prevSlide();
                setIsAutoPlay(false);
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-emerald-700 text-white flex items-center justify-center text-lg backdrop-blur-md transition-all opacity-80 hover:opacity-100 shadow-lg"
              title="Previous"
            >
              ❮
            </button>
            <button
              onClick={() => {
                nextSlide();
                setIsAutoPlay(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-emerald-700 text-white flex items-center justify-center text-lg backdrop-blur-md transition-all opacity-80 hover:opacity-100 shadow-lg"
              title="Next"
            >
              ❯
            </button>

            {/* Floating Top Badge */}
            <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/20 flex items-center gap-2">
              <span className="text-emerald-400 font-extrabold">✓ OFFICIAL VERIFIED RESOLUTION</span>
              <span className="text-white/40">|</span>
              <span className="font-mono text-emerald-300">{current.id}</span>
            </div>

            {/* Bottom Counter */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
              <span className="font-semibold text-emerald-300">{current.location}</span>
              <span className="font-mono bg-emerald-600/90 text-white px-2 py-0.5 rounded font-bold">
                {currentIndex + 1} of {transformations.length}
              </span>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-white to-emerald-50/40">
            <div>
              {/* Category & Ward Tag */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 flex items-center gap-1.5">
                  <span>{current.categoryIcon}</span>
                  <span>{current.category}</span>
                </span>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                  📍 {current.ward}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight mb-4">
                {current.title}
              </h3>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                  <div className="text-xs text-emerald-700 font-semibold">Turnaround Time</div>
                  <div className="text-base font-extrabold text-emerald-950 font-mono mt-0.5">
                    ⚡ {current.sla}
                  </div>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                  <div className="text-xs text-emerald-700 font-semibold">Benefited Citizens</div>
                  <div className="text-base font-extrabold text-emerald-950 font-mono mt-0.5">
                    👥 {current.citizens.toLocaleString()}+ Residents
                  </div>
                </div>
              </div>

              {/* Before / After descriptions */}
              <div className="space-y-3 text-xs mb-6">
                <div className="p-3 bg-red-50/80 rounded-xl border border-red-200 text-slate-800">
                  <span className="font-extrabold text-red-700 block mb-1">❌ BEFORE GRIEVANCE:</span>
                  <p className="leading-relaxed text-slate-700">{current.beforeDesc}</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-300 text-slate-800">
                  <span className="font-extrabold text-emerald-800 block mb-1">✅ AFTER MUNICIPAL ACTION:</span>
                  <p className="leading-relaxed text-slate-700">{current.afterDesc}</p>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 space-y-1 mb-6">
                <div>🏛️ <strong>Department:</strong> {current.dept}</div>
                <div>📅 <strong>Status:</strong> <span className="text-emerald-700 font-semibold">{current.actionDate}</span></div>
              </div>
            </div>

            {/* Action CTA & Slide Indicators */}
            <div>
              <div className="flex items-center justify-between pt-4 border-t border-emerald-200">
                {/* Thumb dots */}
                <div className="flex items-center gap-1.5">
                  {transformations.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentIndex(i);
                        setIsAutoPlay(false);
                      }}
                      className={`h-2.5 rounded-full transition-all ${
                        currentIndex === i
                          ? "w-8 bg-emerald-700"
                          : "w-2.5 bg-emerald-200 hover:bg-emerald-400"
                      }`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => onNavigate("report")}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-transform hover:scale-105 flex items-center gap-1.5"
                >
                  <span>Report Similar Issue</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
