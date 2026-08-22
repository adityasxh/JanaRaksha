"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  MapPin,
  Search,
  Shield,
  ShieldAlert,
  SlidersHorizontal,
} from "lucide-react";

import {
  getMyComplaints,
  type Complaint,
  type ComplaintStatus,
} from "@/lib/complaints";

const filters: Array<
  "All" | ComplaintStatus
> = [
  "All",
  "Submitted",
  "Under Review",
  "In Progress",
  "Resolved",
];

export default function MyComplaintsPage() {
  const [loaded, setLoaded] = useState(false);

  const [complaints, setComplaints] =
    useState<Complaint[]>([]);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState<"All" | ComplaintStatus>("All");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setLoaded(true);
      setComplaints(getMyComplaints());
    });

    return () =>
      cancelAnimationFrame(frame);
  }, []);

  const filtered = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return complaints.filter((complaint) => {
      const filterMatch =
        filter === "All" ||
        complaint.status === filter;

      const searchMatch =
        !query ||
        complaint.id
          .toLowerCase()
          .includes(query) ||
        complaint.title
          .toLowerCase()
          .includes(query) ||
        complaint.category
          .toLowerCase()
          .includes(query) ||
        complaint.location
          .toLowerCase()
          .includes(query);

      return filterMatch && searchMatch;
    });
  }, [complaints, filter, search]);

  const total = complaints.length;

  const submitted = complaints.filter(
    (item) => item.status === "Submitted",
  ).length;

  const active = complaints.filter(
    (item) =>
      item.status === "Under Review" ||
      item.status === "In Progress",
  ).length;

  const resolved = complaints.filter(
    (item) => item.status === "Resolved",
  ).length;

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

        <section className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-body)]">
            JanaRaksha
          </p>

          <h1
            className="mt-3 text-4xl tracking-[-0.035em] text-[var(--color-heading)] sm:text-5xl"
            style={{
              fontFamily:
                "var(--font-heading)",
            }}
          >
            My complaints
          </h1>

          <p className="mx-auto mt-4 max-w-[700px] text-base leading-7 text-[var(--color-body)] sm:text-lg">
            View your submitted complaints, monitor
            their progress and stay updated.
          </p>
        </section>

        {/* STATS */}

        <section className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat
            icon={<FileText size={19} />}
            label="Total"
            value={total}
          />

          <Stat
            icon={<Clock3 size={19} />}
            label="Submitted"
            value={submitted}
          />

          <Stat
            icon={<ShieldAlert size={19} />}
            label="In progress"
            value={active}
          />

          <Stat
            icon={<CheckCircle2 size={19} />}
            label="Resolved"
            value={resolved}
          />
        </section>

        {/* SEARCH */}

        <section className="mt-8 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_10px_40px_rgba(107,30,42,0.04)] sm:p-6">
          <div className="relative">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-body)]"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search by complaint ID, title, category or location..."
              className="h-12 w-full rounded-xl border border-[var(--color-border-strong)] bg-white pl-11 pr-4 text-sm text-[var(--color-heading)] outline-none focus:border-[var(--color-heading)] focus:ring-4 focus:ring-[rgba(226,183,97,0.16)]"
            />
          </div>

          <div className="mt-5 flex items-center gap-3">
            <SlidersHorizontal
              size={17}
              className="hidden text-[var(--color-body)] sm:block"
            />

            <div className="flex w-full gap-2 overflow-x-auto pb-1">
              {filters.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                    filter === item
                      ? "bg-[var(--color-heading)] text-white"
                      : "border border-[var(--color-border-strong)] bg-white text-[var(--color-body)] hover:text-[var(--color-heading)]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* LIST */}

        <section className="mt-10">
          <div className="flex items-end justify-between">
            <div>
              <h2
                className="text-2xl text-[var(--color-heading)] sm:text-3xl"
                style={{
                  fontFamily:
                    "var(--font-heading)",
                }}
              >
                Your complaints
              </h2>

              <p className="mt-1 text-sm text-[var(--color-body)]">
                {filtered.length}{" "}
                {filtered.length === 1
                  ? "complaint"
                  : "complaints"}{" "}
                found
              </p>
            </div>

            <Link
              href="/report"
              className="hidden items-center gap-2 rounded-xl bg-[var(--color-heading)] px-4 py-2.5 text-sm font-medium text-white sm:inline-flex"
            >
              New complaint
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-5 space-y-4">
            {filtered.length === 0 ? (
              <EmptyState
                hasComplaints={
                  complaints.length > 0
                }
              />
            ) : (
              filtered.map((complaint, index) => (
                <ComplaintCard
                  key={complaint.id}
                  complaint={complaint}
                  index={index}
                />
              ))
            )}
          </div>
        </section>

        <div className="mt-8 flex justify-center text-xs text-[var(--color-body)]">
          <div className="flex items-center gap-2 text-center">
            <Shield
              size={14}
              className="shrink-0"
            />
            Complaint information is securely
            protected.
          </div>
        </div>
      </div>
    </main>
  );
}

