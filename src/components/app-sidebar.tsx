"use client";

import {
  LayoutDashboard,
  GiftIcon,
  ArrowDownToLine,
  Settings,
  Banknote,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ThemeToggleButton } from "@/components/theme-toggle-button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "People",
    icon: Users,
    href: "/people",
  },
  {
    title: "Payments",
    icon: GiftIcon,
    href: "/payments",
  },
  {
    title: "Withdrawls",
    icon: ArrowDownToLine,
    href: "/withdrawls",
  },
  {
    title: "Off-Ramp",
    icon: Banknote,
    href: "/off-ramp",
  },
  {
    title: "More",
    icon: Settings,
    href: "/more",
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-center gap-2 py-4">
          <Logo className="h-8" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-4 space-y-2 mt-12">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={`gap-4 px-6 w-full hover:bg-accent-purple/10 ${
                  pathname === item.href
                    ? `bg-accent-purple/15 text-accent-purple`
                    : ""
                }`}
                size="lg"
                data-active={pathname === item.href}
              >
                <Link href={item.href} className="font-medium">
                  <item.icon
                    className={
                      pathname === item.href ? "text-accent-purple" : ""
                    }
                    style={{ width: "24px", height: "24px" }}
                  />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <div className="p-4">
        <ThemeToggleButton isCollapsed={false} />
      </div>
    </Sidebar>
  );
}
