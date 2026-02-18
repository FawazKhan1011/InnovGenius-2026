import { onboardingSteps } from "@/lib/onboarding-data";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DeadlinesCard() {
  const upcoming = onboardingSteps.filter((s) => s.status !== "completed").slice(0, 4);

  return (
    <div className="bg-card border rounded-2xl p-5 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-bold text-sm">Upcoming Deadlines</h3>
        <Clock className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="space-y-2.5">
        {upcoming.map((step, i) => (
          <div key={step.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <div className={cn(
              "w-2 h-2 rounded-full shrink-0",
              i === 0 ? "bg-pending" : "bg-muted-foreground/30"
            )} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{step.title}</p>
            </div>
            <span className={cn(
              "text-[11px] font-medium shrink-0",
              i === 0 ? "text-pending" : "text-muted-foreground"
            )}>
              {step.deadline}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
