import type { IssueStatus, IssuePriority } from "../data/mockData";

const statusConfig: Record<IssueStatus, { bg: string; text: string; dot: string }> = {
  Submitted: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  "Under Verification": { bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-500" },
  Assigned: { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-500" },
  "In Progress": { bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500" },
  Resolved: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  Rejected: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
};

const priorityConfig: Record<IssuePriority, { bg: string; text: string }> = {
  Low: { bg: "bg-slate-100", text: "text-slate-600" },
  Medium: { bg: "bg-amber-50", text: "text-amber-700" },
  High: { bg: "bg-orange-50", text: "text-orange-700" },
  Critical: { bg: "bg-red-50", text: "text-red-700" },
};

export function StatusBadge({ status }: { status: IssueStatus }) {
  const c = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} aria-hidden="true" />
      {status}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: IssuePriority }) {
  const c = priorityConfig[priority];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${c.bg} ${c.text}`}>
      {priority === "Critical" && "⚠ "}
      {priority}
    </span>
  );
}
