import React, { ReactNode } from "react";

interface SideBarProps {
  children: ReactNode;
}

export default function SideBar({ children }: SideBarProps) {
  return (
    <div className="w-[200px] h-screen py-[20px] px-[14px] flex flex-col gap-[30px] border-r-2 border-foreground-200">
      {children}
    </div>
  );
}
