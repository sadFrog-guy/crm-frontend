import returnEmptyContent from "@/functions/returnEmptyContent";
import returnErrorContent from "@/functions/returnErrorContent";
import { Spinner } from "@nextui-org/spinner";
import { Table, TableHeader, TableColumn, TableBody } from "@nextui-org/table";

export const TableMini = ({ columns, data, isLoading, isError, formatRow }: {
  columns: { key: string, label: string }[],
  data: any[],
  isLoading: boolean,
  isError: boolean,
  formatRow: (item: any) => JSX.Element
}) => (
  <Table>
    <TableHeader columns={columns}>
      {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
    </TableHeader>
    <TableBody
      items={data}
      isLoading={isLoading}
      emptyContent={isError ? returnErrorContent() : returnEmptyContent()}
      loadingContent={<Spinner size="sm" color="primary" />}
    >
      {formatRow}
    </TableBody>
  </Table>
);