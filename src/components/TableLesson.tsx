// @ts-nocheck
import { Spinner } from "@nextui-org/spinner";
import { TableRow, TableCell } from "@nextui-org/table";
import { useState } from "react";
import { useDisclosure } from "@nextui-org/modal";

import GroupName from "./GroupName";
import GroupScheduleTime from "./GroupScheduleTime";
import TeacherName from "./TeacherName";
import TableLink from "./TableLink";
import ToolBarModal from "./ToolBarModal";
import LessonInfo from "./LessonInfo";

import formatDateForDisplay from "@/functions/formatDateForDisplay";
import returnEmptyContent from "@/functions/returnEmptyContent";
import returnErrorContent from "@/functions/returnErrorContent";
import TableTemplate from "@/layouts/TableTemplate";
import { lessonColumns } from "@/tableColumns/lessonColumns";
import { Lesson } from "@/types/lesson";

interface TableLessonProps {
  lessons: Lesson[] | undefined;
  isLoading: boolean;
  isError: boolean | null;
}

export default function TableLesson({
  lessons,
  isLoading,
  isError,
}: TableLessonProps) {
  const [currentLesson, setCurrentLesson] = useState(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function returnLoadedRows() {
    return (item: Lesson) => {
      return (
        <TableRow key={item.id}>
          <TableCell>
            <TableLink
              to=""
              onClick={() => {
                setCurrentLesson(item.id);
                onOpen();
              }}
            >
              Посещения
            </TableLink>
          </TableCell>
          <TableCell>
            <GroupName groupId={item.group} />
          </TableCell>
          <TableCell>
            <TeacherName groupId={item.group} />
          </TableCell>
          <TableCell>{formatDateForDisplay(item.date)}</TableCell>
          <TableCell>
            <GroupScheduleTime groupId={item.group} position="start" />
          </TableCell>
          <TableCell>
            <GroupScheduleTime groupId={item.group} position="end" />
          </TableCell>
        </TableRow>
      );
    };
  }

  return (
    <>
      <TableTemplate
        columns={lessonColumns}
        data={lessons || []}
        emptyContent={isError ? returnErrorContent() : returnEmptyContent()}
        isLoading={isLoading}
        loadingContent={<Spinner color="primary" size="sm" />}
      >
        {returnLoadedRows()}
      </TableTemplate>

      <ToolBarModal
        isLoading={false}
        isOpen={isOpen}
        showButtons={false}
        title="Посещения на занятии"
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      >
        <LessonInfo lessonId={currentLesson} />
      </ToolBarModal>
    </>
  );
}
