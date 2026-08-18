"use client";

import {
  ArrowRight,
  ChevronRight,
  FileText,
  HelpCircle,
  Home,
  LockKeyhole,
  MapPin,
  Menu,
  MessageSquareText,
  Shield,
  Siren,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Report complaint", href: "/report" },
  { label: "Track complaint", href: "/track" },
  { label: "My complaints", href: "/complaints" },
  { label: "Safety & SOS", href: "/safety" },
  { label: "Help", href: "/help", icon: HelpCircle },
  { label: "About", href: "/about" },
];

const quickActions = [
  {
    icon: FileText,
    title: "Report an incident",
    description:
      "Submit a complaint with the details, evidence and location needed for response.",
    href: "/report",
  },
  {
    icon: MessageSquareText,
    title: "Track a complaint",
    description:
      "Check your complaint status, timeline and latest updates in one place.",
    href: "/track",
  },
  {
    icon: Shield,
    title: "Get safety help",
    description:
      "Access emergency tools, contacts and safety guidance when you need them.",
    href: "/safety",
  },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--color-background)]">
      {/* NAVBAR */}
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex min-h-[64px] max-w-[1200px] items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[rgba(255,250,251,0.82)] px-3 backdrop-blur-xl sm:px-4"
        >
          {/* Logo */}
          <Link
            href="/"
            className="group flex min-h-11 shrink-0 items-center gap-2 rounded-xl px-2 focus-visible:outline-none"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-heading)] text-[var(--color-text-inverse)] transition-transform duration-200 group-hover:-translate-y-0.5">
              <Shield size={21} strokeWidth={1.8} />
            </span>

            <span className="hidden font-[var(--font-heading)] text-xl text-[var(--color-heading)] sm:block">
              JanaRaksha
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="ml-auto hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`relative flex min-h-11 items-center rounded-xl px-3 text-[0.82rem] font-medium text-[var(--color-body)] transition-all duration-200 hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-heading)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-glow)] ${
                  item.label === "Home"
                    ? "text-[var(--color-heading)]"
                    : ""
                }`}
              >
                {item.label}
                {item.label === "Home" && (
                  <span className="absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--color-heading)]" />
                )}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <Link
              href="/sign-in"
              className="flex min-h-11 items-center gap-2 rounded-xl border border-[var(--color-border-strong)] px-4 text-sm font-medium text-[var(--color-heading)] transition-all duration-200 hover:border-[var(--color-glow)] hover:shadow-[0_0_0_4px_rgba(226,183,97,0.18)] focus-visible:outline-none"
            >
              <UserRound size={16} />
              Sign in
            </Link>
          </div>

          {/* Mobile menu */}
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="ml-auto flex h-11 w-11 items-center justify-center rounded-xl text-[var(--color-heading)] hover:bg-[var(--color-surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-glow)] lg:hidden"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </nav>

        {/* Mobile navigation */}
        {menuOpen && (
          <div className="mx-auto mt-2 max-w-[1200px] rounded-2xl border border-[var(--color-border)] bg-[rgba(255,250,251,0.96)] p-2 backdrop-blur-xl lg:hidden">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-12 items-center rounded-xl px-4 text-sm font-medium text-[var(--color-body)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-heading)]"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/sign-in"
              onClick={() => setMenuOpen(false)}
              className="mt-1 flex min-h-12 items-center gap-2 rounded-xl bg-[var(--color-heading)] px-4 text-sm font-medium text-[var(--color-text-inverse)]"
            >
              <UserRound size={16} />
              Sign in
            </Link>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative mx-auto flex min-h-[760px] max-w-[1200px] flex-col justify-center px-5 pb-20 pt-36 sm:px-8 lg:min-h-[820px] lg:px-10">
        {/* Decorative orbital lines */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-180px] top-[130px] h-[430px] w-[430px] rounded-full border border-[var(--color-border)] opacity-50"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-110px] top-[200px] h-[290px] w-[290px] rounded-full border border-[var(--color-border)] opacity-40"
        />

        <div className="relative z-10 max-w-3xl">
          {/* Eyebrow */}
          <div className="hero-fade-up mb-5 flex items-center gap-3 text-sm font-medium tracking-wide text-[var(--color-body)]">
            <span className="h-px w-8 bg-[var(--color-heading)]" />
            PUBLIC SAFETY & RESPONSE
          </div>

          {/* Main heading */}
          <h1 className="hero-fade-up hero-delay-1 max-w-3xl text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.98] tracking-[-0.035em]">
            When something happens,
            <br />
            <span className="text-[var(--color-heading)]">
              know what to do next.
            </span>
          </h1>

          {/* Description */}
          <p className="hero-fade-up hero-delay-2 mt-7 max-w-[650px] text-base leading-7 text-[var(--color-body)] sm:text-lg">
            JanaRaksha gives citizens one trusted place to report incidents,
            securely submit evidence and location data, track complaints, and
            access safety tools.
          </p>

          {/* CTAs */}
          <div className="hero-fade-up hero-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/report"
              className="group flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--color-heading)] px-6 font-medium text-[var(--color-text-inverse)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_4px_rgba(226,183,97,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-glow)]"
            >
              Report incident
              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/track"
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[var(--color-heading)] bg-transparent px-6 font-medium text-[var(--color-heading)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-surface)] hover:shadow-[0_0_0_4px_rgba(226,183,97,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-glow)]"
            >
              Track complaint
              <ChevronRight size={17} />
            </Link>
          </div>

          {/* Trust line */}
          <div className="hero-fade-up hero-delay-4 mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--color-body)]">
            <span className="flex items-center gap-2">
              <LockKeyhole size={15} />
              Secure evidence
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-[var(--color-border-strong)] sm:block" />

            <span className="flex items-center gap-2">
              <MapPin size={15} />
              Location-aware
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-[var(--color-border-strong)] sm:block" />

            <span>Transparent tracking</span>
          </div>
        </div>

        {/* Floating system card */}
        <div
          aria-hidden="true"
          className="hero-card-float absolute bottom-20 right-8 hidden w-[260px] rounded-2xl border border-[var(--color-border)] bg-[rgba(255,250,251,0.88)] p-5 backdrop-blur-md lg:block"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-body)]">
              Complaint flow
            </span>

            <span className="h-2 w-2 rounded-full bg-[var(--color-success)]" />
          </div>

          <div className="space-y-3">
            {["Reported", "Routed", "Tracked", "Resolved"].map(
              (step, index) => (
                <div key={step} className="flex items-center gap-3">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                      index < 2
                        ? "bg-[var(--color-heading)] text-white"
                        : "border border-[var(--color-border-strong)] text-[var(--color-body)]"
                    }`}
                  >
                    {index + 1}
                  </span>

                  <span className="text-sm text-[var(--color-body)]">
                    {step}
                  </span>

                  {index < 3 && (
                    <span className="ml-auto h-px w-5 bg-[var(--color-border)]" />
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface-muted)] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-body)]">
              Start here
            </p>

            <h2>What do you need right now?</h2>

            <p className="mt-3 max-w-xl text-[var(--color-body)]">
              Choose the action that matches your situation. You can report an
              incident, follow an existing complaint, or access safety tools.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className={`action-card group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-glow)] ${
                    index === 1 ? "md:translate-y-5" : ""
                  }`}
                >
                  <div className="mb-7 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-heading)]">
                      <Icon size={22} strokeWidth={1.8} />
                    </div>

                    <ArrowRight
                      size={19}
                      className="text-[var(--color-body)] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[var(--color-heading)]"
                    />
                  </div>

                  <h3 className="text-[1.4rem]">{action.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-[var(--color-body)]">
                    {action.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-body)]">
                How JanaRaksha works
              </p>

              <h2 className="max-w-md">
                From a report to a clear response.
              </h2>

              <p className="mt-5 max-w-lg leading-7 text-[var(--color-body)]">
                The platform is designed to reduce uncertainty. Citizens
                submit the information needed for response, then follow what
                happens next through a transparent complaint lifecycle.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["01", "Report", "Tell us what happened."],
                ["02", "Route", "Send it to the appropriate authority."],
                ["03", "Track", "Follow status and updates."],
                ["04", "Resolve", "See the outcome and closure."],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-all duration-200 hover:border-[var(--color-border-strong)] hover:shadow-[0_0_0_4px_rgba(226,183,97,0.12)]"
                >
                  <span className="text-sm font-semibold text-[var(--color-heading)]">
                    {number}
                  </span>

                  <h3 className="mt-7">{title}</h3>

                  <p className="mt-2 text-sm leading-6 text-[var(--color-body)]">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SAFETY / SOS */}
      <section className="px-5 pb-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="relative overflow-hidden rounded-3xl border border-[rgba(165,48,63,0.28)] bg-[var(--color-surface)] p-7 sm:p-10 lg:p-12">
            <div className="relative z-10 max-w-2xl">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-danger)] text-white">
                <Siren size={23} strokeWidth={1.8} />
              </div>

              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-danger)]">
                Emergency safety
              </p>

              <h2 className="mt-2">
                Need immediate safety assistance?
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-[var(--color-body)]">
                Access Emergency SOS and your configured emergency contacts.
                Emergency actions are separated from normal complaint
                reporting and protected against accidental activation.
              </p>

              <Link
                href="/safety"
                className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[var(--color-danger)] px-6 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_4px_rgba(165,48,63,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-glow)]"
              >
                Open Safety & SOS
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[var(--color-border)] px-5 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 text-sm text-[var(--color-body)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-[var(--font-heading)] text-lg text-[var(--color-heading)]">
              JanaRaksha
            </span>
            <span className="ml-3">
              Emergency Complaint & Response Platform
            </span>
          </div>

          <div className="flex flex-wrap gap-4">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Accessibility</span>
          </div>
        </div>
      </footer>
    </main>
  );
}