import {
  FileText,
  CreditCard,
  BookOpen,
  Calendar,
  Monitor,
  Building,
  Users,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type StepStatus = "completed" | "in-progress" | "upcoming" | "overdue";

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  status: StepStatus;
  deadline: string;
  details: string[];
  category: string;
  actionLabel: string;
}

export const onboardingSteps: OnboardingStep[] = [
  {
    id: "documents",
    title: "Document Verification",
    description: "Upload and verify your academic documents and ID proofs.",
    icon: FileText,
    status: "completed",
    deadline: "Jun 15, 2025",
    details: [
      "10th & 12th Marksheets",
      "Transfer Certificate",
      "Aadhar Card / ID Proof",
      "Passport-size Photos",
      "Admission Letter",
    ],
    category: "Admission",
    actionLabel: "Upload",
  },
  {
    id: "fees",
    title: "Fee Payment",
    description: "Complete tuition and hostel fee payment for the semester.",
    icon: CreditCard,
    status: "completed",
    deadline: "Jun 20, 2025",
    details: [
      "Tuition Fee",
      "Lab & Library Fee",
      "Hostel Fee (if applicable)",
      "Download Payment Receipt",
    ],
    category: "Finance",
    actionLabel: "Pay Now",
  },
  {
    id: "courses",
    title: "Course Registration",
    description: "Register for your courses and select electives for the semester.",
    icon: BookOpen,
    status: "in-progress",
    deadline: "Jul 5, 2025",
    details: [
      "Core Subject Registration",
      "Elective Selection",
      "Lab Section Preference",
      "Confirm Timetable Slot",
    ],
    category: "Academic",
    actionLabel: "Choose Subjects",
  },
  {
    id: "timetable",
    title: "Timetable Access",
    description: "View and sync your personalized class schedule.",
    icon: Calendar,
    status: "upcoming",
    deadline: "Jul 10, 2025",
    details: [
      "View Weekly Schedule",
      "Sync to Google Calendar",
      "Check Lab Timings",
      "Note Exam Schedule",
    ],
    category: "Academic",
    actionLabel: "View Schedule",
  },
  {
    id: "lms",
    title: "LMS Onboarding",
    description: "Set up your Learning Management System account and explore resources.",
    icon: Monitor,
    status: "upcoming",
    deadline: "Jul 12, 2025",
    details: [
      "Activate LMS Account",
      "Join Course Channels",
      "Download Study Materials",
      "Complete Orientation Module",
    ],
    category: "Academic",
    actionLabel: "Connect Account",
  },
  {
    id: "hostel",
    title: "Hostel Allocation",
    description: "Check your room assignment and complete hostel formalities.",
    icon: Building,
    status: "upcoming",
    deadline: "Jul 15, 2025",
    details: [
      "Room Allocation Letter",
      "Hostel Rules Acknowledgement",
      "Mess Plan Selection",
      "Emergency Contact Submission",
    ],
    category: "Campus Life",
    actionLabel: "Check Status",
  },
  {
    id: "mentoring",
    title: "Mentor Assigned",
    description: "Connect with your academic mentor for guidance and support.",
    icon: Users,
    status: "upcoming",
    deadline: "Jul 20, 2025",
    details: [
      "View Assigned Mentor",
      "Schedule First Meeting",
      "Share Academic Goals",
      "Join Mentoring Group",
    ],
    category: "Support",
    actionLabel: "View Mentor",
  },
  {
    id: "compliance",
    title: "Compliance Training",
    description: "Complete mandatory training modules on campus policies.",
    icon: ShieldCheck,
    status: "upcoming",
    deadline: "Jul 25, 2025",
    details: [
      "Anti-Ragging Policy",
      "Code of Conduct",
      "Campus Safety Training",
      "Digital Ethics Module",
    ],
    category: "Compliance",
    actionLabel: "Start Training",
  },
];

export function getProgress(steps: OnboardingStep[]): number {
  const completed = steps.filter((s) => s.status === "completed").length;
  return Math.round((completed / steps.length) * 100);
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  type: "info" | "warning" | "urgent";
  date: string;
}

export const announcements: Announcement[] = [
  {
    id: "1",
    title: "Orientation Day",
    description: "Join us for the welcome ceremony on July 1st at the main auditorium.",
    type: "info",
    date: "Jun 28, 2025",
  },
  {
    id: "2",
    title: "Fee Deadline Approaching",
    description: "Last date for fee payment is June 20. Late fees apply after.",
    type: "warning",
    date: "Jun 18, 2025",
  },
  {
    id: "3",
    title: "Document Submission Reminder",
    description: "Submit original documents at the admission office by June 15.",
    type: "urgent",
    date: "Jun 12, 2025",
  },
];

export interface DocumentItem {
  id: string;
  name: string;
  status: "verified" | "under-review" | "missing";
  required: boolean;
}

export const documentItems: DocumentItem[] = [
  { id: "1", name: "10th Marksheet", status: "verified", required: true },
  { id: "2", name: "12th Marksheet", status: "verified", required: true },
  { id: "3", name: "Transfer Certificate", status: "under-review", required: true },
  { id: "4", name: "Aadhar Card / ID Proof", status: "verified", required: true },
  { id: "5", name: "Admission Letter", status: "verified", required: true },
  { id: "6", name: "Passport-size Photos", status: "missing", required: true },
  { id: "7", name: "Migration Certificate", status: "missing", required: false },
];
