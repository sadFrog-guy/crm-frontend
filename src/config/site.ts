export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Vite + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    // {
    //   label: "Main",
    //   href: "/",
    // },
    {
      label: "Groups",
      href: "/",
    },
    {
      label: "Students",
      href: "/students",
    },
    {
      label: "Teachers",
      href: "/teacher",
    },
    {
      label: "Lessons",
      href: "/lessons",
    },
  ],
  navMenuItems: [
    // {
    //   label: "Main",
    //   href: "/",
    // },
    {
      label: "Groups",
      href: "/",
    },
    {
      label: "Students",
      href: "/students",
    },
    {
      label: "Teachers",
      href: "/teacher",
    },
    {
      label: "Lessons",
      href: "/lessons",
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
