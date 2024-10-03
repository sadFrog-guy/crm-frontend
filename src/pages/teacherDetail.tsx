import DetailPageLoading from '@/components/DetailPageLoading';
import TeacherDetailContent from '@/components/TeacherDetailContent';
import Template from '@/layouts/template'
import { useGetTeacherByIdQuery } from '@/services/teachersAPI';
import { useParams } from 'react-router-dom'

export default function TeacherDetail() {
	const { teacherParam } = useParams()
	const { data: teacher, isError, isLoading } = useGetTeacherByIdQuery(Number(teacherParam));

  return (
    <Template>
      {isLoading
        ? <DetailPageLoading/>
        : <TeacherDetailContent teacher={teacher}/>
      }
    </Template>
  )
}
