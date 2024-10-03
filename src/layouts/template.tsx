import NavButton from '@/components/NavButton'
import { siteConfig } from "@/config/site";
import Logo from "@/components/Logo";
import SideBar from "@/components/SideBar";
import { IconChart } from '@/icons/IconChart';
import { IconCalendar } from '@/icons/IconCalendar';
import { IconSchool } from '@/icons/IconSchool';
import { IconGroup } from '@/icons/IconGroup';
import { IconFinance } from '@/icons/IconFinance';
import { useLocation } from "react-router-dom";
import React from 'react';
import TopBar from '@/components/TopBar';
import { Toaster } from 'sonner';
import { useDispatch } from 'react-redux';
import { setDisabled } from '@/store/selectedRowSlice';
import { Dispatch } from '@reduxjs/toolkit';
import withStoreClear from '@/functions/decorators/withStoreClear';

interface TemplateProps {
    children: React.ReactNode;
}

export default function Template({children}: TemplateProps) {
    const dispatch = useDispatch()

    const buttons = [
        {
            content: siteConfig.navItems[0].label,
            icon: IconChart,
            to: siteConfig.navItems[0].href
        },
        {
            content: siteConfig.navItems[1].label,
            icon: IconGroup,
            to: siteConfig.navItems[1].href
        },
        {
            content: siteConfig.navItems[2].label,
            icon: IconSchool,
            to: siteConfig.navItems[2].href
        },
        {
            content: siteConfig.navItems[3].label,
            icon: IconCalendar,
            to: siteConfig.navItems[3].href
        },
        {
            content: "Финансы",
            icon: IconFinance,
            to: "/finances"
        },
    ]

    const isActivePageWithStoreClear = withStoreClear(dispatch, function isActivePage(link: string): boolean {
        const location = useLocation();

        if (location.pathname == link) {
            return true
        } else {
            return false
        }
    })

  return (
    <div className="flex">
      <SideBar>
        <Logo/>

        <div className="flex flex-col gap-5">

          {buttons.map(button => {
            const isActive = isActivePageWithStoreClear(button.to)

            return (
              <NavButton
                key={button.to}
                isActive={isActive}
                link={button.to}
                icon={<button.icon size={18} filled fill={isActive ? "#fff" : "#006FEE"} />}
              >
                {button.content}
              </NavButton>
            )
          })}
        </div>

      </SideBar>

      <div className="w-[83%] h-screen flex flex-col">
          <TopBar/>

          <div className="p-5">
            {children}
          </div>
      </div>

      <Toaster 
				position="top-right" 
				expand={true} 
        richColors
        toastOptions={{
          style: {
            background: "#fff",
            border: "2px solid #006FEE",
            color: "#006FEE",
            borderRadius: "16px"
          }
        }}
			/>
    </div>
  )
}
