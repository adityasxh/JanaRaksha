"use client";

import { Check } from "lucide-react";

const steps = [
  "Category",
  "Details",
  "When & where",
  "Evidence",
  "Review",
];

export default function ComplaintStepper({
  currentStep,
}: {
  currentStep: number;
}) {
  return (
    <div className="w-full overflow-hidden">
      <div className="relative flex items-start justify-between px-2 sm:px-6">

        {/* Background line */}
        <div className="absolute left-[10%] right-[10%] top-5 h-[2px] bg-[var(--color-border)]" />

        {/* Progress line */}
        <div
          className="absolute left-[10%] top-5 h-[2px] bg-[var(--color-heading)] transition-all duration-700 ease-out"
          style={{
            width:
              currentStep <= 1
                ? "0%"
                : `${((currentStep - 1) / (steps.length - 1)) * 80}%`,
          }}
        />

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const completed = currentStep > stepNumber;
          const active = currentStep === stepNumber;

          return (
            <div
              key={step}
              className="relative z-10 flex min-w-0 flex-1 flex-col items-center"
            >
              {/* Circle */}
              <div
                className={`
                  flex h-10 w-10 items-center justify-center
                  rounded-full border-2
                  transition-all duration-500 ease-out
                  ${
                    completed
                      ? "scale-100 border-[var(--color-heading)] bg-[var(--color-heading)] text-white"
                      : active
                      ? "scale-110 border-[var(--color-heading)] bg-[var(--color-background)] text-[var(--color-heading)] shadow-[0_0_0_5px_rgba(107,30,42,0.08)]"
                      : "scale-100 border-[var(--color-border-strong)] bg-[var(--color-background)] text-[var(--color-body)]"
                  }
                `}
              >
                {completed ? (
                  <Check
                    size={17}
                    strokeWidth={2.5}
                    className="animate-[scaleIn_0.3s_ease-out]"
                  />
                ) : (
                  <span className="text-xs font-semibold">
                    {stepNumber}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`
                  mt-3 hidden text-center text-xs font-medium
                  transition-all duration-500
                  sm:block
                  ${
                    active || completed
                      ? "text-[var(--color-heading)]"
                      : "text-[var(--color-body)]"
                  }
                `}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}