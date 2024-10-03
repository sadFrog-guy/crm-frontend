import formatDateForDisplay from '@/functions/formatDateForDisplay';
import formatFinance from '@/functions/formatFinance';
import { Teacher } from '@/types/teachers';
import { Link } from 'react-router-dom';
import StudentInfo from './StudentInfo';

type TeacherStatsProps = {
  teacher: Teacher,
  isBranchLoading: boolean;
  branchName: string;
  isGroupLoading: boolean;
  groupName: string;
};

export default function TeacherStats({
  teacher,
  isBranchLoading,
  branchName,
  isGroupLoading,
  groupName,
}: TeacherStatsProps) {
  return (
    <div className="flex gap-8">
      <div className="flex flex-col gap-2">
        <StudentInfo
          label="Дата начала работы:"
          value={formatDateForDisplay(teacher.start_date)}
        />
        <StudentInfo
          label="Дата следующей оплаты:"
          value={formatDateForDisplay(teacher.next_payment_date)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <StudentInfo
          label="Филиал:"
          value={branchName}
          isLoading={isBranchLoading}
        />
        <StudentInfo
          label="Группа:"
          value={groupName}
          isLoading={isGroupLoading}
        />
      </div>

      <div className="flex flex-col gap-2">
        <StudentInfo
          label="Телефон:"
          value={
            <Link url={`tel:${teacher.phone}`} placement="top" canCopy={true}>
              {teacher.phone}
            </Link>
          }
        />
        <StudentInfo
          label="Whatsapp:"
          value={
            <Link url={`https://wa.me/${teacher.whatsapp.replace('+', '')}`}>
              {teacher.whatsapp}
            </Link>
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <StudentInfo
          label="Зарплата в месяц:"
          value={formatFinance(teacher.salary_rate)}
        />
      </div>
    </div>
  )
}
