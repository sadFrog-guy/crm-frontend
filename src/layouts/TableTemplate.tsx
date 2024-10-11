import { setDisabled, setSelectedRow } from '@/store/selectedRowSlice';
import { Column } from '@/types/columns'
import { Table, TableHeader, TableColumn, TableBody } from '@nextui-org/table'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

interface TableTemplateProps {
    columns: Column[],
    data: Object[],
    children: RowElement<Object> | RowElement<Object>[] | ((item: Object) => RowElement<Object>),
    isLoading: boolean,
    loadingContent: React.ReactNode,
    emptyContent: React.ReactNode,
    selectionMode: string,
}

export default function TableTemplate({columns, data, children, isLoading, loadingContent, emptyContent, selectionMode='single'}: TableTemplateProps) {
  const dispatch = useDispatch();
	const isDisabled = useSelector(state => state.selectedRow.isDisabled);
	const selectedId = useSelector(state => state.selectedRow.rowId);
  const [counter, setCounter] = useState(1)

  function handleSelection(e) {
    const selectedRowId = Number(e.currentKey)
    console.log(e, selectedRowId)

    if (selectedId === selectedRowId && counter === 1) {
      setCounter(prev => prev + 1)
      dispatch(setDisabled(false))
    }

    if (selectedId === selectedRowId && counter === 2) {
      setCounter(1)
      dispatch(setDisabled(true))
    }

    if (selectedId !== selectedRowId && counter === 1) {
      setCounter(prev => prev + 1)
      dispatch(setDisabled(false))
    }

    dispatch(setSelectedRow(selectedRowId))
  }
  
  return (
    <Table
      aria-labelledby='something'
      selectionMode={selectionMode}
      onSelectionChange={handleSelection}
    > 
        <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody 
          isLoading={isLoading} 
          loadingContent={loadingContent}
          emptyContent={emptyContent}
          items={data}
        >
            {children}
        </TableBody>
    </Table>
  )
}
