import { onboardingSteps } from "@/lib/onboarding-data";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Clock } from "lucide-react";

const milestones = [
  { label: "Admission", period: "June 2025" },
  { label: "Month 1", period: "July 2025" },
  { label: "Month 3", period: "September 2025" },
  { label: "Semester 1 End", period: "December 2025" },
  { label: "Semester 2", period: "January 2026" },
];

export default function TimelinePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-bold text-2xl mb-1">Your Journey</h1>
        <p className="text-sm text-muted-foreground">
          Track your onboarding progress from admission to campus life.
        </p>
      </div>

      {/* Milestone Bar */}
      <div className="bg-card border rounded-2xl p-5 shadow-card">
        <h3 className="font-heading font-bold text-sm mb-4">Academic Timeline</h3>
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {milestones.map((m, i) => (
            <div key={m.label} className="flex items-center">
              <div className="flex flex-col items-center min-w-[80px]">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2",
                  i === 0 ? "bg-success border-success text-success-foreground" :
                  i === 1 ? "bg-primary border-primary text-primary-foreground" :
                  "border-muted-foreground/30 text-muted-foreground"
                )}>
                  {i === 0 ? <CheckCircle2 className="w-4 h-4" /> :
                   i === 1 ? <Clock className="w-4 h-4" /> :
                   <Circle className="w-4 h-4" />}
                </div>
                <p className="text-[11px] font-medium mt-2 text-center">{m.label}</p>
                <p className="text-[10px] text-muted-foreground">{m.period}</p>
              </div>
              {i < milestones.length - 1 && (
                <div className={cn(
                  "h-0.5 w-8 md:w-16 shrink-0",
                  i === 0 ? "bg-success" : "bg-muted"
                )} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Timeline */}
      <div className="space-y-0">
        <h3 className="font-heading font-bold text-sm mb-4">Onboarding Steps</h3>
        {onboardingSteps.map((step, i) => {
          const Icon = step.icon;
          const isCompleted = step.status === "completed";
          const isActive = step.status === "in-progress";
          const isLast = i === onboardingSteps.length - 1;

          return (
            <div key={step.id} className="flex gap-4">
              {/* Vertical line */}
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 z-10",
                  isCompleted ? "bg-success/10 text-success" :
                  isActive ? "gradient-primary text-primary-foreground shadow-glow" :
                  "bg-muted text-muted-foreground"
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                {!isLast && (
                  <div className={cn(
                    "w-0.5 flex-1 min-h-[40px]",
                    isCompleted ? "bg-success/30" : "bg-muted"
                  )} />
                )}
              </div>

              {/* Content */}
              <div className={cn("pb-6 flex-1", isLast && "pb-0")}>
                <div className={cn(
                  "bg-card border rounded-2xl p-4 transition-shadow",
                  isActive && "border-primary/20 shadow-glow"
                )}>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-heading font-semibold text-sm">{step.title}</h4>
                    <span className={cn(
                      "text-[10px] font-medium px-2 py-0.5 rounded-full",
                      isCompleted ? "bg-success/10 text-success" :
                      isActive ? "bg-primary/10 text-primary" :
                      "bg-muted text-muted-foreground"
                    )}>
                      {isCompleted ? "Done ✓" : isActive ? "In Progress" : "Upcoming"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                  <p className="text-[11px] text-muted-foreground mt-2">📅 {step.deadline}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
