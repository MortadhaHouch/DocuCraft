'use client';

import Link from "next/link";
import { userData } from "../../../utils/constants";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-0 mt-8 w-full overflow-hidden pt-16 pb-8">
      <div className="pointer-events-none absolute top-0 left-1/2 z-0 h-full w-full -translate-x-1/2 select-none">
        <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl"></div>
        <div className="absolute right-1/4 -bottom-24 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl"></div>
      </div>
      <div className="glass relative mx-auto flex max-w-6xl flex-col items-center gap-8 rounded-2xl px-6 py-10 md:flex-row md:items-start md:justify-between md:gap-12 z-0">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="mb-4 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-purple-700 text-2xl font-extrabold text-white shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </span>
            <span className="bg-gradient-to-br from-purple-200 to-purple-500 bg-clip-text text-xl font-semibold tracking-tight text-transparent">
              {userData.name}
            </span>
          </Link>
          <p className="text-foreground mb-6 max-w-xs text-center text-sm md:text-left">
            {userData.name} is a software engineer based in Tunisia. He has a passion for building innovative and user-friendly applications.
          </p>
          <div className="mt-2 flex gap-3 text-purple-400">
            <Link
              href={userData.linkedin}
              aria-label="Twitter"
              className="hover:text-foreground transition"
            >
              <Linkedin/>
            </Link>
            <Link
              href={userData.github}
              aria-label="GitHub"
              className="hover:text-foreground transition"
            >
              <Github/>
            </Link>
            <Link
              href={`mailto:${userData.email}`}
              aria-label="Email"
              className="hover:text-foreground transition"
            >
              <Mail/>
            </Link>
          </div>
        </div>
        <nav className="flex w-full flex-col gap-9 text-center md:w-auto md:flex-row md:justify-end md:text-left">
          <div>
            <div className="mb-3 text-xs font-semibold tracking-widest text-purple-400 uppercase">
              {userData.name}
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-foreground/70">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground/70">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/resume" className="text-foreground/70">
                  Resume
                </Link>
              </li>
              <li>
                <Link href="/" className="text-foreground/70">
                  Updates
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="mb-3 text-xs font-semibold tracking-widest text-purple-400 uppercase">
              Company
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-foreground/70">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="mb-3 text-xs font-semibold tracking-widest text-purple-400 uppercase">
              Resources
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-foreground/70">
                  Docs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70">
                  Community
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="text-foreground relative z-10 mt-10 text-center text-xs">
        <span>&copy; 2025 {userData.name}. All rights reserved.</span>
      </div>
    </footer>
  );
}
