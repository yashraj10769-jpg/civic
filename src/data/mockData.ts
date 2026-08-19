export type IssueStatus =
  | "Submitted"
  | "Under Verification"
  | "Assigned"
  | "In Progress"
  | "Resolved"
  | "Rejected";

export type IssuePriority = "Low" | "Medium" | "High" | "Critical";

export type IssueCategory =
  | "Road Damage"
  | "Garbage"
  | "Streetlight"
  | "Water Leakage"
  | "Drainage"
  | "Public Toilet"
  | "Traffic"
  | "Electricity"
  | "Illegal Dumping"
  | "Public Infrastructure"
  | "Other";

export interface Complaint {
  id: string;
  category: IssueCategory;
  description: string;
  location: string;
  ward: string;
  district: string;
  date: string;
  status: IssueStatus;
  priority: IssuePriority;
  department: string;
  citizenCount: number;
  aiConfidence: number;
  duplicateProbability: number;
  resolutionDate?: string;
  timeline: { label: string; date: string; done: boolean }[];
}

export interface Citizen {
  id: string;
  displayName: string;
  district: string;
  ward: string;
  points: number;
  level: string;
  reportsSubmitted: number;
  reportsResolved: number;
}

export interface Department {
  name: string;
  active: number;
  resolved: number;
  pending: number;
  avgResolutionDays: number;
  slaViolations: number;
}

export const departments: Department[] = [
  { name: "Public Works", active: 42, resolved: 218, pending: 17, avgResolutionDays: 3.2, slaViolations: 4 },
  { name: "Sanitation", active: 38, resolved: 195, pending: 22, avgResolutionDays: 2.1, slaViolations: 2 },
  { name: "Water Supply", active: 24, resolved: 141, pending: 11, avgResolutionDays: 4.8, slaViolations: 6 },
  { name: "Electricity", active: 19, resolved: 163, pending: 8, avgResolutionDays: 1.9, slaViolations: 1 },
  { name: "Traffic", active: 14, resolved: 87, pending: 5, avgResolutionDays: 5.3, slaViolations: 3 },
  { name: "Drainage", active: 31, resolved: 124, pending: 14, avgResolutionDays: 6.1, slaViolations: 8 },
  { name: "Municipal Services", active: 22, resolved: 176, pending: 9, avgResolutionDays: 3.7, slaViolations: 2 },
  { name: "Urban Planning", active: 8, resolved: 52, pending: 3, avgResolutionDays: 7.2, slaViolations: 1 },
];

