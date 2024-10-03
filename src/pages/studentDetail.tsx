import DetailPageLoading from '@/components/DetailPageLoading';
import StudentDetailContent from '@/components/StudentDetailContent';
import Template from '@/layouts/template';
import { useGetStudentByIdQuery } from '@/services/studentsAPI';
import { useParams } from 'react-router-dom';

export default function StudentDetail() {
	const { studentParam } = useParams()
	const { data: student, isError, isLoading } = useGetStudentByIdQuery(Number(studentParam));

  return (
    <Template>
      {isLoading
        ? <DetailPageLoading/>
        : <StudentDetailContent student={student}/>
      }
    </Template>
  )
}
