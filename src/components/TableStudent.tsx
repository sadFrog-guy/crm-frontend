import { Student } from '@/types/students'
import { TableRow, TableCell } from '@nextui-org/table'
import StatusChip from './StatusChip'
import TableTemplate from '@/layouts/tableTemplate'
import { Spinner } from '@nextui-org/spinner'
import returnEmptyContent from '@/functions/returnEmptyContent'
import returnErrorContent from '@/functions/returnErrorContent'
import GroupName from './GroupName'
import formatDateForDisplay from '@/functions/formatDateForDisplay'
import Link from './Link'
import TableLink from './TableLink'
import { studentColumns } from '@/tableColumns/studentColumns'

interface TableStudentProps {
  students: Student[] | undefined,
  isLoading: boolean,
  isError: boolean | null
}

export default function TableStudent({students, isLoading, isError}: TableStudentProps) {
    
  function returnLoadedRows() {
    return (item: Student) => {
      return (
        <TableRow key={item.id}>
          <TableCell>
            <TableLink to={`/students/${item.id}`}>{`${item.name} ${item.surname}`}</TableLink>
          </TableCell>
          <TableCell>
            <StatusChip status={item.status}/>
          </TableCell>
          <TableCell>
            <GroupName groupId={item.group}/>
          </TableCell>
          <TableCell>
            {formatDateForDisplay(item.next_payment_date)}
          </TableCell>
          <TableCell>
            {formatDateForDisplay(item.study_start_date)}
          </TableCell>
          <TableCell>
            <Link url={`tel:${item.phone}`} canCopy={true}>{item.phone}</Link>
          </TableCell>
          <TableCell>
            <Link url={`https://wa.me/${item.whatsapp.replace("+", "")}`}>{item.whatsapp}</Link>
          </TableCell>
        </TableRow>
      )
    }
  }

  return (
    <TableTemplate
      columns={studentColumns} 
      data={students || []}
      isLoading={isLoading}
      emptyContent={isError ? returnErrorContent() : returnEmptyContent()}
      loadingContent={<Spinner size="sm" color="primary"/>}
    >
      {returnLoadedRows()}
    </TableTemplate>
  )
}
