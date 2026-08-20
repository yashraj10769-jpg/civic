import { useState } from "react";

interface CookieBannerProps {
  onAccept?: () => void;
}

export default function CookieBanner({ onAccept }: CookieBannerProps) {
  const [visible, setVisible] = useState(true);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analyticsCookies, setAnalyticsCookies] = useState(true);
  const [functionalCookies, setFunctionalCookies] = useState(true);

  if (!visible) return null;

  return (
    <aside
      aria-label="Cookie Preferences"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-emerald-200 shadow-2xl transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 sm:py-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex-1 pr-4">
            <h3 className="font-bold text-slate-900 text-sm mb-1">
              This website uses cookies to provide a better user experience.
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              By clicking accept, you agree to the policies outlined in the{" "}
              <a
                href="#cookies"
                onClick={(e) => {
                  e.preventDefault();
                  setShowCustomize(true);
                }}
                className="text-emerald-700 underline font-medium hover:text-emerald-900"
              >
                Cookie Settings
              </a>{" "}
              and Government Privacy Standards.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <button
              onClick={() => setShowCustomize(!showCustomize)}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-emerald-800 border border-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors uppercase tracking-wider"
            >
              CUSTOMIZE COOKIES
            </button>
            <button
              onClick={() => setVisible(false)}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-emerald-800 border border-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors uppercase tracking-wider"
            >
              DECLINE OPTIONAL COOKIES
            </button>
            <button
              onClick={() => {
                setVisible(false);
                onAccept?.();
              }}
              className="w-full sm:w-auto px-6 py-2 text-xs font-bold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors uppercase tracking-wider shadow-sm"
            >
              ACCEPT ALL COOKIES
            </button>
          </div>
        </div>

        {/* Customize Cookies Modal Drawer */}
        {showCustomize && (
          <div className="mt-4 pt-4 border-t border-emerald-200 grid sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-800">Essential Cookies</span>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-bold">
                  ALWAYS ACTIVE
                </span>
              </div>
              <p className="text-slate-500 text-[11px]">
                Required for security, portal session authentication, and core civic form submissions.
              </p>
            </div>

            <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-800">Performance & Analytics</span>
                <input
                  type="checkbox"
                  checked={analyticsCookies}
                  onChange={(e) => setAnalyticsCookies(e.target.checked)}
                  className="rounded text-emerald-700 focus:ring-emerald-600"
                />
              </div>
              <p className="text-slate-500 text-[11px]">
                Helps government departments understand ward issues and track turnaround times.
              </p>
            </div>

            <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-800">Functional & Language</span>
                <input
                  type="checkbox"
                  checked={functionalCookies}
                  onChange={(e) => setFunctionalCookies(e.target.checked)}
                  className="rounded text-emerald-700 focus:ring-emerald-600"
                />
              </div>
              <p className="text-slate-500 text-[11px]">
                Remembers your chosen language (Bhashini), font preferences, and regional ward settings.
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
