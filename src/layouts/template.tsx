import { useLocation } from "react-router-dom";
import React from "react";
import { Toaster } from "sonner";
import { useDispatch } from "react-redux";

import NavButton from "@/components/NavButton";
import { siteConfig } from "@/config/site";
import Logo from "@/components/Logo";
import SideBar from "@/components/SideBar";
import { IconChart } from "@/icons/IconChart";
import { IconCalendar } from "@/icons/IconCalendar";
import { IconSchool } from "@/icons/IconSchool";
import { IconGroup } from "@/icons/IconGroup";
import { IconFinance } from "@/icons/IconFinance";
import TopBar from "@/components/TopBar";
import withStoreClear from "@/functions/decorators/withStoreClear";

interface TemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: TemplateProps) {
  const dispatch = useDispatch();

  const buttons = [
    {
      content: siteConfig.navItems[0].label,
      icon: IconChart,
      to: siteConfig.navItems[0].href,
    },
    {
      content: siteConfig.navItems[1].label,
      icon: IconGroup,
      to: siteConfig.navItems[1].href,
    },
    {
      content: siteConfig.navItems[2].label,
      icon: IconSchool,
      to: siteConfig.navItems[2].href,
    },
    {
      content: siteConfig.navItems[3].label,
      icon: IconCalendar,
      to: siteConfig.navItems[3].href,
    },
    {
      content: "Финансы",
      icon: IconFinance,
      to: "/finances",
    },
  ];

  const isActivePageWithStoreClear = withStoreClear(
    dispatch,
    function useIsActivePage(link: string): boolean {
      const location = useLocation();

      if (location.pathname == link) {
        return true;
      } else {
        return false;
      }
    },
  );

  return (
    <div className="flex pl-[200px]">
      <SideBar>
        <Logo />

        <div className="flex flex-col gap-5">
          {buttons.map((button) => {
            const isActive = isActivePageWithStoreClear(button.to);

            return (
              <NavButton
                key={button.to}
                icon={
                  <button.icon
                    filled
                    fill={isActive ? "#fff" : "#006FEE"}
                    size={18}
                  />
                }
                isActive={isActive}
                isOnDevelopment={button.content === "Педагоги" || button.content === "Уроки" ? true : false}
                link={button.to}
              >
                {button.content}
              </NavButton>
            );
          })}
        </div>
      </SideBar>

      <div className="w-full h-screen flex flex-col">
        <TopBar />

        <div className="p-5">{children}</div>
      </div>

      <Toaster
        richColors
        expand={false}
        position="top-right"
        toastOptions={{
          style: {
            background: "#fff",
            border: "2px solid #006FEE",
            color: "#006FEE",
            borderRadius: "16px",
          },
          duration: 3000,
        }}
      />
    </div>
  );
}
