export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Vite + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Группы",
      href: "/",
    },
    {
      label: "Ученики",
      href: "/students",
    },
    {
      label: "Педагоги",
      href: "/teacher",
    },
    {
      label: "Уроки",
      href: "/lessons",
    },
    {
      label: "Финансы",
      href: "/finances",
    },
  ],
  navMenuItems: [
    {
      label: "Группы",
      href: "/",
    },
    {
      label: "Ученики",
      href: "/students",
    },
    {
      label: "Педагоги",
      href: "/teacher",
    },
    {
      label: "Уроки",
      href: "/lessons",
    },
    {
      label: "Финансы",
      href: "/finances",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui-docs-v2.vercel.app",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
