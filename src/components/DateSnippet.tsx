import { Snippet } from "@nextui-org/snippet";
import React from "react";

interface DateSnippetProps {
  children: React.ReactNode;
}

export default function DateSnippet({ children }: DateSnippetProps) {
  return (
    <Snippet hideCopyButton hideSymbol color="default">
      {children}
    </Snippet>
  );
}
