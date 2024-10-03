import { Student } from '@/types/students'
import Heading from './Heading'
import StatusChip from './StatusChip'
import Margin from './Margin'
import { useGetGroupsByIdQuery } from '@/services/groupsAPI'
import usePersistentError from '@/hooks/usePersistentError'
import { useGetBranchesQuery } from '@/services/branchesAPI'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import GenderChip from './GenderChip'
import { TableMini } from './TableMini'
import { formatDaysOfWeek } from '@/functions/formatDaysOfWeek'
import { formatTime } from '@/functions/formatTime'
import { useGetLessonsScheduleQuery } from '@/services/lessonsScheduleAPI'
import { LessonSchedule } from '@/types/lessonsSchedule'
import { TableRow, TableCell } from '@nextui-org/table'
import { lessonColumns } from '@/tableColumns/scheduleColumns'
import StudentStats from './StudentStats'
import {Card, CardBody} from "@nextui-org/card";
import PositionChip from './PositionChip'

interface StudentDetailContentProps {
  student: Student
}

export default function StudentDetailContent({student}: StudentDetailContentProps) {
	const { data: group, isError: isGroupError, isLoading: isGroupLoading } = useGetGroupsByIdQuery(Number(student.group));
  const { entities: branches, isError: isBranchError, isLoading: isBranchLoading } = usePersistentError(useGetBranchesQuery);
  const { data: schedules, isLoading: schedulesAreLoading, isError: schedulesIsError } = useGetLessonsScheduleQuery(
    group?.id,
    { skip: !group }
  );

  const branchId = useSelector((state) => state.branch.branchId);
  const [branchName, setBranchName] = useState("")
  const [groupName, setGroupName] = useState("")
  
  useEffect(() => {
    setBranchName(branches?.filter(item => item.id === branchId)[0].name)
  }, [branches, isBranchLoading])

  useEffect(() => {
    setGroupName(group?.name)
  }, [group, isGroupLoading])

  return (
    <div>
      <div className="flex items-center gap-4">
        <Heading size="2xl">{student.name} {student.surname}</Heading>
        <PositionChip position="Ученик" />
        <StatusChip status={student.status} />
        <GenderChip gender={student.sex} />
      </div>

      <Margin direction="b" value={20} />

      <StudentStats
        student={student}
        isBranchLoading={isBranchLoading}
        branchName={branchName}
        isGroupLoading={isGroupLoading}
        groupName={groupName}
      />

      <Margin direction="b" value={40} />

      <div className="flex justify-between">
        <div className="w-[52%]">
          <Heading>Расписание занятий</Heading>
          <Margin direction="b" value={15} />
          <TableMini
            columns={lessonColumns}
            data={schedules || []}
            isLoading={schedulesAreLoading}
            isError={schedulesIsError}
            formatRow={(item: LessonSchedule) => (
              <TableRow key={item.id}>
                <TableCell>{formatDaysOfWeek(item.days_of_week)}</TableCell>
                <TableCell>{formatTime(item.start_time)}</TableCell>
                <TableCell>{formatTime(item.end_time)}</TableCell>
              </TableRow>
            )}
          />
        </div>

        <div className="w-[45%] max-h-[180px]">
          <Heading>Описание</Heading>
          <Margin direction="b" value={15} />
          <Card className="p-2">
            <CardBody>
              {student.description}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
