import { getProgress, type OnboardingStep } from "@/lib/onboarding-data";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Trophy } from "lucide-react";

interface ProgressHeaderProps {
  steps: OnboardingStep[];
  studentName?: string;
}

export default function ProgressHeader({ steps, studentName = "Aryan" }: ProgressHeaderProps) {
  const progress = getProgress(steps);
  const completed = steps.filter((s) => s.status === "completed").length;

  return (
    <header className="rounded-2xl overflow-hidden gradient-hero p-6 md:p-8 text-primary-foreground relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />
        <div className="absolute top-1/2 right-1/4 w-20 h-20 rounded-full bg-white/3" />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest opacity-70 mb-2">
              Smart Onboarding Agent
            </p>
            <h1 className="font-heading text-2xl md:text-3xl font-bold mb-1">
              Hi {studentName} 👋
            </h1>
            <p className="opacity-80 text-sm md:text-base max-w-lg">
              Ready to start your journey? Complete each step to get fully set up.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2.5 backdrop-blur-sm">
            <Trophy className="w-5 h-5" />
            <div>
              <p className="text-xs opacity-70">Completed</p>
              <p className="font-heading font-bold text-lg leading-none">{completed}/{steps.length}</p>
            </div>
          </div>
        </div>

        <div className="max-w-lg">
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              {progress < 100
                ? `You're ${progress}% onboarded! ${progress >= 50 ? "Almost there 🎉" : "Keep going! 💪"}`
                : "All done! Welcome aboard! 🎓"}
            </span>
            <span className="font-bold">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2.5 bg-white/20 [&>div]:gradient-accent [&>div]:rounded-full" />
        </div>
      </div>
    </header>
  );
}
