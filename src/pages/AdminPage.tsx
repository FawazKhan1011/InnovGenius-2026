import { cn } from "@/lib/utils";
import { Users, CheckCircle2, AlertTriangle, Clock, TrendingUp, FileText, Bell } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const stats = [
  { label: "Total Students", value: "1,247", icon: Users, change: "+23 today", color: "gradient-primary" },
  { label: "Fully Onboarded", value: "68%", icon: CheckCircle2, change: "+5% this week", color: "gradient-accent" },
  { label: "Pending Verifications", value: "142", icon: FileText, change: "12 urgent", color: "gradient-warm" },
  { label: "Need Help", value: "38", icon: AlertTriangle, change: "↓ from 52", color: "bg-destructive" },
];

const deadlineAlerts = [
  { task: "Document Submission", count: 89, deadline: "Jun 15", severity: "high" },
  { task: "Fee Payment", count: 156, deadline: "Jun 20", severity: "medium" },
  { task: "Course Registration", count: 423, deadline: "Jul 5", severity: "low" },
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-bold text-2xl mb-1">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of student onboarding progress.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-card border rounded-2xl p-4 shadow-card">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white mb-3", stat.color)}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="font-heading font-bold text-2xl">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-[10px] text-success mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Onboarding Funnel */}
      <div className="bg-card border rounded-2xl p-5 shadow-card">
        <h3 className="font-heading font-bold text-sm mb-4">Onboarding Funnel</h3>
        <div className="space-y-4">
          {[
            { label: "Documents Verified", pct: 82 },
            { label: "Fees Paid", pct: 71 },
            { label: "Courses Registered", pct: 45 },
            { label: "LMS Activated", pct: 30 },
            { label: "Hostel Allocated", pct: 22 },
            { label: "Mentor Assigned", pct: 15 },
            { label: "Compliance Done", pct: 8 },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium">{item.pct}%</span>
              </div>
              <Progress value={item.pct} className="h-2 [&>div]:gradient-primary" />
            </div>
          ))}
        </div>
      </div>

      {/* Deadline Alerts */}
      <div className="bg-card border rounded-2xl p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-bold text-sm">Deadline Alerts</h3>
          <Bell className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="space-y-3">
          {deadlineAlerts.map((alert) => (
            <div key={alert.task} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
              <Clock className={cn(
                "w-4 h-4 shrink-0",
                alert.severity === "high" ? "text-destructive" :
                alert.severity === "medium" ? "text-warning" : "text-muted-foreground"
              )} />
              <div className="flex-1">
                <p className="text-sm font-medium">{alert.task}</p>
                <p className="text-[11px] text-muted-foreground">{alert.count} students pending</p>
              </div>
              <span className="text-xs font-medium text-muted-foreground">{alert.deadline}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
