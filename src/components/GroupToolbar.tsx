// @ts-nocheck

import { useDisclosure } from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { DatePicker } from "@nextui-org/date-picker";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { parseAbsoluteToLocal, parseDate } from "@internationalized/date";
import { toast } from "sonner";

import ToolBar from "./ToolBar";
import ToolBarModal from "./ToolBarModal";

import usePersistentError from "@/hooks/usePersistentError";
import { useGetBranchesQuery } from "@/services/branchesAPI";
import {
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useGetGroupsByIdQuery,
  useUpdateGroupMutation,
} from "@/services/groupsAPI";
import formatDate from "@/functions/formatDate";
import returnCurrentDate from "@/functions/returnCurrentDate";
import withMinZeroCheck from "@/functions/decorators/withMinZeroCheck";
import { withEmptyFieldCheck } from "@/functions/decorators/withEmptyFieldCheck";
import handleInput from "@/functions/handleInput";
import {
  useCreateLessonScheduleMutation,
  useUpdateLessonScheduleMutation,
} from "@/services/lessonsScheduleAPI";
import { formatTimeForSchedule } from "@/functions/formatTimeForSchedule";

export default function GroupToolbar() {
  // get branch
  const branchId = useSelector((state) => state.branch.branchId);
  const {
    entities: branches,
    isError,
    isLoading,
  } = usePersistentError(useGetBranchesQuery);
  const [branchName, setBranchName] = useState("");

  useEffect(() => {
    if (isLoading === false && branches) {
      const chosenBranch = branches.filter((item) => item.id === branchId)[0];

      setBranchName(chosenBranch.name);
    }
  }, [isLoading, branches]);

  // get selected row
  const selectedRowId = useSelector((state) => state.selectedRow.rowId);
  const {
    data: group,
    isError: isGetGroupByIdError,
    isLoading: isGetGroupByIdLoading,
    refetch: refetchGroup,
  } = useGetGroupsByIdQuery(selectedRowId);

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

  // Group CRUD
  const [
    createGroup,
    {
      isLoading: isGroupCreating,
      isError: isGroupCreateError,
      error: groupCreateError,
      isSuccess: isGroupCreateSuccess,
    },
  ] = useCreateGroupMutation();
  const [
    editGroup,
    {
      isLoading: isGroupEditing,
      isError: isGroupEditError,
      error: groupEditError,
      isSuccess: isGroupEditSuccess,
    },
  ] = useUpdateGroupMutation();
  const [
    deleteGroup,
    {
      isLoading: isGroupDeleting,
      isError: isGroupDeleteError,
      error: groupDeleteError,
      isSuccess: isGroupDeleteSuccess,
    },
  ] = useDeleteGroupMutation();

  // Lesson Schedule CREATE/EDIT
  const [createSchedule, { isLoading: isScheduleCreating }] =
    useCreateLessonScheduleMutation();
  const [editSchedule, { isLoading: isScheduleEditing }] =
    useUpdateLessonScheduleMutation();

  // Group create effects, notifications about status of CRUD
  useEffect(() => {
    if (isGroupCreateSuccess) {
      toast.success("Группа создана");
    }

    if (isGroupEditSuccess) {
      toast.success("Группа изменена");
    }

    if (isGroupDeleteSuccess) {
      toast.success("Группа удалена");
    }

    if (isGroupCreateError || isGroupDeleteError || isGroupEditError) {
      toast.error("Возникла ошибка при взаимодействии с группой", {
        style: {
          borderColor: "#F31260",
          color: "#F31260",
        },
      });
    }
  }, [
    isGroupCreating,
    isGroupCreateError,
    isGroupCreateSuccess,
    isGroupEditing,
    isGroupEditError,
    isGroupEditSuccess,
    isGroupDeleting,
    isGroupDeleteError,
    groupDeleteError,
    isGroupDeleteSuccess,
  ]);

  // Select options
  const selectOptions = ["Активна", "Набор открыт", "Завершена"];
  const daysOfWeekOptions = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ];

  // Input states
  const [name, setName] = useState("");
  const [status, setStatus] = useState(selectOptions[0]);
  const [startDate, setStartDate] = useState(parseDate(returnCurrentDate()));
  const [duration, setDuration] = useState(1);
  const [maxStudents, setMaxStudents] = useState(1);
  const [daysOfWeek, setDaysOfWeek] = useState(new Set([daysOfWeekOptions[0]]));
  const [startTime, setStartTime] = useState(
    parseAbsoluteToLocal("2024-04-08T04:00:22Z"),
  );
  const [endTime, setEndTime] = useState(
    parseAbsoluteToLocal("2024-04-08T06:00:22Z"),
  );

  // Error states
  const [isDurationError, setDurationError] = useState(false);
  const [isMaxStudentsError, setMaxStudentsError] = useState(false);
  const [isNameError, setNameError] = useState(false);

  const [minZeroError, setMinZeroError] = useState("");
  const [emptyFieldError, setEmptyFieldError] = useState("");

  // confirm disabled
  const [isConfirmDisabled, setConfirmDisabled] = useState(false);

  useEffect(() => {
    if (
      name.length > 0 &&
      !isDurationError &&
      !isMaxStudentsError &&
      !isNameError
    ) {
      setConfirmDisabled(false);
    } else {
      setConfirmDisabled(true);
    }
  }, [name, isDurationError, isMaxStudentsError, isNameError]);

  // handlers
  function handleReset() {
    setName("");
    setStatus(selectOptions[0]);
    setStartDate(parseDate(returnCurrentDate()));
    setDuration(1);
    setMaxStudents(1);

    // Сброс ошибок
    setDurationError(false);
    setMaxStudentsError(false);
    setNameError(false);
    setMinZeroError("");
    setEmptyFieldError("");
  }

  const newSchedule = {
    days_of_week: ["Понедельник", "Вторник"],
    start_time: formatTimeForSchedule(
      startTime.hour,
      startTime.minute,
      startTime.second,
    ),
    end_time: formatTimeForSchedule(
      endTime.hour,
      endTime.minute,
      endTime.second,
    ),
    group: null,
  };

  async function handleCreate() {
    if (!isDurationError && !isMaxStudentsError && !isNameError) {
      const newGroup = {
        name,
        duration_months: duration,
        max_students: maxStudents,
        branch: branchId,
        status: status,
        start_date: formatDate(startDate.year, startDate.month, startDate.day),
      };

      // const newSchedule = {
      //   days_of_week: ["Понедельник", "Вторник"],
      //   start_time: formatTimeForSchedule(startTime.hour, startTime.minute, startTime.second),
      //   end_time: formatTimeForSchedule(endTime.hour, endTime.minute, endTime.second),
      //   group: null
      // }

      try {
        const response = await createGroup(newGroup).unwrap();

        // newSchedule.group = response.id

        // await createSchedule(newSchedule)

        handleReset();

        console.log("Group created successfully!");
      } catch (err) {
        console.error("Failed to create group:", err);
      }
    }
  }

  async function handleEdit() {
    if (!isDurationError && !isMaxStudentsError && !isNameError) {
      const updatedGroup = {
        name,
        duration_months: duration,
        max_students: maxStudents,
        status: status,
        start_date: formatDate(startDate.year, startDate.month, startDate.day),
      };

      try {
        await editGroup({ id: selectedRowId, updatedGroup }).unwrap();

        handleReset();
        refetchGroup();

        console.log("Group edited successfully!");
      } catch (err) {
        console.error("Failed to edit group:", err);
      }
    }
  }

  async function handleDelete() {
    try {
      await deleteGroup(selectedRowId).unwrap();

      console.log("Group deleted successfully!");
    } catch (err) {
      console.error("Failed to delete group:", err);
    }
  }

  function setValuesForEditing() {
    onPOpen();

    setName(group?.name!);
    setStatus(group?.status!);
    setStartDate(parseDate(group?.start_date!));
    setDuration(group?.duration_months!);
    setMaxStudents(group?.max_students!);
  }

  const decoratedHandleName = withEmptyFieldCheck(
    handleInput,
    setNameError,
    setEmptyFieldError,
  );
  const decoratedHandleDuration = withMinZeroCheck(
    handleInput,
    setDurationError,
    setMinZeroError,
  );
  const decoratedHandleMaxStudents = withMinZeroCheck(
    handleInput,
    setMaxStudentsError,
    setMinZeroError,
  );

  return (
    <>
      <ToolBar
        createEvent={onCOpen}
        deleteEvent={onDOpen}
        editEvent={setValuesForEditing}
      />

      <ToolBarModal
        isConfirmDisabled={isConfirmDisabled}
        isLoading={isGroupCreating}
        isOpen={isCOpen}
        title="Создание группы"
        onConfirm={handleCreate}
        onDiscard={handleReset}
        onOpen={onCOpen}
        onOpenChange={onCOpenChange}
      >
        <div className="flex flex-col gap-4">
          <Input
            isRequired
            errorMessage={emptyFieldError}
            isInvalid={isNameError}
            label="Название"
            labelPlacement="outside"
            placeholder="Введите название группы"
            type="text"
            value={name}
            onValueChange={(e) => decoratedHandleName(e, setName)}
          />

          <Select
            isRequired
            disallowEmptySelection={true}
            label="Статус"
            labelPlacement="outside"
            placeholder="Выберите статус группы"
            selectedKeys={[status]}
            onChange={(e) => {
              handleInput(e, setStatus);
            }}
          >
            {selectOptions.map((option) => {
              return <SelectItem key={option}>{option}</SelectItem>;
            })}
          </Select>

          <div className="flex justify-between">
            <Input
              isRequired
              className="max-w-[48.5%]"
              errorMessage={minZeroError}
              isInvalid={isDurationError}
              label="Продолжительность"
              labelPlacement="outside"
              placeholder="Введите значение"
              type="number"
              value={`${duration}`}
              onValueChange={(e) => decoratedHandleDuration(e, setDuration)}
            />

            <Input
              isRequired
              className="max-w-[48.5%]"
              errorMessage={minZeroError}
              isInvalid={isMaxStudentsError}
              label="Макс. студентов"
              labelPlacement="outside"
              placeholder="Введите значение"
              type="number"
              value={`${maxStudents}`}
              onValueChange={(e) =>
                decoratedHandleMaxStudents(e, setMaxStudents)
              }
            />
          </div>

          <DatePicker
            isRequired
            label="Дата начала курса"
            labelPlacement="outside"
            value={startDate}
            onChange={(e) => handleInput(e, setStartDate)}
          />

          <Input
            isDisabled
            label="Филиал"
            labelPlacement="outside"
            placeholder="..."
            value={isLoading ? "Загрузка..." : branchName}
          />

          {/* <Select
            disallowEmptySelection={true}
            isRequired
            selectionMode="multiple"
            label="Дни недели"
            labelPlacement="outside" 
            placeholder="Выберите дни недели"
            selectedKeys={daysOfWeek}
            onChange={(e) => {
              setDaysOfWeek(new Set(e.target.value.split(",")))
            }}
          >
            {daysOfWeekOptions.map(day => {
              return (
                <SelectItem key={day}>
                  {day}
                </SelectItem>
              )
            })}
          </Select>

          <div className="flex justify-between">
            <TimeInput 
              hideTimeZone 
              className="w-[49%]"
              label="Начало занятий"
              labelPlacement="outside" 
              hourCycle={24}
              onChange={setStartTime}
              value={startTime}
            />

            <TimeInput
              hideTimeZone 
              className="w-[49%]"
              label="Конец занятий"
              labelPlacement="outside" 
              hourCycle={24}
              onChange={setEndTime}
              value={endTime}
            />
          </div> */}
        </div>
      </ToolBarModal>

      <ToolBarModal
        isConfirmDisabled={isConfirmDisabled}
        isLoading={isGroupEditing}
        isOpen={isPOpen}
        title="Изменение группы"
        onConfirm={handleEdit}
        onDiscard={handleReset}
        onOpen={onPOpen}
        onOpenChange={onPOpenChange}
      >
        <div className="flex flex-col gap-4">
          <Input
            isRequired
            errorMessage={emptyFieldError}
            isInvalid={isNameError}
            label="Название"
            labelPlacement="outside"
            placeholder="Введите название группы"
            type="text"
            value={name}
            onValueChange={(e) => decoratedHandleName(e, setName)}
          />

          <Select
            isRequired
            disallowEmptySelection={true}
            label="Статус"
            labelPlacement="outside"
            placeholder="Выберите статус группы"
            selectedKeys={[status]}
            onChange={(e) => {
              handleInput(e, setStatus);
            }}
          >
            {selectOptions.map((option) => {
              return <SelectItem key={option}>{option}</SelectItem>;
            })}
          </Select>

          <div className="flex justify-between">
            <Input
              isRequired
              className="max-w-[48.5%]"
              errorMessage={minZeroError}
              isInvalid={isDurationError}
              label="Продолжительность"
              labelPlacement="outside"
              placeholder="Введите значение"
              type="number"
              value={`${duration}`}
              onValueChange={(e) => decoratedHandleDuration(e, setDuration)}
            />

            <Input
              isRequired
              className="max-w-[48.5%]"
              errorMessage={minZeroError}
              isInvalid={isMaxStudentsError}
              label="Макс. студентов"
              labelPlacement="outside"
              placeholder="Введите значение"
              type="number"
              value={`${maxStudents}`}
              onValueChange={(e) =>
                decoratedHandleMaxStudents(e, setMaxStudents)
              }
            />
          </div>

          <DatePicker
            isRequired
            label="Дата начала курса"
            labelPlacement="outside"
            value={startDate}
            onChange={(e) => handleInput(e, setStartDate)}
          />

          <Input
            isDisabled
            label="Филиал"
            labelPlacement="outside"
            placeholder="..."
            value={isLoading ? "Загрузка..." : branchName}
          />
        </div>
      </ToolBarModal>

      <ToolBarModal
        isLoading={isGroupDeleting}
        isOpen={isDOpen}
        title="Удаление группы"
        onConfirm={handleDelete}
        onOpen={onDOpen}
        onOpenChange={onDOpenChange}
      >
        Вы действительно хотите удалить "{group?.name}"?
      </ToolBarModal>
    </>
  );
}
