"use client";

import {
  Navbar,
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
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";

export function NavbarDemo({
  logoRef,
  forceCompact = false,
}: {
  logoRef: React.RefObject<HTMLDivElement>;
  forceCompact?: boolean;
}) {
  const navItems = [
    { name: "Services", link: "/#services" },
    { name: "Expertise", link: "/#expertise" },
    { name: "Blog", link: "/blog" },
    { name: "Contact", link: "/contact" },
    { name: "Diagnostic", link: "/assessment" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full z-50">
      <Navbar className="fixed top-0 left-0 right-0 z-50">
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo ref={logoRef} />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4 z-50">
            <ThemeToggle />
            <NavbarButton href="/contact" variant="primary">
              rendez-vous
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
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <ThemeToggle />
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                rendez-vous
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}

export default NavbarDemo;
