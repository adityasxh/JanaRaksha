"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  MapPin,
  Search,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

type ComplaintStatus =
  | "Submitted"
  | "Under Review"
  | "In Progress"
  | "Resolved";

type Complaint = {
  id: string;
  category: string;
  title: string;
  description: string;
  location: string;
  date: string;
  status: ComplaintStatus;
  updated: string;
};

const complaints: Complaint[] = [
  {
    id: "JR-2026-00124",
    category: "Crime",
    title: "Suspicious activity near residential area",
    description:
      "Reported suspicious activity observed near the residential entrance.",
    location: "Wagholi, Pune",
    date: "21 Aug 2026",
    status: "Under Review",
    updated: "Updated 2 hours ago",
  },
  {
    id: "JR-2026-00118",
    category: "Cybercrime",
    title: "Suspicious online transaction",
    description:
      "Reported an unauthorized online transaction and suspicious account activity.",
    location: "Pune, Maharashtra",
    date: "18 Aug 2026",
    status: "In Progress",
    updated: "Updated yesterday",
  },
  {
    id: "JR-2026-00097",
    category: "Emergency",
    title: "Road safety hazard",
    description:
      "Reported a damaged road section creating a potential safety hazard.",
    location: "Kharadi, Pune",
    date: "10 Aug 2026",
    status: "Resolved",
    updated: "Resolved 5 days ago",
  },
  {
    id: "JR-2026-00081",
    category: "Crime",
    title: "Street lighting and safety concern",
    description:
      "Reported a poorly lit area creating safety concerns for residents.",
    location: "Viman Nagar, Pune",
    date: "04 Aug 2026",
    status: "Submitted",
    updated: "Submitted 2 weeks ago",
  },
];

const filters = [
  "All",
  "Submitted",
  "Under Review",
  "In Progress",
  "Resolved",
];