/* ============================================================
   STAT
   ============================================================ */

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

/* ============================================================
   CARD
   ============================================================ */

function ComplaintCard({
  complaint,
  index,
}: {
  complaint: Complaint;
  index: number;
}) {
  return (
    <article
      className="animate-[cardIn_0.45s_ease-out] rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_10px_40px_rgba(107,30,42,0.04)] transition-all hover:-translate-y-1 sm:p-6"
      style={{
        animationDelay: `${index * 80}ms`,
        animationFillMode: "both",
      }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-[rgba(107,30,42,0.055)] px-2.5 py-1 text-xs font-semibold text-[var(--color-heading)]">
              {complaint.id}
            </span>

            <span className="text-xs text-[var(--color-body)]">
              {complaint.category}
            </span>
          </div>

          <h3
            className="mt-3 text-xl text-[var(--color-heading)] sm:text-2xl"
            style={{
              fontFamily:
                "var(--font-heading)",
            }}
          >
            {complaint.title}
          </h3>

          <p className="mt-2 max-w-[720px] text-sm leading-6 text-[var(--color-body)]">
            {complaint.description}
          </p>
        </div>

        <StatusBadge
          status={complaint.status}
        />
      </div>

      <div className="mt-5 grid gap-4 border-t border-[var(--color-border)] pt-5 sm:grid-cols-3">
        <Info
          icon={<CalendarDays size={16} />}
          label="Date"
          value={complaint.date}
        />

        <Info
          icon={<MapPin size={16} />}
          label="Location"
          value={complaint.location}
        />

        <Info
          icon={<Clock3 size={16} />}
          label="Updated"
          value={new Date(
            complaint.updatedAt,
          ).toLocaleDateString()}
        />
      </div>

      <div className="mt-5 flex justify-end border-t border-[var(--color-border)] pt-5">
        <Link
          href={`/track?complaint=${encodeURIComponent(complaint.id)}`}
          className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border-strong)] px-4 py-2.5 text-sm font-medium text-[var(--color-heading)] transition-all hover:bg-[var(--color-surface-muted)]"
        >
          View complaint
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}

/* ============================================================
   INFO
   ============================================================ */

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-surface-muted)] text-[var(--color-heading)]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-[var(--color-body)]">
          {label}
        </p>

        <p className="truncate text-sm font-medium text-[var(--color-heading)]">
          {value}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   STATUS
   ============================================================ */

function StatusBadge({
  status,
}: {
  status: ComplaintStatus;
}) {
  const styles: Record<
    ComplaintStatus,
    string
  > = {
    Submitted:
      "border-blue-200 bg-blue-50 text-blue-700",
    "Under Review":
      "border-yellow-200 bg-yellow-50 text-yellow-700",
    "In Progress":
      "border-orange-200 bg-orange-50 text-orange-700",
    Resolved:
      "border-green-200 bg-green-50 text-green-700",
  };

  return (
    <span
      className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${styles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

/* ============================================================
   EMPTY
   ============================================================ */

function EmptyState({
  hasComplaints,
}: {
  hasComplaints: boolean;
}) {
  return (
    <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(107,30,42,0.05)] text-[var(--color-heading)]">
        <FileText size={26} />
      </div>

      <h3
        className="mt-5 text-2xl text-[var(--color-heading)]"
        style={{
          fontFamily:
            "var(--font-heading)",
        }}
      >
        {hasComplaints
          ? "No matching complaints"
          : "No complaints yet"}
      </h3>

      <p className="mx-auto mt-2 max-w-[480px] text-sm leading-6 text-[var(--color-body)]">
        {hasComplaints
          ? "Try changing your search or selected filter."
          : "Your submitted complaints will appear here."}
      </p>

      {!hasComplaints && (
        <Link
          href="/report"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--color-heading)] px-5 py-3 text-sm font-medium text-white"
        >
          Report a complaint
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}