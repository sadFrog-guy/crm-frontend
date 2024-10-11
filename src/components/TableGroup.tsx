// @ts-nocheck
import { TableRow, TableCell } from "@nextui-org/table";
import { Spinner } from "@nextui-org/spinner";

import StatusChip from "./StatusChip";
import TableLink from "./TableLink";

import TableTemplate from "@/layouts/tableTemplate";
import { Group } from "@/types/groups";
import returnEmptyContent from "@/functions/returnEmptyContent";
import returnErrorContent from "@/functions/returnErrorContent";
import returnMonthPronounced from "@/functions/returnMonthPronounced";
import formatDateForDisplay from "@/functions/formatDateForDisplay";
import { groupColumns } from "@/tableColumns/groupColumns";

interface TableGroupProps {
  groups: Group[] | undefined;
  isLoading: boolean;
  isError: boolean | null;
}

export default function TableGroup({
  groups,
  isLoading,
  isError,
}: TableGroupProps) {
  function returnLoadedRows() {
    return (item: Group) => (
      <TableRow key={item.id}>
        <TableCell>
          <TableLink to={`/${item.id}`}>{item.name}</TableLink>
        </TableCell>
        <TableCell>
          <StatusChip status={item.status} />
        </TableCell>
        <TableCell>{formatDateForDisplay(item.start_date)}</TableCell>
        <TableCell>{formatDateForDisplay(item.end_date)}</TableCell>
        <TableCell>{returnMonthPronounced(item.duration_months)}</TableCell>
      </TableRow>
    );
  }

  return (
    <TableTemplate
      columns={groupColumns}
      data={groups || []}
      emptyContent={isError ? returnErrorContent() : returnEmptyContent()}
      isLoading={isLoading}
      loadingContent={<Spinner color="primary" size="sm" />}
    >
      {returnLoadedRows()}
    </TableTemplate>
  );
}
