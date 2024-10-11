import { Button } from "@nextui-org/button";
import React from "react";
import { useNavigate } from "react-router-dom";

interface NavButtonProps {
  children: React.ReactNode;
  icon: React.ReactElement;
  isActive: boolean;
  link: string;
}

export default function NavButton({
  children,
  icon,
  link,
  isActive,
}: NavButtonProps) {
  const navigate = useNavigate();

  return (
    <Button
      className="flex justify-start font-medium w-full"
      color="primary"
      startContent={icon}
      variant={isActive ? "shadow" : "bordered"}
      onClick={() => navigate(link)}
    >
      {children}
    </Button>
  );
}
