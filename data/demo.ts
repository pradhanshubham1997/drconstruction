import type { Customer, Lead, Project, Quotation } from "@/types";

export const DEMO_NOTICE = "Demo data — for product demonstration only.";

export const leads: Lead[] = [
  { id: "LD-1048", name: "Rahul Sharma", phone: "+91 98271 44501", type: "Residential Construction", location: "Raipur", value: 5000000, source: "WhatsApp", status: "Estimate Generated", date: "Today", plotArea: 1500, builtUpArea: 2400 },
  { id: "LD-1047", name: "Amit Verma", phone: "+91 98271 33802", type: "Residential Construction", location: "Bhilai", value: 3800000, source: "Site Visit", status: "Site Visit Done", date: "Yesterday", plotArea: 1200, builtUpArea: 1900 },
  { id: "LD-1046", name: "Neha Patel", phone: "+91 98271 90211", type: "Residential Construction", location: "Naya Raipur", value: 6700000, source: "Google", status: "Quotation Sent", date: "2 days ago", plotArea: 2000, builtUpArea: 3100 },
  { id: "LD-1045", name: "Sanjay Agrawal", phone: "+91 98271 77120", type: "Commercial Building", location: "Raipur", value: 11200000, source: "Referral", status: "New", date: "2 days ago", plotArea: 3200, builtUpArea: 6000 },
  { id: "LD-1044", name: "Rohit Jain", phone: "+91 98271 55093", type: "Residential Construction", location: "Durg", value: 4200000, source: "WhatsApp", status: "New", date: "3 days ago", plotArea: 1350, builtUpArea: 2100 },
  { id: "LD-1043", name: "Kavita Singh", phone: "+91 98271 22871", type: "Renovation", location: "Raipur", value: 1800000, source: "Walk-in", status: "Follow-up", date: "4 days ago", plotArea: 1000, builtUpArea: 1400 },
];

export const customers: Customer[] = [
  { id: "C-01", name: "Rahul Sharma", phone: "+91 98271 44501", project: "Sharma Residence", location: "Raipur", value: 5240000, status: "In Progress", progress: 64 },
  { id: "C-02", name: "Amit Verma", phone: "+91 98271 33802", project: "Verma Residence", location: "Bhilai", value: 3820000, status: "In Progress", progress: 42 },
  { id: "C-03", name: "Neha Patel", phone: "+91 98271 90211", project: "Patel Residence", location: "Naya Raipur", value: 6780000, status: "In Progress", progress: 81 },
  { id: "C-04", name: "Sanjay Agrawal", phone: "+91 98271 77120", project: "Commercial Building", location: "Raipur", value: 11200000, status: "In Progress", progress: 29 },
];

export const projects: Project[] = [
  { id: "P-01", slug: "sharma-residence", name: "Sharma Residence", type: "Residential Construction", location: "Raipur", customer: "Rahul Sharma", value: 5240000, received: 3144000, pending: 2096000, progress: 64, status: "In Progress" },
  { id: "P-02", slug: "verma-residence", name: "Verma Residence", type: "Residential Construction", location: "Bhilai", customer: "Amit Verma", value: 3820000, received: 1528000, pending: 2292000, progress: 42, status: "In Progress" },
  { id: "P-03", slug: "patel-residence", name: "Patel Residence", type: "Residential Construction", location: "Naya Raipur", customer: "Neha Patel", value: 6780000, received: 5424000, pending: 1356000, progress: 81, status: "Finishing" },
  { id: "P-04", slug: "commercial-building", name: "Commercial Building", type: "Commercial", location: "Raipur", customer: "Sanjay Agrawal", value: 11200000, received: 3360000, pending: 7840000, progress: 29, status: "Structure" },
];

export const quotations: Quotation[] = [
  { id: "DRC-Q-2026-0048", customer: "Rahul Sharma", project: "Sharma Residence", amount: 5240000, status: "Negotiation", created: "Today" },
  { id: "DRC-Q-2026-0047", customer: "Neha Patel", project: "Patel Residence", amount: 6780000, status: "Sent", created: "Yesterday" },
  { id: "DRC-Q-2026-0046", customer: "Amit Verma", project: "Verma Residence", amount: 3990000, status: "Viewed", created: "2 days ago" },
  { id: "DRC-Q-2026-0045", customer: "Rohit Jain", project: "Jain Residence", amount: 4420000, status: "Draft", created: "3 days ago" },
  { id: "DRC-Q-2026-0044", customer: "Sanjay Agrawal", project: "Commercial Building", amount: 11800000, status: "Sent", created: "4 days ago" },
];

