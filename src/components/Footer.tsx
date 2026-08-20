type Page = string;

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#022C22] text-white pt-14 pb-8 border-t-4 border-emerald-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-emerald-900/70">
          {/* Col 1 & 2: Swachh Bharat & National Emblem */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              {/* Ashoka Lion Capital Vector */}
              <div className="w-10 h-12 text-white">
                <svg viewBox="0 0 100 120" className="w-full h-full fill-current">
                  <path d="M50 15 C45 15 42 19 42 25 C42 31 44 35 42 38 C40 42 39 47 43 53 C47 59 50 61 50 64 C50 61 53 59 57 53 C61 47 60 42 58 38 C56 35 58 31 58 25 C58 19 55 15 50 15 Z" />
                  <path d="M42 27 C37 24 31 27 30 34 C29 41 31 46 29 50 C28 55 31 61 37 64 C41 61 41 55 41 50 C41 45 41 36 42 27 Z" />
                  <path d="M58 27 C63 24 69 27 70 34 C71 41 69 46 71 50 C72 55 69 61 63 64 C59 61 59 55 59 50 C59 45 59 36 58 27 Z" />
                  <rect x="22" y="68" width="56" height="14" rx="2" />
                  <circle cx="50" cy="75" r="5" fill="#fff" />
                </svg>
              </div>

              <div>
                <div className="text-xl font-black tracking-tight text-white">
                  india<span className="text-emerald-400">.gov.in</span>
                </div>
                <div className="text-xs text-emerald-300 font-medium">
                  National Swachh Grievance & Civic Services Portal
                </div>
              </div>
            </div>

            <p className="text-xs text-emerald-200/80 leading-relaxed pr-6">
              The National Swachh Grievance Portal provides single-window access to civic reporting, department resolution tracking, and citizen empowerment across urban and rural wards.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-emerald-200">
              <span className="bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-1 rounded">
                GIGW 3.0 Certified
              </span>
              <span className="bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-1 rounded">
                Swachh Bharat Mission
              </span>
              <span className="bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-1 rounded">
                WCAG 2.1 AA Compliant
              </span>
            </div>
          </div>

          {/* Col 3: App Grievance & Services */}
          <div>
            <h4 className="font-bold text-sm text-emerald-400 mb-3 uppercase tracking-wider">
              App Features
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200/80">
              <li>
                <button onClick={() => onNavigate("report")} className="hover:text-white transition-colors text-left">
                  Report Civic Issue
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("track")} className="hover:text-white transition-colors text-left">
                  Track Complaint Status
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("map")} className="hover:text-white transition-colors text-left">
                  Ward GIS Heatmap
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("community")} className="hover:text-white transition-colors text-left">
                  Community Discussions & Upvotes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("gamification")} className="hover:text-white transition-colors text-left">
                  Swachh Badges & Rewards
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Important Portals */}
          <div>
            <h4 className="font-bold text-sm text-emerald-400 mb-3 uppercase tracking-wider">
              National Portals
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200/80">
              <li>
                <a href="https://swachhbharatmission.ddws.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Swachh Bharat Mission
                </a>
              </li>
              <li>
                <a href="https://digitalindia.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Digital India
                </a>
              </li>
              <li>
                <a href="https://mygov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  MyGov Citizen Forum
                </a>
              </li>
              <li>
                <a href="https://pgportal.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  CPGRAMS Public Grievances
                </a>
              </li>
              <li>
                <a href="https://data.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Open Government Data (OGD)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Helpdesk & Telecom Contacts */}
          <div>
            <h4 className="font-bold text-sm text-emerald-400 mb-3 uppercase tracking-wider">
              24x7 Helpdesk
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-200/80">
              <li>
                <div className="font-semibold text-white">Toll-Free Helpline:</div>
                <div className="font-mono text-emerald-300 font-bold">1800-11-2026</div>
              </li>
              <li>
                <div className="font-semibold text-white">Email Support:</div>
                <div className="font-mono text-emerald-300">helpdesk-civic@gov.in</div>
              </li>
              <li>
                <div className="font-semibold text-white">Emergency SOS:</div>
                <div className="font-mono text-amber-300 font-bold">112</div>
              </li>
              <li>
                <div className="font-semibold text-white">WhatsApp Bot:</div>
                <div className="font-mono text-emerald-300">+91 90131 51515</div>
              </li>
            </ul>
          </div>
        </div>

        {/* NIC & MeitY Attribution */}
        <div className="py-6 border-b border-emerald-900/70 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-emerald-300/80">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-8 h-8 rounded-lg bg-emerald-800/40 text-emerald-300 flex items-center justify-center font-bold font-mono text-[10px] border border-emerald-700/60">
              NIC
            </div>
            <div>
              <p className="text-white font-medium">
                Designed, Developed and Hosted by <span className="font-bold text-emerald-300">National Informatics Centre (NIC)</span>
              </p>
              <p className="text-[11px] text-emerald-400/70">
                Ministry of Electronics & Information Technology (MeitY), Government of India
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <span className="flex items-center gap-1.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Total Citizens Served: <span className="font-bold text-white">48,291,042</span>
            </span>
            <span className="text-emerald-400/70">Last Reviewed: August 2026</span>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-emerald-400/60">
          <p>© 2026 National Portal of India • Swachh Bharat Civic Platform. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#accessibility" className="hover:text-emerald-200">Accessibility Statement</a>
            <a href="#sitemap" className="hover:text-emerald-200">Sitemap</a>
            <a href="#feedback" className="hover:text-emerald-200">Feedback</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
