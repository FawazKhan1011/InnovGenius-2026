import { useState } from "react";
import { onboardingSteps } from "@/lib/onboarding-data";
import ProgressHeader from "@/components/ProgressHeader";
import StepCard from "@/components/StepCard";
import StepDetailPanel from "@/components/StepDetailPanel";
import TodaysTasks from "@/components/TodaysTasks";
import AnnouncementsCard from "@/components/AnnouncementsCard";
import DeadlinesCard from "@/components/DeadlinesCard";
import type { OnboardingStep } from "@/lib/onboarding-data";

const Index = () => {
  const [selectedStep, setSelectedStep] = useState<OnboardingStep | null>(null);

  return (
    <div className="space-y-6">
      <ProgressHeader steps={onboardingSteps} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TodaysTasks />
        <DeadlinesCard />
        <AnnouncementsCard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Steps List */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="font-heading font-bold text-lg text-foreground">
            Onboarding Journey
          </h2>
          {onboardingSteps.map((step, i) => (
            <div key={step.id} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
              <StepCard step={step} onClick={setSelectedStep} />
            </div>
          ))}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-8">
            {selectedStep ? (
              <StepDetailPanel step={selectedStep} onClose={() => setSelectedStep(null)} />
            ) : (
              <div className="bg-card border rounded-2xl p-6 text-center shadow-card">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👈</span>
                </div>
                <h3 className="font-heading font-semibold text-sm mb-1">Select a Step</h3>
                <p className="text-xs text-muted-foreground">
                  Click on any step to see its details and checklist.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