export const siteVisits = [
  { id: "SV-21", name: "Rahul Sharma", project: "Sharma Residence", time: "Today, 4:30 PM", location: "Raipur — Sector 27", assignee: "D.R. Team", status: "Scheduled" },
  { id: "SV-22", name: "Rohit Jain", project: "Jain Residence", time: "Tomorrow, 11:00 AM", location: "Durg — Smriti Nagar", assignee: "Site Engineer", status: "Scheduled" },
  { id: "SV-23", name: "Amit Verma", project: "Verma Residence", time: "Today, 10:00 AM", location: "Bhilai — Nehru Nagar", assignee: "D.R. Team", status: "Completed" },
  { id: "SV-24", name: "Neha Patel", project: "Patel Residence", time: "Fri, 3:00 PM", location: "Naya Raipur — Sector 35", assignee: "Site Engineer", status: "Scheduled" },
];

export const materials = [
  { name: "Cement", required: "1,050 bags", available: "320 bags", used: "730 bags", status: "Low Stock", tone: "red" },
  { name: "Steel", required: "7.8 tons", available: "4.1 tons", used: "3.7 tons", status: "In Stock", tone: "green" },
  { name: "Sand", required: "1,420 cu.ft", available: "900 cu.ft", used: "520 cu.ft", status: "In Stock", tone: "green" },
  { name: "Aggregate", required: "980 cu.ft", available: "610 cu.ft", used: "370 cu.ft", status: "In Stock", tone: "green" },
  { name: "Bricks", required: "18,500 pcs", available: "11,000 pcs", used: "7,500 pcs", status: "In Stock", tone: "green" },
  { name: "Tiles", required: "2,400 sq.ft", available: "2,400 sq.ft", used: "0 sq.ft", status: "Ordered", tone: "amber" },
  { name: "Electrical Material", required: "1 lot", available: "0.4 lot", used: "0.6 lot", status: "Low Stock", tone: "red" },
  { name: "Plumbing Material", required: "1 lot", available: "0.7 lot", used: "0.3 lot", status: "In Stock", tone: "green" },
];

export const labourGroups = [
  { name: "Masons", count: 12, present: 11 },
  { name: "Helpers", count: 18, present: 15 },
  { name: "Electricians", count: 4, present: 4 },
  { name: "Painters", count: 6, present: 3 },
  { name: "Plumbers", count: 3, present: 3 },
  { name: "Supervisors", count: 2, present: 2 },
];

export const timeline = [
  { label: "Site Survey", done: true },
  { label: "Foundation", done: true },
  { label: "Structure", done: true },
  { label: "Brick Work", done: true },
  { label: "Plaster", done: true },
  { label: "Electrical", done: false, current: true },
  { label: "Flooring", done: false },
  { label: "Painting", done: false },
  { label: "Handover", done: false },
];

export const notifications = [
  { title: "New lead received", desc: "Rohit Jain via WhatsApp — Durg", time: "12 min ago" },
  { title: "Quotation viewed", desc: "DRC-Q-2026-0046 opened by Amit Verma", time: "38 min ago" },
  { title: "Payment milestone due", desc: "Sharma Residence — Electrical ₹5.24L", time: "1 hr ago" },
  { title: "Low material stock", desc: "Cement below threshold (320 bags)", time: "2 hrs ago" },
  { title: "Site visit reminder", desc: "Rahul Sharma — Today 4:30 PM", time: "3 hrs ago" },
  { title: "Project update required", desc: "2 projects need progress updates", time: "Today" },
];

export const activity = [
  { text: "Rahul Sharma requested an estimate", time: "12 min ago" },
  { text: "Quotation DRC-Q-2026-0048 sent", time: "38 min ago" },
  { text: "Sharma Residence progress updated to 64%", time: "1 hour ago" },
  { text: "₹2.5L payment recorded — Verma Residence", time: "2 hours ago" },
  { text: "New site visit scheduled — Rohit Jain", time: "Today" },
];

export const monthly = [
  { m: "Apr", leads: 14, estimates: 9, quotations: 6, won: 2, revenue: 28 },
  { m: "May", leads: 18, estimates: 12, quotations: 8, won: 3, revenue: 41 },
  { m: "Jun", leads: 16, estimates: 11, quotations: 7, won: 2, revenue: 36 },
  { m: "Jul", leads: 22, estimates: 15, quotations: 10, won: 4, revenue: 58 },
  { m: "Aug", leads: 24, estimates: 16, quotations: 9, won: 3, revenue: 52 },
  { m: "Sep", leads: 24, estimates: 14, quotations: 8, won: 3, revenue: 47 },
];
