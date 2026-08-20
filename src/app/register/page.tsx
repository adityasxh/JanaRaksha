"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function RegisterPage() {
  // --------------------------------------------------
  // PASSWORD STATE
  // --------------------------------------------------

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --------------------------------------------------
  // PASSWORD REQUIREMENTS
  // --------------------------------------------------

  const passwordRequirements = {
    length: password.length >= 8,
    case: /[a-z]/.test(password) && /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const strengthScore = Object.values(passwordRequirements).filter(
    Boolean,
  ).length;

  const strengthInfo =
    strengthScore === 0
      ? {
          label: "Enter a password",
          color: "text-[var(--color-body)]",
          bar: "bg-[var(--color-border)]",
        }
      : strengthScore <= 2
        ? {
            label: "Weak",
            color: "text-red-600",
            bar: "bg-red-500",
          }
        : strengthScore === 3
          ? {
              label: "Good",
              color: "text-yellow-600",
              bar: "bg-yellow-500",
            }
          : {
              label: "Strong",
              color: "text-green-600",
              bar: "bg-green-500",
            };

  // --------------------------------------------------
  // PAGE ANIMATION
  // --------------------------------------------------

  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setPageLoaded(true);
    });

    return () => cancelAnimationFrame(timer);
  }, []);

  // --------------------------------------------------
  // PAGE
  // --------------------------------------------------

  return (
    <main
      className={`min-h-screen bg-[var(--color-background)] px-5 py-8 transition-all duration-700 ease-out sm:px-8 ${
        pageLoaded
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0"
      }`}
    >
      {/* HEADER */}
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/JanaRaksha.svg"
            alt="JanaRaksha"
            width={48}
            height={48}
            priority
            className="object-contain"
          />

          <span
            className="text-2xl font-bold text-[var(--color-heading)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            JanaRaksha
          </span>
        </Link>

        <Link
          href="/"
          className="text-sm font-medium text-[var(--color-body)] transition-colors hover:text-[var(--color-heading)]"
        >
          Back to home
        </Link>
      </div>

      {/* REGISTRATION */}
      <section className="flex justify-center px-1 pb-16 pt-12 sm:pt-16">
        <div className="w-full max-w-[520px]">

          {/* HEADING */}
          <div
            className={`mb-8 text-center transition-all delay-75 duration-700 ease-out ${
              pageLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-body)]">
              Welcome to JanaRaksha
            </p>

            <h1
              className="text-4xl font-bold tracking-[-0.025em] text-[var(--color-heading)] sm:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Create your account
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-7 text-[var(--color-body)]">
              Join JanaRaksha to report incidents, track complaints and access
              safety tools.
            </p>
          </div>

          {/* FORM CARD */}
          <div
            className={`rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_10px_40px_rgba(107,30,42,0.06)] transition-all delay-150 duration-700 ease-out sm:p-8 ${
              pageLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <form className="register-form-enter space-y-5">

              {/* FIRST + LAST NAME */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-[var(--color-heading)]"
                  >
                    First name
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    placeholder="First name"
                    required
                    className="h-12 w-full rounded-xl border border-[var(--color-border-strong)] bg-white px-4 text-sm text-[var(--color-heading)] outline-none transition-all placeholder:text-[var(--color-body)]/60 focus:border-[var(--color-heading)] focus:ring-4 focus:ring-[rgba(226,183,97,0.16)]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-medium text-[var(--color-heading)]"
                  >
                    Last name
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Last name"
                    required
                    className="h-12 w-full rounded-xl border border-[var(--color-border-strong)] bg-white px-4 text-sm text-[var(--color-heading)] outline-none transition-all placeholder:text-[var(--color-body)]/60 focus:border-[var(--color-heading)] focus:ring-4 focus:ring-[rgba(226,183,97,0.16)]"
                  />
                </div>

              </div>

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[var(--color-heading)]"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  className="h-12 w-full rounded-xl border border-[var(--color-border-strong)] bg-white px-4 text-sm text-[var(--color-heading)] outline-none transition-all placeholder:text-[var(--color-body)]/60 focus:border-[var(--color-heading)] focus:ring-4 focus:ring-[rgba(226,183,97,0.16)]"
                />
              </div>

              {/* PHONE */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-[var(--color-heading)]"
                >
                  Phone number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                  required
                  className="h-12 w-full rounded-xl border border-[var(--color-border-strong)] bg-white px-4 text-sm text-[var(--color-heading)] outline-none transition-all placeholder:text-[var(--color-body)]/60 focus:border-[var(--color-heading)] focus:ring-4 focus:ring-[rgba(226,183,97,0.16)]"
                />
              </div>

              {/* CREATE PASSWORD */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-[var(--color-heading)]"
                >
                  Create password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    placeholder="Create a strong password"
                    required
                    className="h-12 w-full rounded-xl border border-[var(--color-border-strong)] bg-white px-4 pr-12 text-sm text-[var(--color-heading)] outline-none transition-all placeholder:text-[var(--color-body)]/60 focus:border-[var(--color-heading)] focus:ring-4 focus:ring-[rgba(226,183,97,0.16)]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-body)] transition-colors hover:text-[var(--color-heading)]"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-[var(--color-heading)]"
                >
                  Confirm password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword ? "text" : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    autoComplete="new-password"
                    placeholder="Re-enter your password"
                    required
                    className="h-12 w-full rounded-xl border border-[var(--color-border-strong)] bg-white px-4 pr-12 text-sm text-[var(--color-heading)] outline-none transition-all placeholder:text-[var(--color-body)]/60 focus:border-[var(--color-heading)] focus:ring-4 focus:ring-[rgba(226,183,97,0.16)]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-body)] transition-colors hover:text-[var(--color-heading)]"
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {/* PASSWORD MATCH */}
                {confirmPassword.length > 0 && (
                  <p
                    className={`mt-2 text-sm font-medium ${
                      password === confirmPassword
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {password === confirmPassword
                      ? "✓ Passwords match"
                      : "Passwords do not match"}
                  </p>
                )}
              </div>

              {/* PASSWORD REQUIREMENTS */}
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-6">

                {/* HEADER */}
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-[var(--color-heading)]">
                    Password requirements
                  </h3>

                  {password.length > 0 && (
                    <span
                      className={`text-sm font-semibold transition-colors duration-300 ${strengthInfo.color}`}
                    >
                      {strengthInfo.label}
                    </span>
                  )}
                </div>

                {/* 4-LAYER STRENGTH BAR */}
                <div className="mb-5 flex gap-2">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                        level <= strengthScore
                          ? strengthInfo.bar
                          : "bg-[var(--color-border)]"
                      }`}
                    />
                  ))}
                </div>

                {/* REQUIREMENTS */}
                <div className="grid gap-3 sm:grid-cols-2">

                  <PasswordRequirement
                    valid={passwordRequirements.length}
                    text="8+ characters"
                  />

                  <PasswordRequirement
                    valid={passwordRequirements.case}
                    text="Uppercase + lowercase"
                  />

                  <PasswordRequirement
                    valid={passwordRequirements.number}
                    text="At least one number"
                  />

                  <PasswordRequirement
                    valid={passwordRequirements.special}
                    text="Special character"
                  />

                </div>
              </div>

              {/* CREATE ACCOUNT */}
              <button
                type="submit"
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-heading)] px-6 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_4px_rgba(226,183,97,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-glow)]"
                style={{ color: "#ffffff" }}
              >
                Create account

                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>

            </form>

            {/* SIGN IN */}
            <p className="mt-7 text-center text-sm text-[var(--color-body)]">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-semibold text-[var(--color-heading)] underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

// --------------------------------------------------
// PASSWORD REQUIREMENT COMPONENT
// --------------------------------------------------

function PasswordRequirement({
  valid,
  text,
}: {
  valid: boolean;
  text: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 text-base transition-all duration-300 ${
        valid
          ? "text-green-600"
          : "text-[var(--color-body)]"
      }`}
    >
      <span
        className={`font-semibold transition-all duration-300 ${
          valid ? "scale-110" : "scale-100"
        }`}
      >
        ✓
      </span>

      <span>{text}</span>
    </div>
  );
}