export default function MyComplaintsPage() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setPageLoaded(true);
    });

    return () => cancelAnimationFrame(timer);
  }, []);

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const matchesFilter =
        activeFilter === "All" ||
        complaint.status === activeFilter;

      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        !query ||
        complaint.id.toLowerCase().includes(query) ||
        complaint.title.toLowerCase().includes(query) ||
        complaint.category.toLowerCase().includes(query) ||
        complaint.location.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const total = complaints.length;

  const submitted = complaints.filter(
    (item) => item.status === "Submitted"
  ).length;

  const inProgress = complaints.filter(
    (item) =>
      item.status === "Under Review" ||
      item.status === "In Progress"
  ).length;

  const resolved = complaints.filter(
    (item) => item.status === "Resolved"
  ).length;

  return (
    <main className="min-h-screen bg-[var(--color-background)] px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      {/* ====================================================== */}
      {/* MASTER CONTAINER */}
      {/* ====================================================== */}

      <div
        className={`mx-auto w-full max-w-[1100px] transition-all duration-700 ease-out ${
          pageLoaded
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0"
        }`}
      >
        {/* ====================================================== */}
        {/* PAGE HEADER */}
        {/* ====================================================== */}

        <section
          className={`mx-auto w-full max-w-[900px] text-center transition-all duration-700 ease-out ${
            pageLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-body)]">
            JanaRaksha
          </p>

          <h1
            className="mt-3 text-4xl leading-[1.05] tracking-[-0.035em] text-[var(--color-heading)] sm:text-5xl md:text-[56px]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            My complaints
          </h1>

          <div className="mx-auto mt-4 w-full max-w-[700px]">
            <p className="text-center text-base leading-7 text-[var(--color-body)] sm:text-lg">
              View your submitted complaints, monitor their progress and
              stay updated on every response.
            </p>
          </div>
        </section>

        {/* ====================================================== */}
        {/* STAT CARDS */}
        {/* ====================================================== */}

        <section
          className={`mt-10 grid grid-cols-2 gap-4 transition-all duration-700 delay-100 ease-out sm:grid-cols-4 ${
            pageLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }`}
        >
          <StatCard
            icon={<FileText size={19} strokeWidth={1.8} />}
            label="Total"
            value={total}
          />

          <StatCard
            icon={<Clock3 size={19} strokeWidth={1.8} />}
            label="Submitted"
            value={submitted}
          />

          <StatCard
            icon={<ShieldAlert size={19} strokeWidth={1.8} />}
            label="In progress"
            value={inProgress}
          />

          <StatCard
            icon={<CheckCircle2 size={19} strokeWidth={1.8} />}
            label="Resolved"
            value={resolved}
          />
        </section>

        {/* ====================================================== */}
        {/* SEARCH + FILTER */}
        {/* ====================================================== */}

        <section
          className={`mt-8 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_12px_45px_rgba(107,30,42,0.045)] transition-all duration-700 delay-150 ease-out sm:p-6 ${
            pageLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }`}
        >
          {/* Search */}

          <div className="relative">
            <Search
              size={19}
              strokeWidth={1.8}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-body)]"
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by complaint ID, category, location or title..."
              className="h-12 w-full rounded-xl border border-[var(--color-border-strong)] bg-white pl-11 pr-4 text-sm text-[var(--color-heading)] outline-none transition-all duration-200 placeholder:text-[var(--color-body)]/60 focus:border-[var(--color-heading)] focus:ring-4 focus:ring-[rgba(226,183,97,0.16)]"
            />
          </div>

          {/* Filters */}

          <div className="mt-5 flex items-center gap-3">
            <SlidersHorizontal
              size={17}
              className="hidden shrink-0 text-[var(--color-body)] sm:block"
            />

            <div className="flex w-full gap-2 overflow-x-auto pb-1">
              {filters.map((filter) => {
                const active = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                      active
                        ? "bg-[var(--color-heading)] text-white shadow-sm"
                        : "border border-[var(--color-border-strong)] bg-white text-[var(--color-body)] hover:border-[var(--color-heading)] hover:text-[var(--color-heading)]"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* COMPLAINT LIST HEADER */}
        {/* ====================================================== */}

        <div
          className={`mt-10 flex items-center justify-between transition-all duration-700 delay-200 ${
            pageLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          <div>
            <h2
              className="text-2xl tracking-[-0.02em] text-[var(--color-heading)] sm:text-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Your complaints
            </h2>

            <p className="mt-1 text-sm text-[var(--color-body)]">
              {filteredComplaints.length}{" "}
              {filteredComplaints.length === 1
                ? "complaint"
                : "complaints"}{" "}
              found
            </p>
          </div>

          <Link
            href="/report"
            className="group hidden items-center gap-2 rounded-xl bg-[var(--color-heading)] px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_4px_rgba(226,183,97,0.18)] sm:flex"
          >
            New complaint

            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* ====================================================== */}
        {/* COMPLAINT LIST */}
        {/* ====================================================== */}

        <section className="mt-5 space-y-4">
          {filteredComplaints.length > 0 ? (
            filteredComplaints.map((complaint, index) => (
              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
                index={index}
                pageLoaded={pageLoaded}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </section>

        {/* ====================================================== */}
        {/* MOBILE NEW COMPLAINT */}
        {/* ====================================================== */}

        <div className="mt-6 sm:hidden">
          <Link
            href="/report"
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-heading)] text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5"
          >
            Report a new complaint

            <ArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* ====================================================== */}
        {/* FOOT NOTE */}
        {/* ====================================================== */}

        <div
          className={`mt-10 text-center transition-all duration-700 delay-500 ${
            pageLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          <div className="mx-auto flex max-w-[700px] items-center justify-center gap-2 text-xs leading-5 text-[var(--color-body)]">
            <ShieldCheckIcon />

            <span>
              Complaint information is protected and displayed according
              to your access permissions.
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ============================================================ */
/* STAT CARD */
/* ============================================================ */

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[0_8px_30px_rgba(107,30,42,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-border-strong)] hover:shadow-[0_12px_35px_rgba(107,30,42,0.07)] sm:p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(107,30,42,0.055)] text-[var(--color-heading)] transition-transform duration-300 group-hover:scale-105">
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

/* ============================================================ */
/* COMPLAINT CARD */
/* ============================================================ */

function ComplaintCard({
  complaint,
  index,
  pageLoaded,
}: {
  complaint: Complaint;
  index: number;
  pageLoaded: boolean;
}) {
  return (
    <article
      className={`group rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_10px_40px_rgba(107,30,42,0.04)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[var(--color-border-strong)] hover:shadow-[0_16px_45px_rgba(107,30,42,0.075)] sm:p-6 ${
        pageLoaded
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0"
      }`}
      style={{
        transitionDelay: `${250 + index * 90}ms`,
      }}
    >
      {/* TOP */}

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
            className="mt-3 text-xl leading-tight tracking-[-0.015em] text-[var(--color-heading)] sm:text-2xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {complaint.title}
          </h3>

          <p className="mt-2 max-w-[720px] text-sm leading-6 text-[var(--color-body)]">
            {complaint.description}
          </p>
        </div>

        <StatusBadge status={complaint.status} />
      </div>

      {/* DETAILS */}

      <div className="mt-5 grid gap-3 border-t border-[var(--color-border)] pt-5 sm:grid-cols-3">
        <InfoItem
          icon={<CalendarDays size={16} />}
          label="Date"
          value={complaint.date}
        />

        <InfoItem
          icon={<MapPin size={16} />}
          label="Location"
          value={complaint.location}
        />

        <InfoItem
          icon={<Clock3 size={16} />}
          label="Last updated"
          value={complaint.updated}
        />
      </div>

      {/* ACTION */}

      <div className="mt-5 flex items-center justify-end border-t border-[var(--color-border)] pt-5">
        <Link
          href={`/track?complaint=${complaint.id}`}
          className="group/link inline-flex items-center gap-2 rounded-xl border border-[var(--color-border-strong)] px-4 py-2.5 text-sm font-medium text-[var(--color-heading)] transition-all duration-200 hover:border-[var(--color-heading)] hover:bg-[var(--color-surface-muted)]"
        >
          View complaint

          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover/link:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}

/* ============================================================ */
/* INFO ITEM */
/* ============================================================ */

function InfoItem({
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

/* ============================================================ */
/* STATUS BADGE */
/* ============================================================ */

function StatusBadge({
  status,
}: {
  status: ComplaintStatus;
}) {
  const styles: Record<ComplaintStatus, string> = {
    Submitted:
      "border-blue-200 bg-blue-50 text-blue-700",

    "Under Review":
      "border-yellow-200 bg-yellow-50 text-yellow-700",

    "In Progress":
      "border-orange-200 bg-orange-50 text-orange-700",

    Resolved:
      "border-green-200 bg-green-50 text-green-700",
  };

  const dots: Record<ComplaintStatus, string> = {
    Submitted: "bg-blue-500",

    "Under Review":
      "bg-yellow-500",

    "In Progress":
      "bg-orange-500",

    Resolved:
      "bg-green-500",
  };

  return (
    <span
      className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${styles[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${dots[status]}`}
      />

      {status}
    </span>
  );
}

/* ============================================================ */
/* EMPTY STATE */
/* ============================================================ */

function EmptyState() {
  return (
    <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-16 text-center shadow-[0_10px_40px_rgba(107,30,42,0.04)]">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(107,30,42,0.05)] text-[var(--color-heading)]">
        <FileText
          size={26}
          strokeWidth={1.7}
        />
      </div>

      <h3
        className="mt-5 text-2xl text-[var(--color-heading)]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        No complaints found
      </h3>

      <p className="mx-auto mt-2 max-w-[480px] text-sm leading-6 text-[var(--color-body)]">
        We couldn't find any complaints matching your search or selected
        filter.
      </p>

      <Link
        href="/report"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--color-heading)] px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5"
      >
        Report a complaint

        <ArrowRight size={16} />
      </Link>
    </div>
  );
}

/* ============================================================ */
/* SECURITY ICON */
/* ============================================================ */

function ShieldCheckIcon() {
  return (
    <ShieldCheck
      size={15}
      strokeWidth={1.8}
      className="shrink-0 text-[var(--color-heading)]"
    />
  );
}