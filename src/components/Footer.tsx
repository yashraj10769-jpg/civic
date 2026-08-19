type Page = string;

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#1B3A6B] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="govt-seal" />
              <div>
                <div className="text-xs opacity-70">Government of Jharkhand</div>
                <div className="text-xl font-bold font-serif">CivicSetu</div>
              </div>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              An initiative for transparent and participatory civic governance. Connecting Citizens. Resolving Communities.
            </p>
            <p className="text-xs opacity-50 mt-4">
              Your personal information is protected under the Government of India Digital Privacy Guidelines.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold mb-4 text-[#FF9933]">Platform</h3>
            <ul className="space-y-2 text-sm opacity-80">
              {[
                { label: "Report an Issue", page: "report" },
                { label: "Track Complaint", page: "track" },
                { label: "Civic Intelligence Map", page: "map" },
                { label: "Community Updates", page: "community" },
                { label: "Citizen Dashboard", page: "dashboard" },
              ].map(({ label, page }) => (
                <li key={label}>
                  <button
                    onClick={() => onNavigate(page)}
                    className="hover:text-[#FF9933] transition-colors text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold mb-4 text-[#FF9933]">Information</h3>
            <ul className="space-y-2 text-sm opacity-80">
              {["About CivicSetu", "Citizen Charter", "Privacy Policy", "Terms of Use", "Accessibility Statement", "RTI Information"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[#FF9933] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help & Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-[#FF9933]">Help & Support</h3>
            <div className="space-y-3 text-sm opacity-80">
              <div>
                <div className="font-medium opacity-100">Helpdesk</div>
                <div>1800-XXX-XXXX (Toll Free)</div>
                <div className="text-xs opacity-60">Mon–Sat, 9AM–6PM</div>
              </div>
              <div>
                <div className="font-medium opacity-100">Email</div>
                <div>civicsetu@jharkhand.gov.in</div>
              </div>
              <div>
                <div className="font-medium opacity-100 text-red-300">Emergency</div>
                <div className="text-xs">Police: 100 | Fire: 101 | Ambulance: 108</div>
              </div>
              <button
                onClick={() => {}}
                className="mt-2 text-xs bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-2 rounded transition-colors w-full text-center"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs opacity-60">
          <span>© 2026 Government of Jharkhand. CivicSetu. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:opacity-100 transition-opacity">Screen Reader Access</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Sitemap</a>
            <span>Last Updated: Aug 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
