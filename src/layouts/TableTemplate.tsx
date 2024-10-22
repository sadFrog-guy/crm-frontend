// @ts-nocheck
import { Table, TableHeader, TableColumn, TableBody } from "@nextui-org/table";
import {Pagination, PaginationItem, PaginationCursor} from "@nextui-org/pagination";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Column } from "@/types/columns";
import { setDisabled, setSelectedRow } from "@/store/selectedRowSlice";
import { useLocation } from "react-router-dom";

interface TableTemplateProps {
  columns: Column[];
  data: Object[];
  children:
    | RowElement<Object>
    | RowElement<Object>[]
    | ((item: Object) => RowElement<Object>);
  isLoading: boolean;
  loadingContent: React.ReactNode;
  emptyContent: React.ReactNode;
  selectionMode: "single" | "multiple";
}

export default function TableTemplate({
  columns,
  data,
  children,
  isLoading,
  loadingContent,
  emptyContent,
  selectionMode = "single",
}: TableTemplateProps) {
  const dispatch = useDispatch();
  const isDisabled = useSelector((state) => state.selectedRow.isDisabled);
  const selectedId = useSelector((state) => state.selectedRow.rowId);
  const location = useLocation();
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 6;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  function handleSelection(e) {
    const selectedRowId = Number(e.currentKey);

    dispatch(setSelectedRow(selectedRowId));
    dispatch(setDisabled(false));
  }

  useEffect(() => {
    dispatch(setDisabled(true))
  }, [location])

  return (
    <Table
      disallowEmptySelection={true}
      aria-labelledby="something"
      selectionMode={selectionMode}
      onSelectionChange={handleSelection}
      bottomContent={
        data.length > 6 
        ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        )
        : null
      }
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        emptyContent={emptyContent}
        isLoading={isLoading}
        items={items} 
        loadingContent={loadingContent}
      >
        {children}
      </TableBody>
    </Table>
  );
}
