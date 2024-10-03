import TableTemplate from '@/layouts/tableTemplate'
import { Group } from '@/types/groups'
import { TableRow, TableCell } from '@nextui-org/table'
import StatusChip from './StatusChip'
import returnEmptyContent from '@/functions/returnEmptyContent'
import returnErrorContent from '@/functions/returnErrorContent'
import { Spinner } from '@nextui-org/spinner'
import returnMonthPronounced from '@/functions/returnMonthPronounced'
import formatDateForDisplay from '@/functions/formatDateForDisplay'
import TableLink from './TableLink'
import { groupColumns } from '@/tableColumns/groupColumns'

interface TableGroupProps {
  groups: Group[] | undefined,
  isLoading: boolean,
  isError: boolean | null
}

export default function TableGroup({groups, isLoading, isError}: TableGroupProps) {

  function returnLoadedRows() {
    return (item: Group) => (
      <TableRow key={item.id}>

        <TableCell>
          <TableLink to={`/${item.id}`}>{item.name}</TableLink>
        </TableCell>
        <TableCell>
          <StatusChip status={item.status}/>
        </TableCell>
        <TableCell>
          {formatDateForDisplay(item.start_date)}
        </TableCell>
        <TableCell>
          {formatDateForDisplay(item.end_date)}
        </TableCell>
        <TableCell>
          {returnMonthPronounced(item.duration_months)}
        </TableCell>
        
      </TableRow>
    )
  }

  return (
    <TableTemplate 
      isLoading={isLoading}
      emptyContent={isError ? returnErrorContent() : returnEmptyContent()}
      loadingContent={<Spinner size="sm" color="primary"/>}
      columns={groupColumns} 
      data={groups || []}
    >
      {returnLoadedRows()}
    </TableTemplate>
  )
}
