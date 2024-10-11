import React from 'react'
import { Link } from 'react-router-dom'

interface TableLinkProps {
    children: React.ReactNode
    to: string,
    onClick?: () => void
}

export default function TableLink({children, to, onClick}: TableLinkProps) {
  return (
    <Link to={to} onClick={onClick}>
      <p className="text-primary-500 cursor-pointer transition-all hover:text-primary-700">
        {children}
      </p>
    </Link>
  )
}
