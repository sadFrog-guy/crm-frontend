import formatDateForDisplay from '@/functions/formatDateForDisplay'
import returnEmptyContent from '@/functions/returnEmptyContent'
import returnErrorContent from '@/functions/returnErrorContent'
import TableTemplate from '@/layouts/tableTemplate'
import { Finance } from '@/types/finances'
import { Spinner } from '@nextui-org/spinner'
import { TableRow, TableCell } from '@nextui-org/table'
import { financeColumns } from '@/tableColumns/financeColumns'
import formatFinance from '@/functions/formatFinance'
import { formatTime } from '@/functions/formatTime'
import FinanceChip from './FinanceChip';
import shortenString from '@/functions/shortenString'
import ToolBarModal from './ToolBarModal'
import { useState } from 'react'
import TableLink from './TableLink';
import { Tooltip } from '@nextui-org/tooltip'

interface TableFinancesProps {
  finances: Finance[],
  isLoading: boolean,
  isError: boolean
}

export default function TableFinances({finances, isLoading, isError}: TableFinancesProps) {

  function returnLoadedRows() {
    return (item: Finance) => {
      return (
        <TableRow key={item.id}>
          <TableCell>
            <p className="text-base font-medium">{formatFinance(Number(item.amount))}</p>
          </TableCell>
          <TableCell>
            <FinanceChip value={item.category}/>
          </TableCell>
          <TableCell>
            <FinanceChip value={item.type}/>
          </TableCell>
          <TableCell>
            {formatDateForDisplay(item.date)}
          </TableCell>
          <TableCell>
            {formatTime(item.time)}
          </TableCell>
          <TableCell className='cursor-pointer'>
            <Tooltip 
              placement='left' 
              showArrow 
              className="max-w-xs text-xs" 
              content={item.name}
            >
              {item.name ? shortenString(item.name) : "---"}
            </Tooltip>
          </TableCell>
        </TableRow>
      )
    }
  }

  return (
    <TableTemplate
      columns={financeColumns} 
      data={finances || []}
      isLoading={isLoading}
      emptyContent={isError ? returnErrorContent() : returnEmptyContent()}
      loadingContent={<Spinner size="sm" color="primary"/>}
    >
      {returnLoadedRows()}
    </TableTemplate>
  )
}
