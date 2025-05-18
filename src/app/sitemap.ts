import { MetadataRoute } from "next";

// Define a type for navigation items (consistent with your layout)
interface NavItem {
  href: string;
  title: string;
  items?: NavItem[];
}

// Define your navigation structure here (mirrors parts of your docs layout)
// In a real app, you might fetch this from a CMS or a shared config
const mainNavItems: NavItem[] = [{ href: "/docs", title: "Overview" }];

const userGuideNavItems: NavItem[] = [
  { href: "/docs/user-guide", title: "Introduction" },
  { href: "/docs/user-guide/account-setup", title: "Account Setup" },
  { href: "/docs/user-guide/your-tip-link", title: "Your Tip Link" },
  { href: "/docs/user-guide/receiving-deposits", title: "Receiving Deposits" },
  { href: "/docs/user-guide/withdrawing-funds", title: "Withdrawing Funds" },
];

const developerGuideNavItems: NavItem[] = [
  { href: "/docs/developer-guide", title: "Introduction" },
  {
    href: "/docs/developer-guide/program-architecture",
    title: "Program Architecture",
  },
  {
    title: "Instructions",
    href: "#", // Parent is not a page itself, so filter out
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
    ],
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // TODO: Replace with your actual site URL before deployment
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const staticPages = [
    "/", // Home page
    "/start", // Onboarding page (from docs)
    // Add other top-level static pages if any
  ];

  const pages: MetadataRoute.Sitemap = staticPages.map((url) => ({
    url: `${siteUrl}${url}`,
    lastModified: new Date(),
    changeFrequency: "monthly", // Or 'weekly', 'daily' depending on update frequency
    priority: url === "/" ? 1 : 0.8, // Home page higher priority
  }));

  const processNavItems = (items: NavItem[]) => {
    items.forEach((item) => {
      if (item.href && item.href !== "#") {
        pages.push({
          url: `${siteUrl}${item.href}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
      if (item.items) {
        processNavItems(item.items);
      }
    });
  };

  processNavItems(mainNavItems);
  processNavItems(userGuideNavItems);
  processNavItems(developerGuideNavItems);

  return pages;
}