export const complaints: Complaint[] = [
  {
    id: "CIV-2026-00421",
    category: "Road Damage",
    description: "Large pothole near the school entrance causing accidents. Multiple vehicles have been damaged.",
    location: "Near Govt. School, Main Road",
    ward: "Ward 12",
    district: "Ranchi",
    date: "2026-08-01",
    status: "In Progress",
    priority: "High",
    department: "Public Works",
    citizenCount: 23,
    aiConfidence: 96,
    duplicateProbability: 87,
    timeline: [
      { label: "Submitted", date: "Aug 1, 2026", done: true },
      { label: "AI Verified", date: "Aug 1, 2026", done: true },
      { label: "Department Assigned", date: "Aug 2, 2026", done: true },
      { label: "Inspection Completed", date: "Aug 4, 2026", done: true },
      { label: "Work in Progress", date: "Aug 6, 2026", done: true },
      { label: "Resolved", date: "Est. Aug 12, 2026", done: false },
    ],
  },
  {
    id: "CIV-2026-00389",
    category: "Garbage",
    description: "Garbage accumulation near market area for over 5 days. Strong odor and health hazard.",
    location: "Market Road, Sector 4",
    ward: "Ward 7",
    district: "Ranchi",
    date: "2026-08-03",
    status: "Assigned",
    priority: "High",
    department: "Sanitation",
    citizenCount: 15,
    aiConfidence: 97,
    duplicateProbability: 72,
    timeline: [
      { label: "Submitted", date: "Aug 3, 2026", done: true },
      { label: "AI Verified", date: "Aug 3, 2026", done: true },
      { label: "Department Assigned", date: "Aug 4, 2026", done: true },
      { label: "Inspection Completed", date: "", done: false },
      { label: "Work in Progress", date: "", done: false },
      { label: "Resolved", date: "", done: false },
    ],
  },
  {
    id: "CIV-2026-00356",
    category: "Streetlight",
    description: "Three streetlights not working on the main road near the park. Area is unsafe at night.",
    location: "Park Road, Near Indira Chowk",
    ward: "Ward 18",
    district: "Ranchi",
    date: "2026-07-28",
    status: "Resolved",
    priority: "Medium",
    department: "Electricity",
    citizenCount: 8,
    aiConfidence: 94,
    duplicateProbability: 45,
    resolutionDate: "2026-08-02",
    timeline: [
      { label: "Submitted", date: "Jul 28, 2026", done: true },
      { label: "AI Verified", date: "Jul 28, 2026", done: true },
      { label: "Department Assigned", date: "Jul 29, 2026", done: true },
      { label: "Inspection Completed", date: "Jul 30, 2026", done: true },
      { label: "Work in Progress", date: "Jul 31, 2026", done: true },
      { label: "Resolved", date: "Aug 2, 2026", done: true },
    ],
  },
  {
    id: "CIV-2026-00344",
    category: "Water Leakage",
    description: "Water pipe burst near the colony gate. Water wastage and road flooding.",
    location: "Shantinagar Colony, Gate 2",
    ward: "Ward 5",
    district: "Ranchi",
    date: "2026-08-05",
    status: "Under Verification",
    priority: "Critical",
    department: "Water Supply",
    citizenCount: 31,
    aiConfidence: 91,
    duplicateProbability: 33,
    timeline: [
      { label: "Submitted", date: "Aug 5, 2026", done: true },
      { label: "AI Verified", date: "Aug 5, 2026", done: true },
      { label: "Department Assigned", date: "", done: false },
      { label: "Inspection Completed", date: "", done: false },
      { label: "Work in Progress", date: "", done: false },
      { label: "Resolved", date: "", done: false },
    ],
  },
  {
    id: "CIV-2026-00312",
    category: "Drainage",
    description: "Drainage blockage causing waterlogging in the entire lane during rains.",
    location: "Lalpur Lane No. 3",
    ward: "Ward 9",
    district: "Ranchi",
    date: "2026-07-25",
    status: "Resolved",
    priority: "High",
    department: "Drainage",
    citizenCount: 18,
    aiConfidence: 89,
    duplicateProbability: 62,
    resolutionDate: "2026-08-01",
    timeline: [
      { label: "Submitted", date: "Jul 25, 2026", done: true },
      { label: "AI Verified", date: "Jul 25, 2026", done: true },
      { label: "Department Assigned", date: "Jul 26, 2026", done: true },
      { label: "Inspection Completed", date: "Jul 27, 2026", done: true },
      { label: "Work in Progress", date: "Jul 28, 2026", done: true },
      { label: "Resolved", date: "Aug 1, 2026", done: true },
    ],
  },
  {
    id: "CIV-2026-00298",
    category: "Illegal Dumping",
    description: "Construction debris illegally dumped on public land near the playground.",
    location: "Near Municipal Park, Ward 3",
    ward: "Ward 3",
    district: "Ranchi",
    date: "2026-08-07",
    status: "Submitted",
    priority: "Medium",
    department: "Municipal Services",
    citizenCount: 5,
    aiConfidence: 83,
    duplicateProbability: 18,
    timeline: [
      { label: "Submitted", date: "Aug 7, 2026", done: true },
      { label: "AI Verified", date: "", done: false },
      { label: "Department Assigned", date: "", done: false },
      { label: "Inspection Completed", date: "", done: false },
      { label: "Work in Progress", date: "", done: false },
      { label: "Resolved", date: "", done: false },
    ],
  },
  {
    id: "CIV-2026-00274",
    category: "Traffic",
    description: "Traffic signal not working at busy intersection causing accidents daily.",
    location: "Harmu Crossing, NH-33",
    ward: "Ward 14",
    district: "Ranchi",
    date: "2026-08-08",
    status: "In Progress",
    priority: "Critical",
    department: "Traffic",
    citizenCount: 42,
    aiConfidence: 98,
    duplicateProbability: 91,
    timeline: [
      { label: "Submitted", date: "Aug 8, 2026", done: true },
      { label: "AI Verified", date: "Aug 8, 2026", done: true },
      { label: "Department Assigned", date: "Aug 8, 2026", done: true },
      { label: "Inspection Completed", date: "Aug 9, 2026", done: true },
      { label: "Work in Progress", date: "Aug 10, 2026", done: true },
      { label: "Resolved", date: "Est. Aug 14, 2026", done: false },
    ],
  },
  {
    id: "CIV-2026-00251",
    category: "Electricity",
    description: "Power supply disruption for 3 days in the residential area.",
    location: "Kokar Colony, Block B",
    ward: "Ward 21",
    district: "Ranchi",
    date: "2026-07-30",
    status: "Resolved",
    priority: "High",
    department: "Electricity",
    citizenCount: 67,
    aiConfidence: 95,
    duplicateProbability: 78,
    resolutionDate: "2026-08-01",
    timeline: [
      { label: "Submitted", date: "Jul 30, 2026", done: true },
      { label: "AI Verified", date: "Jul 30, 2026", done: true },
      { label: "Department Assigned", date: "Jul 30, 2026", done: true },
      { label: "Inspection Completed", date: "Jul 31, 2026", done: true },
      { label: "Work in Progress", date: "Jul 31, 2026", done: true },
      { label: "Resolved", date: "Aug 1, 2026", done: true },
    ],
  },
];

