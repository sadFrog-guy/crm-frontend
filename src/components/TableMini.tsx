import { Spinner } from "@nextui-org/spinner";
import { Table, TableHeader, TableColumn, TableBody } from "@nextui-org/table";

import returnEmptyContent from "@/functions/returnEmptyContent";
import returnErrorContent from "@/functions/returnErrorContent";

export const TableMini = ({
  columns,
  data,
  isLoading,
  isError,
  formatRow,
}: {
  columns: { key: string; label: string }[];
  data: any[];
  isLoading: boolean;
  isError: boolean;
  formatRow: (item: any) => JSX.Element;
}) => (
  <Table>
    <TableHeader columns={columns}>
      {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
    </TableHeader>
    <TableBody
      emptyContent={isError ? returnErrorContent() : returnEmptyContent()}
      isLoading={isLoading}
      items={data}
      loadingContent={<Spinner color="primary" size="sm" />}
    >
      {formatRow}
    </TableBody>
  </Table>
);
