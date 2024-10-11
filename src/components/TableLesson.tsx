import formatDateForDisplay from '@/functions/formatDateForDisplay'
import returnEmptyContent from '@/functions/returnEmptyContent'
import returnErrorContent from '@/functions/returnErrorContent'
import TableTemplate from '@/layouts/tableTemplate'
import { lessonColumns } from '@/tableColumns/lessonColumns'
import { Lesson } from '@/types/lesson'
import { Spinner } from '@nextui-org/spinner'
import { TableRow, TableCell, Table } from '@nextui-org/table'
import GroupName from './GroupName'
import GroupScheduleTime from './GroupScheduleTime'
import TeacherName from './TeacherName'
import TableLink from './TableLink'
import { useState } from 'react'
import ToolBarModal from './ToolBarModal'
import LessonInfo from './LessonInfo'
import { useDisclosure } from '@nextui-org/modal'

interface TableLessonProps {
  lessons: Lesson[] | undefined,
  isLoading: boolean,
  isError: boolean | null
}

export default function TableLesson({lessons, isLoading, isError}: TableLessonProps) {
  const [currentLesson, setCurrentLesson] = useState(null)

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  function returnLoadedRows() {
    return (item: Lesson) => {
      return (
        <TableRow key={item.id}>
          <TableCell>
            <TableLink to="" onClick={() => {
              setCurrentLesson(item.id)
              onOpen()
            }}>
              Посещения
            </TableLink>
          </TableCell>
          <TableCell>
            <GroupName groupId={item.group}/>
          </TableCell>
          <TableCell>
            <TeacherName groupId={item.group}/>
          </TableCell>  
          <TableCell>
            {formatDateForDisplay(item.date)}
          </TableCell>  
          <TableCell>
            <GroupScheduleTime groupId={item.group} position="start"/>
          </TableCell>
          <TableCell>
            <GroupScheduleTime groupId={item.group} position="end"/>
          </TableCell>
        </TableRow>
      )
    }
  }

  return (
    <>
      <TableTemplate
        columns={lessonColumns}
        data={lessons || []}
        isLoading={isLoading}
        emptyContent={isError ? returnErrorContent() : returnEmptyContent()}
        loadingContent={<Spinner size="sm" color="primary"/>}
      >
        {returnLoadedRows()}
      </TableTemplate>

      <ToolBarModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        title="Посещения на занятии"
        isLoading={false}
        showButtons={false}
      >
        <LessonInfo lessonId={currentLesson}/>
      </ToolBarModal>
    </>
  )
}
