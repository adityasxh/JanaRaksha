"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Search,
  Shield,
  ShieldAlert,
  UserRound,
} from "lucide-react";

import {
  getComplaintStats,
  getCurrentUser,
  getMyComplaints,
  type Complaint,
  type DemoUser,
} from "@/lib/complaints";

export default function DashboardPage() {
  const [loaded, setLoaded] =
    useState(false);

  const [user, setUser] =
    useState<DemoUser | null>(null);

  const [complaints, setComplaints] =
    useState<Complaint[]>([]);

  const [stats, setStats] = useState({
    total: 0,
    submitted: 0,
    underReview: 0,
    inProgress: 0,
    resolved: 0,
  });

  useEffect(() => {
    const frame = requestAnimationFrame(
      () => {
        setLoaded(true);
        setUser(getCurrentUser());
        setComplaints(getMyComplaints());
        setStats(getComplaintStats());
      },
    );

    return () =>
      cancelAnimationFrame(frame);
  }, []);

  const displayName =
    user?.name || "Citizen";

  return (
    <main className="min-h-screen bg-[var(--color-background)] px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <div
        className={`mx-auto w-full max-w-[1100px] transition-all duration-700 ${
          loaded
            ? "translate-y-0 opacity-100"
            : "translate-y-5 opacity-0"
        }`}
      >
        {/* HEADER */}

        <section className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-body)]">
              JanaRaksha Dashboard
            </p>

            <h1
              className="mt-3 text-4xl tracking-[-0.035em] text-[var(--color-heading)] sm:text-5xl"
              style={{
                fontFamily:
                  "var(--font-heading)",
              }}
            >
              Welcome, {displayName}
            </h1>

            <p className="mt-3 max-w-[650px] text-base leading-7 text-[var(--color-body)] sm:text-lg">
              Manage your complaints, track reports
              and access safety services from one place.
            </p>
          </div>

          <Link
            href="/profile"
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-4 text-sm font-medium text-[var(--color-heading)] transition-all hover:-translate-y-0.5 hover:bg-[var(--color-surface-muted)]"
          >
            <UserRound size={17} />
            My profile
          </Link>
        </section>

        {/* STATS */}

        <section className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat
            icon={<FileText size={19} />}
            label="Total complaints"
            value={stats.total}
          />

          <Stat
            icon={<Clock3 size={19} />}
            label="Submitted"
            value={stats.submitted}
          />

          <Stat
            icon={<ShieldAlert size={19} />}
            label="In progress"
            value={
              stats.underReview +
              stats.inProgress
            }
          />

          <Stat
            icon={<CheckCircle2 size={19} />}
            label="Resolved"
            value={stats.resolved}
          />
        </section>

        {/* ACTIONS */}

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          <ActionCard
            href="/report"
            icon={<FileText size={25} />}
            eyebrow="Report an incident"
            title="Report a complaint"
            description="Submit an incident with its details, location and supporting evidence."
            button="Report now"
          />

          <ActionCard
            href="/track"
            icon={<Search size={25} />}
            eyebrow="Check progress"
            title="Track a complaint"
            description="Enter your complaint ID to see its current status and progress."
            button="Track complaint"
          />
        </section>

        {/* RECENT */}

        <section className="mt-12 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_10px_40px_rgba(107,30,42,0.04)] sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                className="text-2xl text-[var(--color-heading)] sm:text-3xl"
                style={{
                  fontFamily:
                    "var(--font-heading)",
                }}
              >
                Recent complaints
              </h2>

              <p className="mt-1 text-sm text-[var(--color-body)]">
                Your latest submitted complaints.
              </p>
            </div>

            <Link
              href="/my-complaints"
              className="hidden items-center gap-1 text-sm font-semibold text-[var(--color-heading)] sm:inline-flex"
            >
              View all
              <ArrowRight size={15} />
            </Link>
          </div>

          {complaints.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface-muted)] px-6 py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-surface)] text-[var(--color-heading)]">
                <FileText size={22} />
              </div>

              <h3
                className="mt-4 text-xl text-[var(--color-heading)]"
                style={{
                  fontFamily:
                    "var(--font-heading)",
                }}
              >
                No complaints yet
              </h3>

              <p className="mx-auto mt-2 max-w-[430px] text-sm leading-6 text-[var(--color-body)]">
                Your submitted complaints will appear
                here.
              </p>

              <Link
                href="/report"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[var(--color-heading)] px-5 py-3 text-sm font-medium text-white"
              >
                Report your first complaint
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {complaints
                .slice(0, 3)
                .map((complaint) => (
                  <div
                    key={complaint.id}
                    className="flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-[var(--color-heading)]">
                          {complaint.id}
                        </span>

                        <Status
                          status={
                            complaint.status
                          }
                        />
                      </div>

                      <p className="mt-2 truncate text-sm font-semibold text-[var(--color-heading)]">
                        {complaint.title}
                      </p>

                      <p className="mt-1 text-xs text-[var(--color-body)]">
                        {complaint.category} ·{" "}
                        {complaint.location}
                      </p>
                    </div>

                    <Link
                      href={`/track?complaint=${encodeURIComponent(complaint.id)}`}
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[var(--color-border-strong)] px-4 py-2.5 text-sm font-medium text-[var(--color-heading)]"
                    >
                      View
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                ))}
            </div>
          )}
        </section>

        {/* SAFETY */}

        <section className="mt-6 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-heading)] text-white">
                <Shield size={22} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-body)]">
                  Safety & emergency
                </p>

                <h2
                  className="mt-1 text-2xl text-[var(--color-heading)]"
                  style={{
                    fontFamily:
                      "var(--font-heading)",
                  }}
                >
                  Need immediate help?
                </h2>

                <p className="mt-2 max-w-[600px] text-sm leading-6 text-[var(--color-body)]">
                  Access SOS, emergency services,
                  location sharing and safety tools.
                </p>
              </div>
            </div>

            <Link
              href="/safety"
              className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--color-heading)] px-5 text-sm font-medium text-white"
            >
              Open Safety & SOS
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </section>

        {/* FOOTER */}

        <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-[var(--color-body)]">
          <Shield size={14} />
          Your complaint information is securely
          protected.
        </div>
      </div>
    </main>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[0_8px_30px_rgba(107,30,42,0.035)] transition-all hover:-translate-y-1 sm:p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(107,30,42,0.055)] text-[var(--color-heading)]">
          {icon}
        </div>

        <span className="text-2xl font-semibold text-[var(--color-heading)]">
          {value}
        </span>
      </div>

      <p className="mt-3 text-xs font-medium text-[var(--color-body)] sm:text-sm">
        {label}
      </p>
    </div>
  );
}

function ActionCard({
  href,
  icon,
  eyebrow,
  title,
  description,
  button,
}: {
  href: string;
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  button: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_10px_40px_rgba(107,30,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(107,30,42,0.08)] sm:p-8"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(107,30,42,0.055)] text-[var(--color-heading)]">
          {icon}
        </div>

        <ArrowRight
          size={19}
          className="transition-transform group-hover:translate-x-1"
        />
      </div>

      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-body)]">
        {eyebrow}
      </p>

      <h2
        className="mt-2 text-2xl text-[var(--color-heading)] sm:text-3xl"
        style={{
          fontFamily:
            "var(--font-heading)",
        }}
      >
        {title}
      </h2>

      <p className="mt-3 max-w-[500px] text-sm leading-6 text-[var(--color-body)]">
        {description}
      </p>

      <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--color-heading)] px-5 py-3 text-sm font-medium text-white">
        {button}
        <ArrowRight size={16} />
      </div>
    </Link>
  );
}

function Status({
  status,
}: {
  status: Complaint["status"];
}) {
  return (
    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 text-[10px] font-semibold text-[var(--color-heading)]">
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}