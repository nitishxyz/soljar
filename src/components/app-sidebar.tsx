"use client";

import {
  LayoutDashboard,
  GiftIcon,
  ArrowDownToLine,
  Settings,
} from "lucide-react";

import { HeartIcon } from "@heroicons/react/24/outline";
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
import Image from "next/image";
const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Supporters",
    icon: HeartIcon,
    href: "/supporters",
  },
  {
    title: "Tips",
    icon: GiftIcon,
    href: "/tips",
  },
  {
    title: "Withdrawls",
    icon: ArrowDownToLine,
    href: "/withdrawls",
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
          <Image
            src="/meta/logo_wordmark.svg"
            alt="Logo"
            className="h-8"
            width={130}
            height={32}
          />
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
