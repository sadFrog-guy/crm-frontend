// @ts-nocheck
import { Spinner } from "@nextui-org/spinner";
import { TableRow, TableCell } from "@nextui-org/table";

import GroupName from "./GroupName";
import StatusChip from "./StatusChip";
import TableLink from "./TableLink";
import GenderChip from "./GenderChip";

import formatDateForDisplay from "@/functions/formatDateForDisplay";
import returnEmptyContent from "@/functions/returnEmptyContent";
import returnErrorContent from "@/functions/returnErrorContent";
import TableTemplate from "@/layouts/TableTemplate";
import { Teacher } from "@/types/teachers";
import formatFinance from "@/functions/formatFinance";
import { teacherColumns } from "@/tableColumns/teacherColumns";

interface TableTeacherProps {
  teachers: Teacher[] | undefined;
  isLoading: boolean;
  isError: boolean | null;
}

export default function TableTeacher({
  teachers,
  isLoading,
  isError,
}: TableTeacherProps) {
  // const { data: schedules, isLoading: schedulesAreLoading, isError: schedulesIsError } = useGetWorkScheduleQuery(
  //   group?.id,
  //   { skip: !group }
  // );

  function returnLoadedRows() {
    return (item: Teacher) => {
      return (
        <TableRow key={item.id}>
          <TableCell>
            <TableLink
              to={`/teacher/${item.id}`}
            >{`${item.name} ${item.surname}`}</TableLink>
          </TableCell>
          <TableCell>
            <StatusChip status={item.status} />
          </TableCell>
          <TableCell>
            <GenderChip gender={item.sex} />
          </TableCell>
          <TableCell>
            <GroupName groupId={item.group} />
          </TableCell>
          <TableCell>{formatFinance(Number(item.salary_rate))}</TableCell>
          <TableCell>{formatDateForDisplay(item.next_payment_date)}</TableCell>
        </TableRow>
      );
    };
  }

  return (
    <TableTemplate
      columns={teacherColumns}
      data={teachers || []}
      emptyContent={isError ? returnErrorContent() : returnEmptyContent()}
      isLoading={isLoading}
      loadingContent={<Spinner color="primary" size="sm" />}
    >
      {returnLoadedRows()}
    </TableTemplate>
  );
}
