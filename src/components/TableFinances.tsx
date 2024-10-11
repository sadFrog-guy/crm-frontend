// @ts-nocheck
import { Spinner } from "@nextui-org/spinner";
import { TableRow, TableCell } from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";

import FinanceChip from "./FinanceChip";

import formatDateForDisplay from "@/functions/formatDateForDisplay";
import returnEmptyContent from "@/functions/returnEmptyContent";
import returnErrorContent from "@/functions/returnErrorContent";
import TableTemplate from "@/layouts/tableTemplate";
import { Finance } from "@/types/finances";
import { financeColumns } from "@/tableColumns/financeColumns";
import formatFinance from "@/functions/formatFinance";
import { formatTime } from "@/functions/formatTime";
import shortenString from "@/functions/shortenString";

interface TableFinancesProps {
  finances: Finance[];
  isLoading: boolean;
  isError: boolean;
}

export default function TableFinances({
  finances,
  isLoading,
  isError,
}: TableFinancesProps) {
  function returnLoadedRows() {
    return (item: Finance) => {
      return (
        <TableRow key={item.id}>
          <TableCell>
            <p className="text-base font-medium">
              {formatFinance(Number(item.amount))}
            </p>
          </TableCell>
          <TableCell>
            <FinanceChip value={item.category} />
          </TableCell>
          <TableCell>
            <FinanceChip value={item.type} />
          </TableCell>
          <TableCell>{formatDateForDisplay(item.date)}</TableCell>
          <TableCell>{formatTime(item.time)}</TableCell>
          <TableCell className="cursor-pointer">
            <Tooltip
              showArrow
              className="max-w-xs text-xs"
              content={item.name}
              placement="left"
            >
              {item.name ? shortenString(item.name) : "---"}
            </Tooltip>
          </TableCell>
        </TableRow>
      );
    };
  }

  return (
    <TableTemplate
      columns={financeColumns}
      data={finances || []}
      emptyContent={isError ? returnErrorContent() : returnEmptyContent()}
      isLoading={isLoading}
      loadingContent={<Spinner color="primary" size="sm" />}
    >
      {returnLoadedRows()}
    </TableTemplate>
  );
}
