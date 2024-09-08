import { Button } from '@nextui-org/button'
import React from 'react'

interface NavButtonProps {
    children: React.ReactNode;
    icon: React.ReactElement;
    isActive: boolean;
    isPending: boolean;
}

export default function NavButton({children, icon, isActive, isPending}: NavButtonProps) {
  return (
    <Button 
        color="primary"
        variant={isActive ? "shadow" : "bordered"}
        className="flex justify-start font-medium w-full"
        startContent={icon}
    >
        {children}
    </Button>
  )
}
