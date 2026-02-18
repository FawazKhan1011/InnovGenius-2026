import { onboardingSteps } from "@/lib/onboarding-data";
import { cn } from "@/lib/utils";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function TodaysTasks() {
  const activeTasks = onboardingSteps.filter(
    (s) => s.status === "in-progress" || s.status === "overdue"
  );
  const upcomingTasks = onboardingSteps.filter((s) => s.status === "upcoming").slice(0, 2);
  const tasks = [...activeTasks, ...upcomingTasks];

  return (
    <div className="bg-card border rounded-2xl p-5 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-bold text-sm">Today's Tasks</h3>
        <span className="text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
          {activeTasks.length} active
        </span>
      </div>
      <div className="space-y-2.5">
        {tasks.map((task) => {
          const Icon = task.icon;
          const isActive = task.status === "in-progress";
          return (
            <div
              key={task.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl transition-colors cursor-pointer",
                isActive ? "bg-primary/5 border border-primary/10" : "hover:bg-muted/50"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                isActive ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-medium truncate", isActive && "text-primary")}>{task.title}</p>
                <p className="text-[11px] text-muted-foreground">{task.actionLabel}</p>
              </div>
              {isActive ? (
                <ArrowRight className="w-4 h-4 text-primary shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-muted-foreground/40 shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
