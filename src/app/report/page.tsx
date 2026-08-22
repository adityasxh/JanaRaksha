"use client";

import Link from "next/link";
import { useState, type ChangeEvent, type ReactNode } from "react";

import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Flame,
  MapPin,
  MoreHorizontal,
  Shield,
  UserRound,
  Car,
  Building2,
  X,
} from "lucide-react";

import {
  createComplaint,
  type ComplaintEvidence,
} from "@/lib/complaints";

const steps = [
  { number: 1, title: "Category" },
  { number: 2, title: "Details" },
  { number: 3, title: "Location" },
  { number: 4, title: "Evidence" },
  { number: 5, title: "Review" },
];

const categories = [
  {
    id: "crime",
    title: "Crime & Theft",
    description: "Theft, robbery, fraud or suspicious activity",
    icon: Shield,
  },
  {
    id: "accident",
    title: "Road Accident",
    description: "Vehicle accidents, collisions or road hazards",
    icon: Car,
  },
  {
    id: "harassment",
    title: "Harassment",
    description: "Harassment, threats or unsafe behaviour",
    icon: UserRound,
  },
  {
    id: "public",
    title: "Public Safety",
    description: "Unsafe public spaces or infrastructure",
    icon: Building2,
  },
  {
    id: "fire",
    title: "Fire & Emergency",
    description: "Fire, smoke or immediate emergency situations",
    icon: Flame,
  },
  {
    id: "other",
    title: "Other",
    description: "Something that doesn't fit the categories above",
    icon: MoreHorizontal,
  },
];

