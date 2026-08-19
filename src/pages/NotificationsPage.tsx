import { useState } from "react";
import { notifications } from "../data/mockData";

const notifIcons: Record<string, string> = {
  resolved: "✅",
  assigned: "📋",
  points: "⭐",
  merged: "🔗",
  alert: "⚠️",
};

const notifColors: Record<string, string> = {
  resolved: "border-emerald-200 bg-emerald-50",
  assigned: "border-blue-200 bg-blue-50",
  points: "border-amber-200 bg-amber-50",
  merged: "border-purple-200 bg-purple-50",
  alert: "border-red-200 bg-red-50",
};

export default function NotificationsPage() {
  const [items, setItems] = useState(notifications);

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const unreadCount = items.filter((n) => !n.read).length;

  return (
    <div className="page-enter max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#0F172A]">Notifications</h1>
          <p className="text-[#64748B] text-sm mt-0.5">{unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-sm text-[#1B3A6B] font-medium hover:underline"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="space-y-2">
        {items.map((n) => (
          <div
            key={n.id}
            className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${n.read ? "border-[#F1F5F9] bg-white" : notifColors[n.type]}`}
            onClick={() => setItems((prev) => prev.map((item) => item.id === n.id ? { ...item, read: true } : item))}
          >
            <div className="text-2xl flex-shrink-0 mt-0.5">{notifIcons[n.type]}</div>
            <div className="flex-1">
              <p className={`text-sm leading-relaxed ${n.read ? "text-[#374151]" : "text-[#0F172A] font-medium"}`}>
                {n.message}
              </p>
              <div className="text-xs text-[#94A3B8] mt-1">{n.time}</div>
            </div>
            {!n.read && (
              <div className="w-2 h-2 bg-[#1B3A6B] rounded-full flex-shrink-0 mt-2" />
            )}
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12 text-[#94A3B8]">
          <div className="text-4xl mb-3">🔔</div>
          <div className="font-medium">No notifications yet</div>
        </div>
      )}
    </div>
  );
}
