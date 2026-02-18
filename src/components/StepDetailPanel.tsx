import { type OnboardingStep } from "@/lib/onboarding-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, X, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepDetailPanelProps {
  step: OnboardingStep | null;
  onClose: () => void;
}

export default function StepDetailPanel({ step, onClose }: StepDetailPanelProps) {
  if (!step) return null;

  const StepIcon = step.icon;

  return (
    <div className="bg-card border rounded-2xl p-5 md:p-6 shadow-card animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground">
            <StepIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-base md:text-lg">{step.title}</h2>
            <Badge variant="outline" className="text-[10px] mt-0.5 rounded-full">{step.category}</Badge>
          </div>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-muted">
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{step.description}</p>

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5 bg-muted/50 rounded-xl px-3 py-2.5">
        <Calendar className="w-4 h-4 text-primary" />
        <span>Deadline: <strong className="text-foreground">{step.deadline}</strong></span>
      </div>

      <div className="space-y-2">
        <h3 className="font-heading font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-3">
          Checklist
        </h3>
        {step.details.map((item, i) => {
          const done = step.status === "completed" || (step.status === "in-progress" && i < 1);
          return (
            <div
              key={item}
              className={cn(
                "flex items-center gap-3 text-sm p-2.5 rounded-xl transition-colors",
                done ? "text-success bg-success/5" : "text-muted-foreground hover:bg-muted/50"
              )}
            >
              {done ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <Circle className="w-4 h-4 shrink-0" />
              )}
              <span className={done ? "line-through opacity-70" : ""}>{item}</span>
            </div>
          );
        })}
      </div>

      {step.status !== "completed" && (
        <Button className="w-full mt-6 gradient-primary text-primary-foreground hover:opacity-90 transition-opacity rounded-xl h-11">
          {step.status === "in-progress" ? "Continue" : "Start"} — {step.actionLabel}
        </Button>
      )}
    </div>
  );
}
