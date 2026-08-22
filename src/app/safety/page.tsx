"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertTriangle,
  Ambulance,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Flame,
  HeartPulse,
  Info,
  MapPin,
  Phone,
  Plus,
  Shield,
  ShieldAlert,
  Siren,
  UserRound,
  X,
} from "lucide-react";

const emergencyServices = [
  {
    title: "Police",
    description: "Immediate police assistance",
    number: "112",
    icon: ShieldAlert,
  },
  {
    title: "Ambulance",
    description: "Medical emergency assistance",
    number: "108",
    icon: Ambulance,
  },
  {
    title: "Fire & Rescue",
    description: "Fire and rescue services",
    number: "101",
    icon: Flame,
  },
];

const safetyGuides = [
  {
    title: "Stay safe during an emergency",
    description:
      "Move to a safe location, stay calm and contact emergency services when necessary.",
    icon: Shield,
  },
  {
    title: "If you're being followed",
    description:
      "Move towards a populated place, avoid isolated areas and contact someone you trust.",
    icon: UserRound,
  },
  {
    title: "After an incident",
    description:
      "Get to safety first, preserve useful evidence and report the incident when appropriate.",
    icon: CheckCircle2,
  },
];

export default function SafetyPage() {
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [sosActivated, setSosActivated] = useState(false);
  const [locationStatus, setLocationStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleLocationShare = () => {
    if (!navigator.geolocation) {
      setLocationStatus("error");
      return;
    }

    setLocationStatus("loading");

    navigator.geolocation.getCurrentPosition(
      () => {
        setLocationStatus("success");
      },
      () => {
        setLocationStatus("error");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  const activateSOS = () => {
    setSosActivated(true);

    window.setTimeout(() => {
      setShowSOSModal(false);
    }, 1200);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--color-background)] px-5 pb-24 pt-32 sm:px-8 sm:pt-36">
      <div className="mx-auto w-full max-w-[1100px]">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <section className="mx-auto flex w-full max-w-[850px] flex-col items-center text-center animate-[fadeUp_0.6s_ease-out]">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[var(--color-heading)]" />

            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-body)]">
              Public Safety
            </span>

            <span className="h-px w-10 bg-[var(--color-heading)]" />
          </div>

          <h1
            className="text-4xl leading-tight tracking-[-0.035em] text-[var(--color-heading)] sm:text-5xl md:text-[56px]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Safety &amp; SOS
          </h1>

          <p className="mt-5 max-w-[580px] text-center text-base leading-7 text-[var(--color-body)] sm:text-lg">
            Get immediate access to emergency help, location sharing and
            essential safety tools when you need them most.
          </p>
        </section>

        {/* =====================================================
            SOS SECTION
        ===================================================== */}

        <section className="mt-12 overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_20px_70px_rgba(107,30,42,0.08)] animate-[fadeUp_0.7s_ease-out]">

          <div className="relative px-6 py-12 text-center sm:px-10 sm:py-14">

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(107,30,42,0.025)] blur-3xl" />

            <div className="relative flex flex-col items-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(107,30,42,0.07)] text-[var(--color-heading)]">
                <Siren size={27} strokeWidth={1.7} />
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-body)]">
                Emergency assistance
              </p>

              <h2
                className="mt-3 text-3xl tracking-[-0.025em] text-[var(--color-heading)] sm:text-4xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Need immediate help?
              </h2>

              <p className="mt-4 max-w-[520px] text-center text-sm leading-6 text-[var(--color-body)] sm:text-base">
                Activate SOS when you are facing an immediate emergency.
                Your location can be used to help responders understand
                where assistance is needed.
              </p>

              {/* SOS BUTTON */}

              <div className="relative mt-10 flex h-40 w-40 items-center justify-center">

                <div
                  className={`absolute inset-0 rounded-full border border-[rgba(107,30,42,0.12)] ${
                    sosActivated
                      ? "animate-ping"
                      : "animate-[sosPulse_2.4s_ease-in-out_infinite]"
                  }`}
                />

                <div className="absolute inset-3 rounded-full border border-[rgba(107,30,42,0.08)]" />

                <button
                  type="button"
                  aria-label="Activate emergency SOS"
                  disabled={sosActivated}
                  onClick={() => setShowSOSModal(true)}
                  className={`relative flex h-28 w-28 items-center justify-center rounded-full text-xl font-bold tracking-[0.08em] text-white shadow-[0_15px_40px_rgba(107,30,42,0.22)] transition-all duration-300 ${
                    sosActivated
                      ? "cursor-default bg-[var(--color-heading)]"
                      : "bg-[var(--color-heading)] hover:scale-105 hover:shadow-[0_20px_50px_rgba(107,30,42,0.28)] active:scale-95"
                  }`}
                >
                  {sosActivated ? (
                    <CheckCircle2 size={31} strokeWidth={1.8} />
                  ) : (
                    "SOS"
                  )}
                </button>
              </div>

              <p className="mt-6 max-w-[520px] text-center text-xs leading-5 text-[var(--color-body)]">
                {sosActivated
                  ? "SOS request activated."
                  : "Use only when immediate emergency assistance is required."}
              </p>
            </div>
          </div>

          <div className="border-t border-[var(--color-border)] bg-[var(--color-surface-muted)] px-6 py-4 sm:px-10">
            <div className="mx-auto flex max-w-[720px] items-start justify-center gap-2 text-center text-xs leading-5 text-[var(--color-body)]">
              <Info
                size={15}
                className="mt-0.5 shrink-0 text-[var(--color-heading)]"
              />

              <span>
                Emergency actions may share relevant information such as
                your location with the appropriate response system.
              </span>
            </div>
          </div>
        </section>

        {/* =====================================================
            EMERGENCY SERVICES
        ===================================================== */}

        <section className="mt-14 animate-[fadeUp_0.8s_ease-out]">

          <SectionHeading
            eyebrow="Quick access"
            title="Emergency services"
            description="Contact the service you need without searching through the website."
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {emergencyServices.map((service) => {
              const Icon = service.icon;

              return (
                <a
                  key={service.title}
                  href={`tel:${service.number}`}
                  className="group rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_10px_35px_rgba(107,30,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-border-strong)] hover:shadow-[0_16px_45px_rgba(107,30,42,0.08)]"
                >
                  <div className="flex items-start justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(107,30,42,0.055)] text-[var(--color-heading)] transition-transform duration-300 group-hover:scale-105">
                      <Icon size={23} strokeWidth={1.8} />
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-heading)] transition-all duration-300 group-hover:bg-[var(--color-heading)] group-hover:text-white">
                      <Phone size={15} />
                    </div>
                  </div>

                  <h3
                    className="mt-5 text-xl text-[var(--color-heading)]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {service.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[var(--color-body)]">
                    {service.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-[var(--color-border)] pt-4">

                    <span className="text-sm font-semibold text-[var(--color-heading)]">
                      Call {service.number}
                    </span>

                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            EMERGENCY CONTACTS
        ===================================================== */}

        <section className="mt-14 animate-[fadeUp_0.9s_ease-out]">

          <SectionHeading
            eyebrow="Your safety network"
            title="Emergency contacts"
            description="Keep trusted people easy to reach when you need support."
          />

          <div className="mt-6 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_10px_40px_rgba(107,30,42,0.04)] sm:p-7">

            <div className="space-y-3">

              <ContactRow
                name="Emergency contact"
                description="Add a trusted person"
              />

              <ContactRow
                name="Family / trusted person"
                description="Add another emergency contact"
              />

            </div>

            <button
              type="button"
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[var(--color-border-strong)] px-5 text-sm font-semibold text-[var(--color-heading)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-surface-muted)] sm:w-auto"
            >
              <Plus size={17} />
              Add emergency contact
            </button>
          </div>
        </section>

        {/* =====================================================
            LOCATION SHARING
        ===================================================== */}

        <section className="mt-14 animate-[fadeUp_1s_ease-out]">

          <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_10px_40px_rgba(107,30,42,0.04)]">

            <div className="grid md:grid-cols-[1fr_0.85fr]">

              {/* LEFT */}

              <div className="p-6 sm:p-8">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(107,30,42,0.055)] text-[var(--color-heading)]">
                  <MapPin size={23} strokeWidth={1.8} />
                </div>

                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-body)]">
                  Location sharing
                </p>

                <h2
                  className="mt-2 text-2xl tracking-[-0.02em] text-[var(--color-heading)] sm:text-3xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Share your current location
                </h2>

                <p className="mt-3 max-w-[560px] text-left text-sm leading-6 text-[var(--color-body)] sm:text-base">
                  Allow JanaRaksha to access your current location so it
                  can be included with an emergency request or shared
                  with a trusted contact.
                </p>

                <button
                  type="button"
                  onClick={handleLocationShare}
                  disabled={locationStatus === "loading"}
                  className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--color-heading)] px-6 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_4px_rgba(226,183,97,0.18)] disabled:cursor-wait disabled:opacity-60"
                >
                  {locationStatus === "loading" ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Getting location...
                    </>
                  ) : locationStatus === "success" ? (
                    <>
                      <CheckCircle2 size={17} />
                      Location available
                    </>
                  ) : (
                    <>
                      <MapPin size={17} />
                      Share location
                    </>
                  )}
                </button>

                {locationStatus === "error" && (
                  <p className="mt-3 text-xs leading-5 text-[var(--color-body)]">
                    Location access was unavailable. Please check your
                    browser permissions and try again.
                  </p>
                )}
              </div>

              {/* RIGHT */}

              <div className="relative min-h-[280px] border-t border-[var(--color-border)] bg-[var(--color-surface-muted)] md:border-l md:border-t-0">

                <div className="absolute inset-0 opacity-40">

                  <div className="absolute left-[15%] top-[20%] h-px w-[70%] rotate-12 bg-[var(--color-border-strong)]" />

                  <div className="absolute left-[5%] top-[55%] h-px w-[90%] -rotate-6 bg-[var(--color-border-strong)]" />

                  <div className="absolute left-[30%] top-[10%] h-[90%] w-px rotate-[22deg] bg-[var(--color-border-strong)]" />

                  <div className="absolute left-[70%] top-[5%] h-[95%] w-px -rotate-[18deg] bg-[var(--color-border-strong)]" />

                </div>

                <div className="relative flex min-h-[280px] h-full items-center justify-center">

                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-heading)] text-white shadow-[0_10px_35px_rgba(107,30,42,0.22)]">

                    <MapPin size={27} />

                    <span className="absolute inset-0 animate-ping rounded-full border border-[var(--color-heading)] opacity-20" />

                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            SAFETY GUIDANCE
        ===================================================== */}

        <section className="mt-14 animate-[fadeUp_1.1s_ease-out]">

          <SectionHeading
            eyebrow="Stay prepared"
            title="Safety guidance"
            description="Simple actions can make a difficult situation safer."
          />

          <div className="mt-6 grid gap-4 md:grid-cols-3">

            {safetyGuides.map((guide) => {
              const Icon = guide.icon;

              return (
                <div
                  key={guide.title}
                  className="group rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_10px_35px_rgba(107,30,42,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-border-strong)]"
                >

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-surface-muted)] text-[var(--color-heading)] transition-transform duration-300 group-hover:scale-105">
                    <Icon size={21} strokeWidth={1.8} />
                  </div>

                  <h3
                    className="mt-5 text-xl leading-tight text-[var(--color-heading)]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {guide.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[var(--color-body)]">
                    {guide.description}
                  </p>

                  <button
                    type="button"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-heading)]"
                  >
                    Read guidance

                    <ChevronRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </button>

                </div>
              );
            })}

          </div>
        </section>

        {/* =====================================================
            REPORT / TRACK
        ===================================================== */}

        <section className="mt-14 flex flex-col items-center rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-6 text-center animate-[fadeUp_1.2s_ease-out] sm:p-10">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-heading)] text-white">
            <HeartPulse size={21} />
          </div>

          <h2
            className="mt-4 text-2xl text-[var(--color-heading)] sm:text-3xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Need to report an incident?
          </h2>

          <p className="mt-3 max-w-[520px] text-center text-sm leading-6 text-[var(--color-body)] sm:text-base">
            For incidents that do not require immediate emergency
            assistance, submit a complaint and track its progress.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              href="/report"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--color-heading)] px-6 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_4px_rgba(226,183,97,0.18)]"
            >
              Report a complaint

              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/track"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--color-border-strong)] bg-white px-6 text-sm font-medium text-[var(--color-heading)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-surface)]"
            >
              Track a complaint
            </Link>

          </div>
        </section>

        {/* =====================================================
            SECURITY NOTE
        ===================================================== */}

        <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs leading-5 text-[var(--color-body)]">
          <Shield
            size={14}
            className="shrink-0 text-[var(--color-heading)]"
          />

          <span>
            Your information is handled securely and according to your
            access permissions.
          </span>
        </div>

      </div>

      {/* =====================================================
          SOS MODAL
      ===================================================== */}

      {showSOSModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-5 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">

          <div className="w-full max-w-[480px] rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.18)] animate-[modalIn_0.3s_ease-out] sm:p-8">

            {!sosActivated ? (
              <>

                <div className="flex items-start justify-between gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(107,30,42,0.07)] text-[var(--color-heading)]">
                    <AlertTriangle size={23} />
                  </div>

                  <button
                    type="button"
                    aria-label="Close SOS confirmation"
                    onClick={() => setShowSOSModal(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-body)] transition-colors hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-heading)]"
                  >
                    <X size={19} />
                  </button>

                </div>

                <h2
                  className="mt-6 text-3xl text-[var(--color-heading)]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Activate emergency SOS?
                </h2>

                <p className="mt-3 text-sm leading-6 text-[var(--color-body)]">
                  Only activate SOS if you need immediate emergency
                  assistance. Your location may be used as part of the
                  emergency response.
                </p>

                <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">

                  <div className="flex items-start gap-3">

                    <MapPin
                      size={19}
                      className="mt-0.5 shrink-0 text-[var(--color-heading)]"
                    />

                    <div>
                      <p className="text-sm font-semibold text-[var(--color-heading)]">
                        Location assistance
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[var(--color-body)]">
                        Allow location access if you want your current
                        position available to the emergency workflow.
                      </p>
                    </div>

                  </div>
                </div>

                <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                  <button
                    type="button"
                    onClick={() => setShowSOSModal(false)}
                    className="min-h-12 rounded-xl border border-[var(--color-border-strong)] px-5 text-sm font-medium text-[var(--color-heading)] transition-all duration-200 hover:bg-[var(--color-surface-muted)]"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={activateSOS}
                    className="min-h-12 rounded-xl bg-[var(--color-heading)] px-6 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_4px_rgba(226,183,97,0.18)]"
                  >
                    Activate SOS
                  </button>

                </div>

              </>
            ) : (

              <div className="py-8 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-heading)] text-white animate-[scaleIn_0.3s_ease-out]">
                  <CheckCircle2 size={30} />
                </div>

                <h2
                  className="mt-6 text-3xl text-[var(--color-heading)]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  SOS activated
                </h2>

                <p className="mt-3 text-sm leading-6 text-[var(--color-body)]">
                  Your emergency request has been activated. The backend
                  emergency workflow can be connected here.
                </p>

              </div>

            )}

          </div>
        </div>
      )}

      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.7);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes sosPulse {
          0%,
          100% {
            transform: scale(0.96);
            opacity: 0.45;
          }

          50% {
            transform: scale(1.08);
            opacity: 0.9;
          }
        }

        html {
          scroll-behavior: smooth;
          scroll-padding-top: 120px;
        }
      `}</style>
    </main>
  );
}

/* ============================================================
   SECTION HEADING
============================================================ */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="w-full">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-body)]">
        {eyebrow}
      </p>

      <h2
        className="mt-2 text-3xl tracking-[-0.025em] text-[var(--color-heading)] sm:text-4xl"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h2>

      <p className="mt-2 max-w-[650px] text-left text-sm leading-6 text-[var(--color-body)] sm:text-base">
        {description}
      </p>
    </div>
  );
}

/* ============================================================
   CONTACT ROW
============================================================ */

function ContactRow({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4 sm:flex-row sm:items-center sm:justify-between">

      <div className="flex min-w-0 items-center gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-surface)] text-[var(--color-heading)]">
          <UserRound size={18} />
        </div>

        <div className="min-w-0">

          <p className="text-sm font-semibold text-[var(--color-heading)]">
            {name}
          </p>

          <p className="mt-0.5 text-xs text-[var(--color-body)]">
            {description}
          </p>

        </div>
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">

        <span className="text-xs text-[var(--color-body)]">
          Not added
        </span>

        <button
          type="button"
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[var(--color-border-strong)] px-3 text-xs font-semibold text-[var(--color-heading)] transition-colors hover:bg-[var(--color-surface)]"
        >
          <Phone size={14} />
          Call
        </button>

      </div>
    </div>
  );
}