export const citizens: Citizen[] = [
  { id: "CIT-1042", displayName: "Citizen #1042", district: "Ranchi", ward: "Ward 12", points: 780, level: "Civic Contributor", reportsSubmitted: 12, reportsResolved: 9 },
  { id: "CIT-2891", displayName: "Citizen #2891", district: "Ranchi", ward: "Ward 7", points: 1240, level: "Community Champion", reportsSubmitted: 21, reportsResolved: 18 },
  { id: "CIT-0354", displayName: "Citizen #0354", district: "Ranchi", ward: "Ward 3", points: 2100, level: "Civic Leader", reportsSubmitted: 38, reportsResolved: 34 },
  { id: "CIT-1678", displayName: "Citizen #1678", district: "Ranchi", ward: "Ward 18", points: 430, level: "Citizen Observer", reportsSubmitted: 7, reportsResolved: 4 },
  { id: "CIT-3201", displayName: "Citizen #3201", district: "Dhanbad", ward: "Ward 5", points: 960, level: "Civic Contributor", reportsSubmitted: 16, reportsResolved: 13 },
  { id: "CIT-4502", displayName: "Citizen #4502", district: "Jamshedpur", ward: "Ward 9", points: 1680, level: "Community Champion", reportsSubmitted: 29, reportsResolved: 25 },
  { id: "CIT-5123", displayName: "Citizen #5123", district: "Ranchi", ward: "Ward 14", points: 3200, level: "Civic Leader", reportsSubmitted: 54, reportsResolved: 49 },
  { id: "CIT-0891", displayName: "Citizen #0891", district: "Bokaro", ward: "Ward 2", points: 290, level: "Citizen Observer", reportsSubmitted: 4, reportsResolved: 2 },
];

export const highAlertAreas = [
  { ward: "Ward 12", active: 68, total: 124, topIssue: "Road Damage", avgResolution: 3.2 },
  { ward: "Ward 7", active: 52, total: 98, topIssue: "Garbage", avgResolution: 2.8 },
  { ward: "Ward 18", active: 41, total: 87, topIssue: "Streetlight", avgResolution: 4.1 },
  { ward: "Ward 14", active: 38, total: 76, topIssue: "Traffic", avgResolution: 5.3 },
  { ward: "Ward 9", active: 29, total: 64, topIssue: "Drainage", avgResolution: 6.1 },
];

export const notifications = [
  { id: 1, type: "resolved", message: "Your complaint CIV-2026-00356 has been resolved.", time: "2 hours ago", read: false },
  { id: 2, type: "assigned", message: "Your complaint CIV-2026-00421 has been assigned to Public Works.", time: "1 day ago", read: false },
  { id: 3, type: "points", message: "You earned 30 Civic Points for your resolved complaint.", time: "1 day ago", read: false },
  { id: 4, type: "merged", message: "Your report CIV-2026-00312 was merged with an existing issue cluster.", time: "3 days ago", read: true },
  { id: 5, type: "alert", message: "High priority issue detected near your area (Ward 12).", time: "4 days ago", read: true },
  { id: 6, type: "points", message: "You earned 10 Civic Points for providing useful evidence.", time: "5 days ago", read: true },
];

export const categoryIcons: Record<IssueCategory, string> = {
  "Road Damage": "🛣️",
  "Garbage": "🗑️",
  "Streetlight": "💡",
  "Water Leakage": "💧",
  "Drainage": "🚰",
  "Public Toilet": "🚻",
  "Traffic": "🚦",
  "Electricity": "⚡",
  "Illegal Dumping": "♻️",
  "Public Infrastructure": "🏗️",
  "Other": "📋",
};

export const levelThresholds = [
  { level: "Citizen Observer", min: 0, max: 499, color: "#64748B" },
  { level: "Civic Contributor", min: 500, max: 999, color: "#1B3A6B" },
  { level: "Community Champion", min: 1000, max: 1999, color: "#FF9933" },
  { level: "Civic Leader", min: 2000, max: Infinity, color: "#138808" },
];

export const issuesByCategory = [
  { category: "Road Damage", count: 6240, color: "#1B3A6B" },
  { category: "Garbage", count: 5180, color: "#FF9933" },
  { category: "Streetlight", count: 3920, color: "#F59E0B" },
  { category: "Water Leakage", count: 2840, color: "#3B82F6" },
  { category: "Drainage", count: 2190, color: "#06B6D4" },
  { category: "Electricity", count: 1760, color: "#8B5CF6" },
  { category: "Traffic", count: 1430, color: "#EF4444" },
  { category: "Other", count: 1300, color: "#6B7280" },
];

export const resolutionTrend = [
  { month: "Mar", reported: 1820, resolved: 1540 },
  { month: "Apr", reported: 2140, resolved: 1890 },
  { month: "May", reported: 2480, resolved: 2210 },
  { month: "Jun", reported: 2860, resolved: 2590 },
  { month: "Jul", reported: 3240, resolved: 2980 },
  { month: "Aug", reported: 2180, resolved: 1960 },
];
