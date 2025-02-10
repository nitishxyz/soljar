"use client";

import {
  LayoutDashboard,
  Users,
  GiftIcon,
  ArrowDownToLine,
  Settings,
  Beaker,
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

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Supporters",
    icon: Users,
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
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 py-4">
          <Beaker className="w-8 h-8" />
          <h1 className="text-2xl font-medium">soljar.xyz</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-4 space-y-2 mt-12">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className="gap-4 px-6  w-full"
                size="lg"
                data-active={pathname === item.href}
              >
                <a href={item.href} className="font-medium">
                  <item.icon style={{ width: "24px", height: "24px" }} />
                  <span>{item.title}</span>
                </a>
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
