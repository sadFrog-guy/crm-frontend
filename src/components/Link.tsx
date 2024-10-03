import React, { useState } from 'react';
import {Tooltip} from "@nextui-org/tooltip";

interface LinkProps {
  children: React.ReactNode;
  url: string;
  canCopy?: boolean;
  placement?: 'bottom' | 'top'
}

export default function Link({ children, url, canCopy = false, placement = 'bottom' }: LinkProps) {
  const [isOpen, setOpen] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (canCopy) {
      e.preventDefault(); 
      navigator.clipboard.writeText(String(children))
      setOpen(true)

      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("success")
        }, 2000)
      })

      promise.then(() => setOpen(false))
    }
  };

  return (
    <Tooltip content="Скопировано" placement={placement} isOpen={isOpen} showArrow>
      <a
        href={url}
        onClick={handleClick}
        className="text-primary-500 cursor-pointer transition-all hover:text-primary-700"
      >
        {children}
      </a>
    </Tooltip>
  );
}
