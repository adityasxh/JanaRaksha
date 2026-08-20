"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, UserRound, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Report complaint", href: "/report" },
  { label: "Track complaint", href: "/track" },
  { label: "My complaints", href: "/complaints" },
  { label: "Safety & SOS", href: "/safety" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex min-h-[64px] max-w-[1200px] items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[rgba(255,250,251,0.82)] px-3 backdrop-blur-xl sm:px-4"
      >
        {/* Logo */}
        <Link
          href="/"
          className="group flex min-h-12 shrink-0 items-center gap-3 rounded-xl px-2"
        >
          <Image
            src="/JanaRaksha.svg"
            alt="JanaRaksha logo"
            width={58}
            height={58}
            priority
            className="object-contain transition-transform duration-200 group-hover:-translate-y-0.5"
          />

          <span
            className="hidden text-2xl text-[var(--color-heading)] sm:block"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
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

          <Link
            href="/register"
            className="flex min-h-11 items-center justify-center rounded-xl bg-[var(--color-heading)] px-5 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_4px_rgba(226,183,97,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-glow)]"
            style={{ color: "#ffffff" }}
          >
            Register
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

          <Link
            href="/register"
            onClick={() => setMenuOpen(false)}
            className="mt-1 flex min-h-12 items-center justify-center rounded-xl bg-[var(--color-heading)] px-4 text-sm font-medium text-white"
          >
            Register
          </Link>
        </div>
      )}
    </header>
  );
}