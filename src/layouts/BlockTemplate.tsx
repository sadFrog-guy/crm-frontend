import React from "react";

interface BlockTemplateProps {
  children: React.ReactNode;
}

export default function BlockTemplate({ children }: BlockTemplateProps) {
  return (
    <div className="w-full h-[50vh] flex flex-col justify-center items-center">
      <div className="w-[45wv] flex flex-col items-center gap-8">
        {children}
      </div>
    </div>
  );
}
