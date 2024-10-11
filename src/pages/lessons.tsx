// @ts-nocheck
import { useDisclosure } from "@nextui-org/modal";
import { Select, SelectItem } from "@nextui-org/select";
import { SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import Heading from "@/components/Heading";
import Margin from "@/components/Margin";
import SelectAttendance from "@/components/SelectAttendance";
import TableLesson from "@/components/TableLesson";
import ToolBar from "@/components/ToolBar";
import ToolBarModal from "@/components/ToolBarModal";
import { formatDateISO } from "@/functions/formatDateISO";
import { formatTimeForSchedule } from "@/functions/formatTimeForSchedule";
import handleInput from "@/functions/handleInput";
import usePageLabel from "@/hooks/usePageLabel";
import Template from "@/layouts/template";
import {
  useCreateAttendanceMutation,
  useGetAttendancesQuery,
} from "@/services/attendanceAPI";
import { useGetGroupsQuery } from "@/services/groupsAPI";
import {
  useCreateLessonMutation,
  useDeleteLessonMutation,
  useGetLessonByIdQuery,
  useGetLessonsQuery,
} from "@/services/lessonAPI";

export default function LessonsPage() {
  const pageLabel = usePageLabel();
  const branchId = useSelector((state) => state.branch.branchId);
  const selectedRowId = useSelector((state) => state.selectedRow.rowId);
  const { data: lessons, isError, isLoading } = useGetLessonsQuery();
  const {
    data: groups,
    isError: isGroupError,
    isLoading: isGroupLoading,
  } = useGetGroupsQuery(branchId);
  const {
    data: lesson,
    isError: isLessonGettingError,
    isLoading: isLessonGettingLoading,
  } = useGetLessonByIdQuery(selectedRowId);
  const {
    data: attendances,
    isError: isAttendancesError,
    isLoading: isAttendancesLoading,
    isSuccess: isAttendanceSuccess,
  } = useGetAttendancesQuery({ id: null, type: "none" });
  const [groupId, setGroupId] = useState(null);
  const [values, setValues] = useState(new Set([]));
  const [isConfirmDisabled, setConfirmDisabled] = useState(false);

  // C - create, P - edit(put), D - delete
  const {
    isOpen: isCOpen,
    onOpen: onCOpen,
    onOpenChange: onCOpenChange,
  } = useDisclosure();
  const {
    isOpen: isPOpen,
    onOpen: onPOpen,
    onOpenChange: onPOpenChange,
  } = useDisclosure();
  const {
    isOpen: isDOpen,
    onOpen: onDOpen,
    onOpenChange: onDOpenChange,
  } = useDisclosure();

  // crud
  const [
    createLesson,
    {
      isLoading: isLessonCreating,
      isError: isLessonCreateError,
      error: lessonCreateError,
      isSuccess: isLessonCreateSuccess,
    },
  ] = useCreateLessonMutation();
  const [
    createAttendance,
    {
      isLoading: isAttendanceCreating,
      isError: isAttendanceCreateError,
      error: attendanceCreateError,
      isSuccess: isAttendanceCreateSuccess,
    },
  ] = useCreateAttendanceMutation();

  const [deleteLesson, { isLoading: isDeletingLesson }] =
    useDeleteLessonMutation();

  // handlers
  function handleReset() {
    setGroupId(null);
    setValues(new Set([]));
  }

  function setValuesForEditing() {
    onPOpen();

    let lessons_index = lessons?.filter((item) => item.id === selectedRowId)[0];
    let attendances_ids: SetStateAction<Set<never>> | string[] = [];

    attendances?.forEach((item) => {
      console.log(item);
      if (item.lesson === lessons_index.id) {
        attendances_ids.push(String(item.student));
      }
    });

    console.log(lessons_index);
    console.log(attendances_ids);

    setGroupId(lesson?.group);
    setValues(new Set(attendances_ids));
  }

  async function handleCreate() {
    const date = new Date();
    const currentDate = formatDateISO(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
    const time = formatTimeForSchedule(
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    );

    const newLesson = {
      date: currentDate,
      time,
      group: groupId,
    };

    const response = await createLesson(newLesson);

    values.forEach(async (item) => {
      const newAttendance = {
        is_attendant: true,
        date: currentDate,
        lesson: Number(response.data.id),
        student: Number(item),
      };

      await createAttendance(newAttendance);
    });

    toast.info("Урок успешно создан");
    handleReset();
  }

  async function handleEdit() {}

  async function handleDelete() {
    await deleteLesson(selectedRowId);

    toast.info("Урок успешно удален");
  }

  useEffect(() => {
    if (values.size > 0 && groupId !== null) {
      setConfirmDisabled(false);
    } else {
      setConfirmDisabled(true);
    }
  }, [values, groupId]);

  return (
    <Template>
      <div>
        <Heading>{pageLabel}</Heading>

        <Margin direction="b" value={30} />

        <ToolBar
          createEvent={onCOpen}
          deleteEvent={onDOpen}
          editEvent={setValuesForEditing}
        />

        <ToolBarModal
          isConfirmDisabled={isConfirmDisabled}
          isLoading={isLessonCreating || isAttendanceCreating}
          isOpen={isCOpen}
          title="Создание урока"
          onConfirm={handleCreate}
          onDiscard={handleReset}
          onOpen={onCOpen}
          onOpenChange={onCOpenChange}
        >
          <div className="flex flex-col gap-6">
            <Select
              isRequired
              disallowEmptySelection={true}
              isLoading={isGroupLoading}
              items={groups}
              label="Группа"
              labelPlacement="outside"
              placeholder="Выберите значение"
              selectedKeys={[String(groupId)]}
              onChange={(e) => {
                handleInput(e, setGroupId);
              }}
            >
              {(item) => {
                return <SelectItem key={item.id}>{item.name}</SelectItem>;
              }}
            </Select>

            {groupId && (
              <SelectAttendance
                groupId={groupId}
                setValues={setValues}
                values={values}
              />
            )}
          </div>
        </ToolBarModal>

        <ToolBarModal
          isConfirmDisabled={isConfirmDisabled}
          isLoading={false}
          isOpen={isPOpen}
          onOpen={onPOpen}
          onOpenChange={onPOpenChange}
          title="Редактировать посещения"
          // onConfirm={handleCreate}
          onDiscard={handleReset}
        >
          <div className="flex flex-col gap-6">
            {groupId && (
              <SelectAttendance
                groupId={groupId}
                setValues={setValues}
                values={values}
              />
            )}
          </div>
        </ToolBarModal>

        <ToolBarModal
          isLoading={false}
          isOpen={isDOpen}
          title="Удаление урока"
          onConfirm={handleDelete}
          onOpen={onDOpen}
          onOpenChange={onDOpenChange}
        >
          Вы действительно хотите удалить урок?
        </ToolBarModal>

        <Margin direction="b" value={30} />

        <TableLesson
          isError={isError}
          isLoading={isLoading}
          lessons={lessons}
        />
      </div>
    </Template>
  );
}
