import { Button } from '@nextui-org/button'
import React from 'react'
import { useNavigate } from "react-router-dom";

interface NavButtonProps {
    children: React.ReactNode;
    icon: React.ReactElement;
    isActive: boolean;
    link: string;
}

export default function NavButton({children, icon, link, isActive}: NavButtonProps) {
  const navigate = useNavigate();

  return (
    <Button 
      onClick={() => navigate(link)}
      color="primary"
      variant={isActive ? "shadow" : "bordered"}
      className="flex justify-start font-medium w-full"
      startContent={icon}
    >
        {children}
    </Button>
  )
}
