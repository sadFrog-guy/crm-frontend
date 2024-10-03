import formatDateForDisplay from '@/functions/formatDateForDisplay'
import returnEmptyContent from '@/functions/returnEmptyContent'
import returnErrorContent from '@/functions/returnErrorContent'
import TableTemplate from '@/layouts/tableTemplate'
import { Finance } from '@/types/finances'
import { Spinner } from '@nextui-org/spinner'
import { TableRow, TableCell } from '@nextui-org/table'
import { financeColumns } from '@/tableColumns/financeColumns'
import GroupName from './GroupName'
import StatusChip from './StatusChip'
import TableLink from './TableLink'
import formatFinance from '@/functions/formatFinance'
import { formatTime } from '@/functions/formatTime'
import FinanceChip from './FinanceChip';
import shortenString from '@/functions/shortenString'

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
          <TableCell>
            {shortenString(item.name)}
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
