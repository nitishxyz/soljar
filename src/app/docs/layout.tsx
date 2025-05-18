"use client"; // Mark as a Client Component

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { Logo } from "@/components/ui/logo";

// Define a type for navigation items
interface NavItem {
  href: string;
  title: string;
  items?: NavItem[]; // For nested navigation
}

// Define your navigation structure here
const mainNavItems: NavItem[] = [{ href: "/docs", title: "Overview" }];

const userGuideNavItems: NavItem[] = [
  { href: "/docs/user-guide", title: "Introduction" },
  { href: "/docs/user-guide/account-setup", title: "Account Setup" },
  { href: "/docs/user-guide/your-tip-link", title: "Your Tip Link" },
  { href: "/docs/user-guide/receiving-deposits", title: "Receiving Deposits" },
  { href: "/docs/user-guide/withdrawing-funds", title: "Withdrawing Funds" },
  // Add more user guide links here
];

const developerGuideNavItems: NavItem[] = [
  { href: "/docs/developer-guide", title: "Introduction" },
  {
    href: "/docs/developer-guide/program-architecture",
    title: "Program Architecture",
  },
  {
    title: "Instructions",
    href: "#", // Parent is not a page itself
    items: [
      {
        href: "/docs/developer-guide/instruction-create-user",
        title: "createUser",
      },
      {
        href: "/docs/developer-guide/instruction-create-deposit",
        title: "createDeposit (SOL)",
      },
      {
        href: "/docs/developer-guide/instruction-create-spl-deposit",
        title: "createSplDeposit (SPL)",
      },
      {
        href: "/docs/developer-guide/instruction-create-withdrawl",
        title: "createWithdrawl (SOL)",
      },
      {
        href: "/docs/developer-guide/instruction-withdraw-spl-tokens",
        title: "withdrawSplTokens (SPL)",
      },
      {
        href: "/docs/developer-guide/instruction-create-supporter-index",
        title: "createSupporterIndex",
      },
      // Add more instruction links here as they are created
    ],
  },
  // Add more developer guide links here (e.g., for state accounts, error handling)
];

function NavLinks({ items, heading }: { items: NavItem[]; heading?: string }) {
  const pathname = usePathname(); // Get current pathname
  if (!items || items.length === 0) return null;

  return (
    <div className="mb-6">
      {heading && (
        <h4 className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
          {heading}
        </h4>
      )}
      <ul className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              {" "}
              {/* Use item.href for key if it's unique, or item.title if href can be '#' */}
              <Link
                href={item.href}
                className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                  isActive
                    ? "bg-muted text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {item.title}
              </Link>
              {/* For nested active state, you might need to check if pathname starts with parent href */}
              {item.items && item.items.length > 0 && (
                <ul
                  className={`pl-5 mt-1 space-y-1 border-l border-border ml-3 ${
                    isActive ? "border-primary" : "border-border"
                  }`}
                >
                  <NavLinks items={item.items} />
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // TODO: Implement mobile navigation functionality (e.g., a drawer)
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Backdrop for mobile menu (click outside to close) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 flex w-64 shrink-0 flex-col border-r border-border bg-card transition-transform duration-300 ease-in-out lg:flex lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header (Logo/Title) */}
        <div className="flex h-16 items-center border-b border-border px-4 sm:px-6">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
            {/* Logo added */}
          </Link>
        </div>

        {/* Scrollable Navigation Area */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 sm:px-4">
          {" "}
          {/* Adjusted padding */}
          <NavLinks items={mainNavItems} />
          <NavLinks items={userGuideNavItems} heading="User Guide" />
          <NavLinks items={developerGuideNavItems} heading="Developer Guide" />
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64">
        {" "}
        {/* Ensure this padding matches sidebar width */}
        {/* Mobile Header */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
            {/* Logo added to mobile header */}
          </Link>
          {/* Mobile Nav Toggle Button - Functionality to be added */}
          <button
            className="rounded-md p-2 text-foreground lg:hidden"
            onClick={toggleMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <span className="sr-only">Open menu</span>
          </button>
        </header>
        <main className="container mx-auto max-w-screen-xl px-4 py-8 sm:px-6 md:py-12">
          {children}
        </main>
        <footer className="mt-16 border-t border-border/40 py-8">
          <div className="container flex flex-col items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Built by Soljar Team.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
