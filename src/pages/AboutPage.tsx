export default function AboutPage() {
  return (
    <div className="page-enter max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <div className="govt-seal mx-auto mb-4" />
        <div className="text-xs text-[#64748B] mb-1">Government of Jharkhand</div>
        <h1 className="text-3xl font-bold font-serif text-[#1B3A6B] mb-2">About CivicSetu</h1>
        <p className="text-[#475569] max-w-xl mx-auto leading-relaxed">
          An initiative for transparent and participatory civic governance — connecting citizens with government to build better communities.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-10">
        {[
          { icon: "🏛️", title: "Government Initiative", desc: "CivicSetu is an official digital service platform by the Government of Jharkhand to streamline civic grievance reporting and resolution." },
          { icon: "🤖", title: "AI-Powered", desc: "Advanced AI classifies complaints, detects duplicates, and routes issues to the right department — ensuring faster, more efficient resolution." },
          { icon: "🗺️", title: "Geo-Intelligence", desc: "Real-time heatmaps and geographic clustering help identify high-impact areas and prioritize resources effectively." },
          { icon: "👥", title: "Community Driven", desc: "Citizens earn Civic Points for meaningful participation. Community validation improves complaint quality and reduces false reports." },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="bg-white border border-[#E2E8F0] rounded-xl p-5">
            <div className="text-3xl mb-3">{icon}</div>
            <h3 className="font-bold text-[#0F172A] mb-2">{title}</h3>
            <p className="text-sm text-[#475569] leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#1B3A6B] rounded-xl p-6 text-white text-center">
        <h2 className="text-2xl font-bold font-serif mb-3">Our Mission</h2>
        <p className="text-white/90 max-w-2xl mx-auto leading-relaxed">
          "Citizens report problems → AI organizes them → Government departments act → Citizens track progress → Communities improve."
        </p>
        <p className="text-white/70 text-sm mt-4">
          CivicSetu is committed to making government services transparent, accountable, and accessible to every citizen of Jharkhand.
        </p>
      </div>
    </div>
  );
}
