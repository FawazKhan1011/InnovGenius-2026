import { type OnboardingStep } from "@/lib/onboarding-data";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, AlertCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepCardProps {
  step: OnboardingStep;
  onClick: (step: OnboardingStep) => void;
}

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    label: "Completed",
    badgeClass: "bg-success/10 text-success border-success/20",
    iconBg: "bg-success/10 text-success",
  },
  "in-progress": {
    icon: Clock,
    label: "In Progress",
    badgeClass: "bg-primary/10 text-primary border-primary/20",
    iconBg: "gradient-primary text-primary-foreground",
  },
  upcoming: {
    icon: ChevronRight,
    label: "Pending",
    badgeClass: "bg-pending/10 text-pending border-pending/20",
    iconBg: "bg-muted text-muted-foreground",
  },
  overdue: {
    icon: AlertCircle,
    label: "Overdue",
    badgeClass: "bg-destructive/10 text-destructive border-destructive/20",
    iconBg: "bg-destructive/10 text-destructive",
  },
};

export default function StepCard({ step, onClick }: StepCardProps) {
  const config = statusConfig[step.status];
  const StatusIcon = config.icon;
  const StepIcon = step.icon;

  return (
    <button
      onClick={() => onClick(step)}
      className={cn(
        "w-full text-left bg-card rounded-2xl border p-4 md:p-5 transition-all duration-200 hover:shadow-card hover:-translate-y-0.5 group cursor-pointer",
        step.status === "in-progress" && "border-primary/20 shadow-glow"
      )}
    >
      <div className="flex items-center gap-3 md:gap-4">
        <div
          className={cn(
            "w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105",
            config.iconBg
          )}
        >
          <StepIcon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-heading font-semibold text-sm md:text-base text-card-foreground truncate">
              {step.title}
            </h3>
            <Badge variant="outline" className={cn("text-[10px] shrink-0 rounded-full px-2", config.badgeClass)}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {config.label}
            </Badge>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">
            {step.description}
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <span className="text-[11px] text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
            {step.deadline}
          </span>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
    </button>
  );
}
