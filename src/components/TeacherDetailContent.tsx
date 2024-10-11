// @ts-nocheck
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody } from "@nextui-org/card";
import { TableRow, TableCell } from "@nextui-org/table";

import GenderChip from "./GenderChip";
import Heading from "./Heading";
import StatusChip from "./StatusChip";
import PositionChip from "./PositionChip";
import Margin from "./Margin";
import TeacherStats from "./TeacherStats";
import { TableMini } from "./TableMini";

import { Teacher } from "@/types/teachers";
import usePersistentError from "@/hooks/usePersistentError";
import { useGetBranchesQuery } from "@/services/branchesAPI";
import { useGetGroupsByIdQuery } from "@/services/groupsAPI";
import { useGetWorkScheduleQuery } from "@/services/workScheduleAPI";
import { formatDaysOfWeek } from "@/functions/formatDaysOfWeek";
import { formatTime } from "@/functions/formatTime";
import { scheduleColumns } from "@/tableColumns/scheduleColumns";
import { WorkSchedule } from "@/types/workSchedule";

interface TeacherDetailContentProps {
  teacher: Teacher;
}

export default function TeacherDetailContent({
  teacher,
}: TeacherDetailContentProps) {
  const {
    data: group,
    isError: isGroupError,
    isLoading: isGroupLoading,
  } = useGetGroupsByIdQuery(Number(teacher.group));
  const {
    entities: branches,
    isError: isBranchError,
    isLoading: isBranchLoading,
  } = usePersistentError(useGetBranchesQuery);
  const {
    data: schedules,
    isLoading: schedulesAreLoading,
    isError: schedulesIsError,
  } = useGetWorkScheduleQuery(teacher.id);

  const branchId = useSelector((state) => state.branch.branchId);
  const [branchName, setBranchName] = useState("");
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    setBranchName(branches?.filter((item) => item.id === branchId)[0].name);
  }, [branches, isBranchLoading]);

  useEffect(() => {
    setGroupName(group?.name!);
  }, [group, isGroupLoading]);

  return (
    <div>
      <div className="flex items-center gap-4">
        <Heading size="2xl">
          {teacher.name} {teacher.surname}
        </Heading>
        <PositionChip position="Педагог" />
        <StatusChip status={teacher.status} />
        <GenderChip gender={teacher.sex} />
      </div>

      <Margin direction="b" value={20} />

      <TeacherStats
        branchName={branchName}
        groupName={groupName}
        isBranchLoading={isBranchLoading}
        isGroupLoading={isGroupLoading}
        teacher={teacher}
      />

      <Margin direction="b" value={40} />

      <div className="flex justify-between">
        <div className="w-[52%]">
          <Heading>График работы</Heading>
          <Margin direction="b" value={15} />
          <TableMini
            columns={scheduleColumns}
            data={schedules || []}
            formatRow={(item: WorkSchedule) => (
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

        <div className="w-[45%] max-h-[180px]">
          <Heading>Описание</Heading>
          <Margin direction="b" value={15} />
          <Card className="p-2">
            <CardBody>{teacher.description}</CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
