import React from 'react'
import { Link } from 'react-router-dom'

interface TableLinkProps {
    children: React.ReactNode
    to: string
}

export default function TableLink({children, to}: TableLinkProps) {
  return (
    <Link to={to}>
      <p className="text-primary-500 cursor-pointer transition-all hover:text-primary-700">
        {children}
      </p>
    </Link>
  )
}
