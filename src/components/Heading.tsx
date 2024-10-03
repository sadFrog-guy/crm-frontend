import React from 'react'

interface HeadingProps {
    children: React.ReactNode;
    size?: "xl" | "2xl" | "3xl";
}

export default function Heading({ children, size = 'xl' }: HeadingProps) {
  const sizeClass = {
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
  }[size];

  return (
    <h1 className={`font-inter font-bold ${sizeClass}`}>
      {children}
    </h1>
  );
}