import { TableCell, TableRow } from "@nextui-org/table";

import Heading from "./Heading";
import Margin from "./Margin";
import StatusChip from "./StatusChip";
import Link from "./Link";
import { TableMini } from "./TableMini";
import PositionChip from "./PositionChip";

import { Group } from "@/types/groups";
import formatDateForDisplay from "@/functions/formatDateForDisplay";
import { useGetStudentsQuery } from "@/services/studentsAPI";
import { useGetLessonSchedulesQuery } from "@/services/lessonsScheduleAPI";
import { Student } from "@/types/students";
import { LessonSchedule } from "@/types/lessonsSchedule";
import { formatDaysOfWeek } from "@/functions/formatDaysOfWeek";
import { formatTime } from "@/functions/formatTime";
import { studentMiniColumns } from "@/tableColumns/studentMiniColumns";
import { scheduleColumns } from "@/tableColumns/scheduleColumns";

interface GroupDetailContentProps {
  group: Group;
}

export default function GroupDetailContent({ group }: GroupDetailContentProps) {
  const {
    data: students,
    isLoading,
    isError,
  } = useGetStudentsQuery({ id: group.id, type: "group" });
  const {
    data: schedules,
    isLoading: schedulesAreLoading,
    isError: schedulesIsError,
  } = useGetLessonSchedulesQuery(group.id);

  return (
    <div>
      <div className="flex items-center gap-4">
        <Heading size="2xl">Группа "{group.name}"</Heading>
        <PositionChip position="Группа" />
        <StatusChip status={group.status} />
      </div>

      <Margin direction="b" value={20} />

      <p className="flex gap-[5px]">
        <b>Начало:</b> {formatDateForDisplay(group.start_date)}
      </p>
      <p className="flex gap-[5px]">
        <b>Окончание:</b> {formatDateForDisplay(group.end_date)}
      </p>

      <Margin direction="b" value={40} />

      <div className="flex justify-between">
        <div className="w-[45%]">
          <Heading>Расписание занятий</Heading>
          <Margin direction="b" value={15} />
          <TableMini
            columns={scheduleColumns}
            data={schedules || []}
            formatRow={(item: LessonSchedule) => (
              <TableRow key={item.id}>
                <TableCell>{formatDaysOfWeek(item.days_of_week)}</TableCell>
                <TableCell>{formatTime(item.start_time)}</TableCell>
                <TableCell>{formatTime(item.end_time)}</TableCell>
              </TableRow>
            )}
            isError={schedulesIsError}
            isLoading={schedulesAreLoading}
          />
        </div>

        <div className="w-[52%]">
          <Heading>Ученики</Heading>
          <Margin direction="b" value={15} />
          <TableMini
            columns={studentMiniColumns}
            data={students || []}
            formatRow={(item: Student) => (
              <TableRow key={item.id}>
                <TableCell>{`${item.name} ${item.surname.substring(0, 1)}.`}</TableCell>
                <TableCell>
                  <Link canCopy={true} url={`tel:${item.phone}`}>
                    {item.phone}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link url={`https://wa.me/${item.whatsapp.replace("+", "")}`}>
                    {item.whatsapp}
                  </Link>
                </TableCell>
                <TableCell>
                  <StatusChip status={item.status} />
                </TableCell>
              </TableRow>
            )}
            isError={isError}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
