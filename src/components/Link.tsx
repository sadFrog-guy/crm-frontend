import React, { useState } from "react";
import { Tooltip } from "@nextui-org/tooltip";

interface LinkProps {
  children: React.ReactNode;
  url: string;
  canCopy?: boolean;
  placement?: "bottom" | "top";
}

export default function Link({
  children,
  url,
  canCopy = false,
  placement = "bottom",
}: LinkProps) {
  const [isOpen, setOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (canCopy) {
      e.preventDefault();
      navigator.clipboard.writeText(String(children));
      setOpen(true);

      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("success");
        }, 2000);
      });

      promise.then(() => setOpen(false));
    }
  };

  return (
    <Tooltip
      showArrow
      content="Скопировано"
      isOpen={isOpen}
      placement={placement}
    >
      <a
        className="text-primary-500 cursor-pointer transition-all hover:text-primary-700"
        href={url}
        onClick={handleClick}
      >
        {children}
      </a>
    </Tooltip>
  );
}
