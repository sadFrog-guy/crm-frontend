import formatDateForDisplay from "@/functions/formatDateForDisplay";
import formatFinance from "@/functions/formatFinance";
import { Student } from "@/types/students";
import StudentInfo from "./StudentInfo";
import Link from "./Link";

type StudentStatsProps = {
  student: Student,
  isBranchLoading: boolean;
  branchName: string;
  isGroupLoading: boolean;
  groupName: string;
};

const StudentStats: React.FC<StudentStatsProps> = ({
  student,
  isBranchLoading,
  branchName,
  isGroupLoading,
  groupName,
}) => {
  return (
    <div className="flex gap-8">
      <div className="flex flex-col gap-2">
        <StudentInfo
          label="Дата начала учебы:"
          value={formatDateForDisplay(student.study_start_date)}
        />
        <StudentInfo
          label="Дата следующей оплаты:"
          value={formatDateForDisplay(student.next_payment_date)}
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
            <Link url={`tel:${student.phone}`} placement="top" canCopy={true}>
              {student.phone}
            </Link>
          }
        />
        <StudentInfo
          label="Whatsapp:"
          value={
            <Link url={`https://wa.me/${student.whatsapp.replace('+', '')}`}>
              {student.whatsapp}
            </Link>
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <StudentInfo
          label="Откуда узнал:"
          value={student.source}
        />
        <StudentInfo
          label="Оплата в месяц:"
          value={formatFinance(student.payment)}
        />
      </div>
    </div>
  );
};

export default StudentStats;