"use client";

import Link from "next/link";
import {
  Shield,
  MapPin,
  FileText,
  Users,
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  Lock,
  Eye,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] px-5 pb-24 pt-32 sm:px-8 sm:pt-36">

      {/* HERO */}

      <section className="mx-auto max-w-[1100px] text-center">
        <div className="mb-5 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-[var(--color-heading)]" />

          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-body)]">
            About JanaRaksha
          </span>

          <span className="h-px w-10 bg-[var(--color-heading)]" />
        </div>

        <h1
          className="mx-auto max-w-[850px] text-5xl leading-tight tracking-[-0.04em] text-[var(--color-heading)] sm:text-6xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Making public safety
          <br />
          <span className="text-[var(--color-body)]">
            simpler and more accessible.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-[720px] text-base leading-8 text-[var(--color-body)] sm:text-lg">
          JanaRaksha is a public safety and complaint management platform
          designed to give citizens one trusted place to report incidents,
          share evidence, track complaints and access essential safety tools.
        </p>
      </section>

      {/* MISSION */}

      <section className="mx-auto mt-20 max-w-[1100px]">
        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-[0_15px_50px_rgba(107,30,42,0.05)] sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-surface-muted)] text-[var(--color-heading)]">
              <HeartHandshake size={24} />
            </div>

            <h2
              className="mt-6 text-3xl text-[var(--color-heading)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Our mission
            </h2>

            <p className="mt-4 text-sm leading-7 text-[var(--color-body)] sm:text-base">
              Our mission is to make reporting public safety incidents
              straightforward, transparent and accessible to everyone.
              JanaRaksha connects citizens with a structured system where
              complaints can be submitted and followed throughout their
              journey.
            </p>
          </div>

          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-[0_15px_50px_rgba(107,30,42,0.05)] sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-surface-muted)] text-[var(--color-heading)]">
              <Shield size={24} />
            </div>

            <h2
              className="mt-6 text-3xl text-[var(--color-heading)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Why JanaRaksha?
            </h2>

            <p className="mt-4 text-sm leading-7 text-[var(--color-body)] sm:text-base">
              Safety information can be difficult to find when it matters
              most. JanaRaksha brings reporting, complaint tracking,
              location-aware tools and emergency assistance together in one
              simple platform.
            </p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}

      <section className="mx-auto mt-24 max-w-[1100px]">

        <div className="text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[var(--color-heading)]" />

            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-body)]">
              How it works
            </span>

            <span className="h-px w-8 bg-[var(--color-heading)]" />
          </div>

          <h2
            className="text-4xl text-[var(--color-heading)] sm:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            One place. Three simple steps.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">

          <FeatureCard
            number="01"
            icon={<FileText size={23} />}
            title="Report"
            description="Submit an incident with the important details, location and supporting evidence."
          />

          <FeatureCard
            number="02"
            icon={<Eye size={23} />}
            title="Track"
            description="Keep your complaint ID and follow the progress of your complaint."
          />

          <FeatureCard
            number="03"
            icon={<CheckCircle2 size={23} />}
            title="Resolve"
            description="Stay informed as your complaint moves through review, investigation and resolution."
          />

        </div>
      </section>

      {/* FEATURES */}

      <section className="mx-auto mt-24 max-w-[1100px]">

        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 sm:p-10">

          <div className="max-w-[650px]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-body)]">
              Built around citizens
            </p>

            <h2
              className="mt-3 text-3xl text-[var(--color-heading)] sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Designed for clarity when it matters.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            <SmallFeature
              icon={<MapPin size={20} />}
              title="Location aware"
              description="Use your current location to provide accurate incident information."
            />

            <SmallFeature
              icon={<Lock size={20} />}
              title="Secure evidence"
              description="Support your complaint with relevant photos, videos and documents."
            />

            <SmallFeature
              icon={<Users size={20} />}
              title="Citizen focused"
              description="A simple interface designed to make public safety reporting easier."
            />

          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="mx-auto mt-24 max-w-[900px] text-center">

        <div className="rounded-3xl bg-[var(--color-heading)] px-7 py-12 text-white sm:px-12">

          <Shield className="mx-auto" size={34} />

          <h2
            className="mt-5 text-3xl sm:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Your voice can make a difference.
          </h2>

          <p className="mx-auto mt-4 max-w-[600px] text-sm leading-7 text-white/75 sm:text-base">
            Report incidents, stay informed and help build safer communities
            with JanaRaksha.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              href="/report"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-[var(--color-heading)] transition-all hover:-translate-y-0.5"
            >
              Report an incident
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-medium text-white transition-all hover:bg-white/10"
            >
              Back to home
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}


/* ============================================================
   FEATURE CARD
============================================================ */

function FeatureCard({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="relative rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7 shadow-[0_15px_50px_rgba(107,30,42,0.05)] transition-all duration-300 hover:-translate-y-1">

      <span className="absolute right-6 top-6 text-xs font-semibold tracking-[0.15em] text-[var(--color-body)]">
        {number}
      </span>

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-surface-muted)] text-[var(--color-heading)]">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-semibold text-[var(--color-heading)]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-[var(--color-body)]">
        {description}
      </p>
    </div>
  );
}


/* ============================================================
   SMALL FEATURE
============================================================ */

function SmallFeature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-surface-muted)] text-[var(--color-heading)]">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-[var(--color-heading)]">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-[var(--color-body)]">
          {description}
        </p>
      </div>

    </div>
  );
}