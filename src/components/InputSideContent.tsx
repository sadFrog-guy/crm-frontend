import React from 'react'

interface InputSideContentProps {
  children: React.ReactNode
}

export default function InputSideContent({children}: InputSideContentProps) {
  return (
    <p className="text-default-600 font-medium text-sm">{children}</p>
  )
}
