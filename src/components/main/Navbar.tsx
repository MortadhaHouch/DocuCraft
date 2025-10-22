"use client";
import {
  Navbar as NavbarRoot,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { Info, LogIn, Magnet, Phone } from "lucide-react";

export function Navbar() {
  const navItems = [
    {
      name: "Features",
      link: "/features",
      icon:Magnet
    },
    {
      name: "Contact",
      link: "/contact",
      icon:Phone
    },
    {
      name: "About",
      link: "/about",
      icon:Info
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <NavbarRoot>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton href="/login" variant="secondary" className="py-1 px-2">Login</NavbarButton>
            <NavbarButton variant="primary" className="py-1 px-2">
              <ModeToggle className="bg-white dark:bg-dark"/>
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300 flex items-center gap-2"
              >
                <item.icon className="h-5 w-5 z-10"/>
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full flex justify-center items-center gap-2 py-1 px-2"
                href="/login"
              >
                <LogIn className="h-5 w-5 z-10"/>
                <span>Login</span>
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full flex justify-center items-center gap-2 py-1 px-2"
              >
                <ModeToggle className="bg-white dark:bg-dark"/>
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </NavbarRoot>
    </div>
  );
}