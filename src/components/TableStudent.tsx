// @ts-nocheck
import { TableRow, TableCell } from "@nextui-org/table";
import { Spinner } from "@nextui-org/spinner";

import StatusChip from "./StatusChip";
import GroupName from "./GroupName";
import Link from "./Link";
import TableLink from "./TableLink";

import { Student } from "@/types/students";
import TableTemplate from "@/layouts/tableTemplate";
import returnEmptyContent from "@/functions/returnEmptyContent";
import returnErrorContent from "@/functions/returnErrorContent";
import formatDateForDisplay from "@/functions/formatDateForDisplay";
import { studentColumns } from "@/tableColumns/studentColumns";

interface TableStudentProps {
  students: Student[] | undefined;
  isLoading: boolean;
  isError: boolean | null;
}

export default function TableStudent({
  students,
  isLoading,
  isError,
}: TableStudentProps) {
  function returnLoadedRows() {
    return (item: Student) => {
      return (
        <TableRow key={item.id}>
          <TableCell>
            <TableLink
              to={`/students/${item.id}`}
            >{`${item.name} ${item.surname}`}</TableLink>
          </TableCell>
          <TableCell>
            <StatusChip status={item.status} />
          </TableCell>
          <TableCell>
            <GroupName groupId={item.group} />
          </TableCell>
          <TableCell>{formatDateForDisplay(item.next_payment_date)}</TableCell>
          <TableCell>{formatDateForDisplay(item.study_start_date)}</TableCell>
          <TableCell>
            <Link canCopy={true} url={`tel:${item.phone}`}>
              {item.phone}
            </Link>
          </TableCell>
          <TableCell>
            <Link url={`https://wa.me/${item.whatsapp.replace("+", "")}`}>
              {item.whatsapp}
            </Link>
          </TableCell>
        </TableRow>
      );
    };
  }

  return (
    <TableTemplate
      columns={studentColumns}
      data={students || []}
      emptyContent={isError ? returnErrorContent() : returnEmptyContent()}
      isLoading={isLoading}
      loadingContent={<Spinner color="primary" size="sm" />}
    >
      {returnLoadedRows()}
    </TableTemplate>
  );
}