export default function ReportPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState<"next" | "back">("next");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [incidentTitle, setIncidentTitle] = useState("");
  const [description, setDescription] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [incidentTime, setIncidentTime] = useState("");
  const [location, setLocation] = useState("");

  const [evidence, setEvidence] = useState<ComplaintEvidence[]>([]);
  const [error, setError] = useState("");
  const [submittedId, setSubmittedId] = useState("");

  /* -------------------------------------------------------
     NEXT
  ------------------------------------------------------- */

  const goNext = () => {
    setError("");

    if (currentStep === 1 && !selectedCategory) {
      setError("Please select a complaint category.");
      return;
    }

    if (currentStep === 2) {
      if (!incidentTitle.trim()) {
        setError("Please enter an incident title.");
        return;
      }

      if (!description.trim()) {
        setError("Please describe what happened.");
        return;
      }
    }

    if (currentStep === 3) {
      if (!incidentDate) {
        setError("Please select the incident date.");
        return;
      }

      if (!location.trim()) {
        setError("Please enter the incident location.");
        return;
      }
    }

    if (currentStep < 5) {
      setDirection("next");
      setCurrentStep((step) => step + 1);
    }
  };

  /* -------------------------------------------------------
     BACK
  ------------------------------------------------------- */

  const goBack = () => {
    setError("");

    if (currentStep > 1) {
      setDirection("back");
      setCurrentStep((step) => step - 1);
    }
  };

  /* -------------------------------------------------------
     EVIDENCE
  ------------------------------------------------------- */

  const handleEvidence = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    const formattedFiles: ComplaintEvidence[] = files.map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
    }));

    setEvidence(formattedFiles);
  };

  const removeEvidence = (name: string) => {
    setEvidence((files) =>
      files.filter((file) => file.name !== name),
    );
  };

  /* -------------------------------------------------------
     SUBMIT
  ------------------------------------------------------- */

  const submitComplaint = () => {
    setError("");

    if (!selectedCategory) {
      setError("Please select a complaint category.");
      return;
    }

    if (!incidentTitle.trim()) {
      setError("Please enter an incident title.");
      return;
    }

    if (!description.trim()) {
      setError("Please describe what happened.");
      return;
    }

    if (!incidentDate) {
      setError("Please select the incident date.");
      return;
    }

    if (!location.trim()) {
      setError("Please enter the incident location.");
      return;
    }

    try {
      const complaint = createComplaint({
        category: selectedCategory,
        title: incidentTitle.trim(),
        description: description.trim(),
        date: incidentDate,
        time: incidentTime,
        location: location.trim(),
        evidence,
      });

      setSubmittedId(complaint.id);
    } catch {
      setError(
        "Something went wrong while submitting your complaint. Please try again.",
      );
    }
  };

  /* -------------------------------------------------------
     SUCCESS SCREEN
  ------------------------------------------------------- */

  if (submittedId) {
    return (
      <main className="min-h-screen bg-[var(--color-background)] px-5 pb-24 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-[700px] items-center justify-center">
          <div className="w-full rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center shadow-[0_20px_70px_rgba(107,30,42,0.07)] sm:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-heading)] text-white">
              <CheckCircle2 size={38} />
            </div>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-body)]">
              Complaint submitted
            </p>

            <h1
              className="mt-3 text-4xl tracking-[-0.03em] text-[var(--color-heading)] sm:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Your complaint is received
            </h1>

            <p className="mx-auto mt-4 max-w-[520px] text-sm leading-6 text-[var(--color-body)]">
              Keep your complaint ID safe. You can use it to track the
              progress of your complaint.
            </p>

            <div className="mx-auto mt-7 max-w-[360px] rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5">
              <p className="text-xs text-[var(--color-body)]">
                Complaint ID
              </p>

              <p className="mt-2 text-2xl font-bold tracking-wide text-[var(--color-heading)]">
                {submittedId}
              </p>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={`/track?complaint=${submittedId}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--color-heading)] px-6 text-sm font-medium text-white transition-all hover:-translate-y-0.5"
              >
                Track complaint
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/my-complaints"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--color-border-strong)] px-6 text-sm font-medium text-[var(--color-heading)] transition-all hover:bg-[var(--color-surface-muted)]"
              >
                My complaints
              </Link>
            </div>

            <Link
              href="/dashboard"
              className="mt-6 inline-flex text-sm font-medium text-[var(--color-body)] hover:text-[var(--color-heading)]"
            >
              Return to dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* -------------------------------------------------------
     MAIN REPORT PAGE
  ------------------------------------------------------- */

  return (
    <main className="min-h-screen bg-[var(--color-background)] px-5 pb-24 pt-32 sm:px-8 sm:pt-36">
      <div className="mx-auto w-full max-w-[1100px]">

        {/* HEADER */}

        <section className="mb-10 text-center">
          <section className="mb-10 text-center flex flex-col items-center">
  <div className="mb-4 flex items-center justify-center gap-3">
    <span className="h-px w-10 bg-[var(--color-heading)]" />
    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-body)]">
      Public Safety
    </span>
    <span className="h-px w-10 bg-[var(--color-heading)]" />
  </div>

  <h1
    className="text-4xl tracking-[-0.03em] text-[var(--color-heading)] sm:text-5xl"
    style={{ fontFamily: "var(--font-heading)" }}
  >
    Report an incident
  </h1>

  <p className="mt-4 max-w-[560px] text-center text-base leading-7 text-[var(--color-body)] sm:text-lg sm:leading-8">
    Help make your community safer. Provide the details below and we&apos;ll make sure your complaint reaches the right place.
  </p>
</section>
        </section>

        {/* STEPPER */}

        <section className="mb-10">
          <div className="relative mx-auto max-w-[900px]">

            <div className="absolute left-[10%] right-[10%] top-6 h-[2px] bg-[var(--color-border)]" />

            <div
              className="absolute left-[10%] top-6 h-[2px] bg-[var(--color-heading)] transition-all duration-500"
              style={{
                width: `${((currentStep - 1) / 4) * 80}%`,
              }}
            />

            <div className="relative grid grid-cols-5">
              {steps.map((step) => {
                const completed = currentStep > step.number;
                const active = currentStep === step.number;

                return (
                  <div
                    key={step.number}
                    className="flex flex-col items-center"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                        completed
                          ? "border-[var(--color-heading)] bg-[var(--color-heading)] text-white"
                          : active
                            ? "border-[var(--color-heading)] bg-[var(--color-background)] text-[var(--color-heading)] shadow-[0_0_0_6px_rgba(107,30,42,0.08)]"
                            : "border-[var(--color-border-strong)] bg-[var(--color-background)] text-[var(--color-body)]"
                      }`}
                    >
                      {completed ? <Check size={19} /> : step.number}
                    </div>

                    <span
                      className={`mt-3 text-xs font-medium sm:text-sm ${
                        active || completed
                          ? "text-[var(--color-heading)]"
                          : "text-[var(--color-body)]"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FORM CARD */}

        <section
          className={`rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_15px_50px_rgba(107,30,42,0.06)] sm:p-10 ${
            direction === "next"
              ? "animate-[slideRight_0.35s_ease-out]"
              : "animate-[slideLeft_0.35s_ease-out]"
          }`}
        >

          {/* STEP 1 */}

          {currentStep === 1 && (
            <>
              <StepHeading
                step="1"
                title="What happened?"
                description="Select the category that best describes the incident."
                icon={<AlertTriangle size={20} />}
              />

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const selected = selectedCategory === category.id;

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`group relative rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-1 ${
                        selected
                          ? "border-[var(--color-heading)] bg-[var(--color-surface-muted)] shadow-[0_8px_25px_rgba(107,30,42,0.1)]"
                          : "border-[var(--color-border)] bg-white hover:border-[var(--color-border-strong)]"
                      }`}
                    >
                      {selected && (
                        <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-heading)] text-white">
                          <Check size={14} />
                        </div>
                      )}

                      <div
                        className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${
                          selected
                            ? "bg-[var(--color-heading)] text-white"
                            : "bg-[var(--color-surface-muted)] text-[var(--color-heading)]"
                        }`}
                      >
                        <Icon size={21} />
                      </div>

                      <h3 className="font-semibold text-[var(--color-heading)]">
                        {category.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[var(--color-body)]">
                        {category.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* STEP 2 */}

          {currentStep === 2 && (
            <>
              <StepHeading
                step="2"
                title="Tell us what happened"
                description="Provide a clear description of the incident."
                icon={<FileText size={20} />}
              />

              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--color-heading)]">
                    Incident title
                  </label>

                  <input
                    type="text"
                    value={incidentTitle}
                    onChange={(event) =>
                      setIncidentTitle(event.target.value)
                    }
                    placeholder="Give your complaint a short title"
                    className="h-12 w-full rounded-xl border border-[var(--color-border-strong)] bg-white px-4 text-sm text-[var(--color-heading)] outline-none focus:border-[var(--color-heading)] focus:ring-4 focus:ring-[rgba(226,183,97,0.16)]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--color-heading)]">
                    Description
                  </label>

                  <textarea
                    value={description}
                    onChange={(event) =>
                      setDescription(event.target.value)
                    }
                    rows={7}
                    placeholder="Describe what happened, when it happened and any important details..."
                    className="w-full resize-none rounded-xl border border-[var(--color-border-strong)] bg-white px-4 py-3 text-sm leading-6 text-[var(--color-heading)] outline-none focus:border-[var(--color-heading)] focus:ring-4 focus:ring-[rgba(226,183,97,0.16)]"
                  />
                </div>
              </div>
            </>
          )}

          {/* STEP 3 */}

          {currentStep === 3 && (
            <>
              <StepHeading
                step="3"
                title="Where did it happen?"
                description="Add the date, time and location of the incident."
                icon={<MapPin size={20} />}
              />

              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--color-heading)]">
                      Incident date
                    </label>

                    <input
                      type="date"
                      value={incidentDate}
                      onChange={(event) =>
                        setIncidentDate(event.target.value)
                      }
                      className="h-12 w-full rounded-xl border border-[var(--color-border-strong)] bg-white px-4 text-sm text-[var(--color-heading)] outline-none focus:border-[var(--color-heading)] focus:ring-4 focus:ring-[rgba(226,183,97,0.16)]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--color-heading)]">
                      Approximate time
                    </label>

                    <input
                      type="time"
                      value={incidentTime}
                      onChange={(event) =>
                        setIncidentTime(event.target.value)
                      }
                      className="h-12 w-full rounded-xl border border-[var(--color-border-strong)] bg-white px-4 text-sm text-[var(--color-heading)] outline-none focus:border-[var(--color-heading)] focus:ring-4 focus:ring-[rgba(226,183,97,0.16)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--color-heading)]">
                    Incident location
                  </label>

                  <input
                    type="text"
                    value={location}
                    onChange={(event) =>
                      setLocation(event.target.value)
                    }
                    placeholder="Search or enter the incident location"
                    className="h-12 w-full rounded-xl border border-[var(--color-border-strong)] bg-white px-4 text-sm text-[var(--color-heading)] outline-none focus:border-[var(--color-heading)] focus:ring-4 focus:ring-[rgba(226,183,97,0.16)]"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!navigator.geolocation) {
                      setError(
                        "Location is not supported by this browser.",
                      );
                      return;
                    }

                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        setLocation(
                          `${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`,
                        );
                        setError("");
                      },
                      () => {
                        setError(
                          "Unable to access your location. Please enter it manually.",
                        );
                      },
                    );
                  }}
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--color-border-strong)] px-5 text-sm font-medium text-[var(--color-heading)] transition-all hover:bg-[var(--color-surface-muted)]"
                >
                  <MapPin size={17} />
                  Use my current location
                </button>
              </div>
            </>
          )}

          {/* STEP 4 */}

          {currentStep === 4 && (
            <>
              <StepHeading
                step="4"
                title="Add evidence"
                description="Upload photos, videos or documents that support your complaint."
                icon={<Camera size={20} />}
              />

              <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface-muted)] p-10 text-center transition-all hover:border-[var(--color-heading)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-heading)] text-white transition-transform group-hover:scale-105">
                  <Camera size={25} />
                </div>

                <h3 className="mt-5 font-semibold text-[var(--color-heading)]">
                  Upload evidence
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--color-body)]">
                  Add photos, videos, audio or documents related to the
                  incident.
                </p>

                <span className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--color-heading)] px-5 text-sm font-medium text-white">
                  Choose files
                </span>

                <input
                  type="file"
                  multiple
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                  onChange={handleEvidence}
                  className="hidden"
                />
              </label>

              {evidence.length > 0 && (
                <div className="mt-5 space-y-2">
                  {evidence.map((file) => (
                    <div
                      key={`${file.name}-${file.size}`}
                      className="flex items-center justify-between gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-[var(--color-heading)]">
                          {file.name}
                        </p>

                        <p className="mt-1 text-xs text-[var(--color-body)]">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeEvidence(file.name)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[var(--color-body)] hover:bg-[var(--color-surface)] hover:text-[var(--color-heading)]"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* STEP 5 */}

          {currentStep === 5 && (
            <>
              <StepHeading
                step="5"
                title="Review your complaint"
                description="Check your information before submitting."
                icon={<ClipboardCheck size={20} />}
              />

              <div className="space-y-4">
                <ReviewRow
                  label="Category"
                  value={
                    categories.find(
                      (item) => item.id === selectedCategory,
                    )?.title ?? "Not selected"
                  }
                />

                <ReviewRow
                  label="Incident title"
                  value={incidentTitle || "Not provided"}
                />

                <ReviewRow
                  label="Description"
                  value={description || "Not provided"}
                />

                <ReviewRow
                  label="Date & time"
                  value={
                    incidentDate
                      ? `${incidentDate}${
                          incidentTime ? ` at ${incidentTime}` : ""
                        }`
                      : "Not provided"
                  }
                />

                <ReviewRow
                  label="Location"
                  value={location || "Not provided"}
                />

                <ReviewRow
                  label="Evidence"
                  value={
                    evidence.length > 0
                      ? `${evidence.length} file${
                          evidence.length > 1 ? "s" : ""
                        } selected`
                      : "No files uploaded"
                  }
                />
              </div>

              <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5">
                <div className="flex gap-3">
                  <Shield
                    size={20}
                    className="mt-0.5 shrink-0 text-[var(--color-heading)]"
                  />

                  <p className="text-sm leading-6 text-[var(--color-body)]">
                    Your submitted information will be handled securely and
                    routed to the appropriate authority.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* ERROR */}

          {error && (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3 text-sm text-[var(--color-heading)]">
              <AlertTriangle
                size={17}
                className="mt-0.5 shrink-0"
              />

              <span>{error}</span>
            </div>
          )}

          {/* NAVIGATION */}

          <div className="mt-10 flex items-center justify-between border-t border-[var(--color-border)] pt-6">
            <button
              type="button"
              onClick={goBack}
              disabled={currentStep === 1}
              className={`inline-flex min-h-12 items-center gap-2 rounded-xl px-5 text-sm font-medium transition-all ${
                currentStep === 1
                  ? "pointer-events-none opacity-0"
                  : "text-[var(--color-body)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-heading)]"
              }`}
            >
              <ArrowLeft size={17} />
              Back
            </button>

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={goNext}
                className="group inline-flex min-h-12 items-center gap-2 rounded-xl bg-[var(--color-heading)] px-6 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_0_0_4px_rgba(226,183,97,0.18)]"
              >
                Continue

                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={submitComplaint}
                className="group inline-flex min-h-12 items-center gap-2 rounded-xl bg-[var(--color-heading)] px-7 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_0_0_4px_rgba(226,183,97,0.18)]"
              >
                Submit complaint

                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            )}
          </div>
        </section>

        {/* SECURITY MESSAGE */}

        <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-[var(--color-body)]">
          <Shield size={14} />

          <span>
            Your complaint information is securely protected.
          </span>
        </div>
      </div>

      {/* ANIMATIONS */}

      <style jsx>{`
        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </main>
  );
}

/* -------------------------------------------------------
   STEP HEADING
------------------------------------------------------- */

function StepHeading({
  step,
  title,
  description,
  icon,
}: {
  step: string;
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-surface-muted)] text-[var(--color-heading)]">
          {icon}
        </div>

        <span className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-body)]">
          Step {step} of 5
        </span>
      </div>

      <h2
        className="text-3xl text-[var(--color-heading)]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h2>

      <p className="mt-2 text-[var(--color-body)]">
        {description}
      </p>
    </div>
  );
}

/* -------------------------------------------------------
   REVIEW ROW
------------------------------------------------------- */

function ReviewRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-body)]">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-medium leading-6 text-[var(--color-heading)]">
        {value}
      </p>
    </div>
  );
}