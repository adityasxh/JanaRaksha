"use client";

import Link from "next/link";
import { Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setPageLoaded(true);
    });

    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <main
      className={`min-h-screen bg-[var(--color-background)] px-5 pb-16 pt-28 sm:px-8 sm:pt-32 transition-all duration-700 ease-out ${
        pageLoaded
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[520px] flex-col">

        {/* HEADER */}
        <div
          className={`mb-8 text-center transition-all duration-700 ease-out ${
            pageLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }`}
        >
          {/* Shield */}
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-heading)] text-white">
            <ShieldCheck size={24} strokeWidth={1.8} />
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-body)]">
            Welcome back to JanaRaksha
          </p>

          <h1
            className="text-[clamp(2.8rem,7vw,4.5rem)] leading-[0.98] tracking-[-0.035em] text-[var(--color-heading)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Sign in to your account
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-7 text-[var(--color-body)]">
            Access your complaints, track reports and stay connected with
            safety tools.
          </p>
        </div>

        {/* FORM CARD */}
        <div
          className={`rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_10px_40px_rgba(107,30,42,0.06)] transition-all duration-700 delay-150 ease-out sm:p-8 ${
            pageLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <form className="space-y-5">

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
                placeholder="Enter your email address"
                className="h-12 w-full rounded-xl border border-[var(--color-border-strong)] bg-white px-4 text-sm text-[var(--color-heading)] outline-none transition-all placeholder:text-[var(--color-body)] focus:border-[var(--color-heading)] focus:ring-2 focus:ring-[rgba(107,30,42,0.12)]"
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[var(--color-heading)]"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-[var(--color-body)] transition-colors hover:text-[var(--color-heading)]"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-xl border border-[var(--color-border-strong)] bg-white px-4 pr-12 text-sm text-[var(--color-heading)] outline-none transition-all placeholder:text-[var(--color-body)] focus:border-[var(--color-heading)] focus:ring-2 focus:ring-[rgba(107,30,42,0.12)]"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-body)] transition-colors hover:text-[var(--color-heading)]"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* REMEMBER ME */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-[var(--color-border-strong)] accent-[var(--color-heading)]"
              />

              <label
                htmlFor="remember"
                className="text-sm text-[var(--color-body)]"
              >
                Remember me
              </label>
            </div>

            {/* SIGN IN BUTTON */}
            <button
              type="submit"
              className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-heading)] px-6 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_4px_rgba(226,183,97,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-glow)]"
            >
              Sign in

              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
          </form>

          {/* REGISTER LINK */}
          <div className="mt-7 border-t border-[var(--color-border)] pt-6 text-center">
            <p className="text-sm text-[var(--color-body)]">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-[var(--color-heading)] transition-opacity hover:opacity-70"
              >
                Register
              </Link>
            </p>
          </div>
        </div>

        {/* FOOTER MESSAGE */}
        <p
          className={`mt-6 text-center text-xs text-[var(--color-body)] transition-all duration-700 delay-300 ${
            pageLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          Your information is securely protected by JanaRaksha.
        </p>

      </div>
    </main>
  );
}