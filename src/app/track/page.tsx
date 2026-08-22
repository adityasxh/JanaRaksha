"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  FileText,
  Search,
  ShieldCheck,
} from "lucide-react";

export default function TrackComplaintPage() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [complaintId, setComplaintId] = useState("");
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setPageLoaded(true);
    });

    return () => cancelAnimationFrame(timer);
  }, []);

  const handleTrack = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!complaintId.trim()) return;

    setIsTracking(true);

    setTimeout(() => {
      setIsTracking(false);
    }, 700);
  };

  return (
    <main
      className={`min-h-screen bg-[var(--color-background)] px-5 pb-24 pt-28 sm:px-8 sm:pt-32 transition-all duration-700 ease-out ${
        pageLoaded
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0"
      }`}
    >
      {/* ===================================================== */}
      {/* MASTER CONTAINER */}
      {/* ===================================================== */}

      <div className="mx-auto w-full max-w-[1100px]">

        {/* ===================================================== */}
        {/* PAGE HEADER */}
        {/* ===================================================== */}

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
            Track your complaint
          </h1>

          {/* FIXED DESCRIPTION ALIGNMENT */}
          <div className="mx-auto mt-4 w-full max-w-[760px]">
            <p className="text-center text-base leading-7 text-[var(--color-body)] sm:text-lg">
              Enter your complaint ID to see the latest status, updates and
              response progress.
            </p>
          </div>
        </section>

        {/* ===================================================== */}
        {/* SEARCH CARD */}
        {/* ===================================================== */}

        <section
          className={`mx-auto mt-11 w-full max-w-[900px] transition-all duration-700 delay-150 ease-out ${
            pageLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_12px_45px_rgba(107,30,42,0.055)] sm:p-8">

            {/* CARD HEADER */}

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[rgba(107,30,42,0.055)] text-[var(--color-heading)]">
                <Search size={23} strokeWidth={1.8} />
              </div>

              <div className="min-w-0 flex-1">
                <h2
                  className="text-2xl leading-tight tracking-[-0.02em] text-[var(--color-heading)] sm:text-3xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Find your complaint
                </h2>

                <p className="mt-1 text-sm leading-6 text-[var(--color-body)] sm:text-base">
                  Use the complaint ID you received after submitting your
                  report.
                </p>
              </div>
            </div>

            {/* SEARCH FORM */}

            <form
              onSubmit={handleTrack}
              className="mt-7"
            >
              <div className="flex w-full flex-col gap-3 sm:flex-row">

                {/* INPUT */}

                <div className="relative min-w-0 flex-1">
                  <FileText
                    size={18}
                    strokeWidth={1.8}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-body)]"
                  />

                  <input
                    id="complaintId"
                    name="complaintId"
                    type="text"
                    value={complaintId}
                    onChange={(e) =>
                      setComplaintId(e.target.value)
                    }
                    placeholder="Enter complaint ID"
                    autoComplete="off"
                    className="h-14 w-full rounded-xl border border-[var(--color-border-strong)] bg-white pl-11 pr-4 text-base text-[var(--color-heading)] outline-none transition-all duration-200 placeholder:text-[var(--color-body)]/60 focus:border-[var(--color-heading)] focus:ring-4 focus:ring-[rgba(226,183,97,0.16)]"
                  />
                </div>

                {/* BUTTON */}

                <button
                  type="submit"
                  disabled={!complaintId.trim() || isTracking}
                  className="group flex h-14 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--color-heading)] px-7 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_4px_rgba(226,183,97,0.18)] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 disabled:hover:shadow-none sm:w-[210px]"
                >
                  {isTracking ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Tracking...
                    </>
                  ) : (
                    <>
                      Track complaint

                      <ArrowRight
                        size={17}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* SECURITY MESSAGE */}

            <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-[var(--color-body)] sm:items-center">
              <ShieldCheck
                size={16}
                strokeWidth={1.8}
                className="mt-0.5 shrink-0 text-[var(--color-heading)] sm:mt-0"
              />

              <span>
                Your complaint information is protected and shown only
                according to your access permissions.
              </span>
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* EMPTY STATE */}
        {/* ===================================================== */}

        <section
          className={`mx-auto mt-12 w-full max-w-[900px] text-center transition-all duration-700 delay-300 ease-out ${
            pageLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          {/* ICON */}

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(107,30,42,0.045)] text-[var(--color-heading)]">
            <Search
              size={27}
              strokeWidth={1.7}
            />
          </div>

          {/* HEADING */}

          <h2
            className="mt-5 text-3xl leading-tight tracking-[-0.025em] text-[var(--color-heading)] sm:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Enter your complaint ID
          </h2>

          {/* FIXED DESCRIPTION ALIGNMENT */}

          <div className="mx-auto mt-3 w-full max-w-[760px]">
            <p className="text-center text-base leading-7 text-[var(--color-body)] sm:text-lg">
              Your complaint ID can be found in the confirmation you received
              after submitting your complaint.
            </p>
          </div>
        </section>

        {/* ===================================================== */}
        {/* HELP CARD */}
        {/* ===================================================== */}

        <section
          className={`mx-auto mt-12 w-full max-w-[900px] rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-6 text-center transition-all duration-700 delay-500 ease-out sm:p-7 ${
            pageLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }`}
        >
          <p className="text-sm text-[var(--color-body)]">
            Don't have your complaint ID?
          </p>

          <p className="mt-1 text-sm leading-6 text-[var(--color-body)]">
            Check the confirmation message you received after submitting
            your complaint.
          </p>

          <Link
            href="/report"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-heading)] transition-all duration-200 hover:gap-3"
          >
            Report a new complaint
            <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </main>
  );
}