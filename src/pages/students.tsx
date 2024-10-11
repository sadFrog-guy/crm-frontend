// @ts-nocheck
import { useSelector } from "react-redux";

import Heading from "@/components/Heading";
import Margin from "@/components/Margin";
import usePageLabel from "@/hooks/usePageLabel";
import Template from "@/layouts/template";
import { useGetStudentsQuery } from "@/services/studentsAPI";
import TableStudent from "@/components/TableStudent";
import StudentToolbar from "@/components/StudentToolbar";

export default function StudentsPage() {
  const pageLabel = usePageLabel();
  const branchId = useSelector((state) => state.branch.branchId);
  const {
    data: students,
    isError,
    isLoading,
  } = useGetStudentsQuery({ id: branchId, type: "branch" });

  return (
    <Template>
      <div>
        <Heading>{pageLabel}</Heading>

        <Margin direction="b" value={30} />

        <StudentToolbar />

        <Margin direction="b" value={30} />

        <TableStudent
          isError={isError}
          isLoading={isLoading}
          students={students}
        />
      </div>
    </Template>
  );
}
