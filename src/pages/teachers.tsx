import Heading from '@/components/Heading'
import Margin from '@/components/Margin'
import TableTeacher from '@/components/TableTeacher'
import ToolBar from '@/components/ToolBar'
import usePageLabel from '@/hooks/usePageLabel'
import Template from '@/layouts/template'
import { useGetTeachersQuery } from '@/services/teachersAPI'
import { useSelector } from 'react-redux'

export default function TeachersPage() {
	const pageLabel = usePageLabel()  
  const branchId = useSelector((state) => state.branch.branchId);
  const { data: teachers, isError, isLoading } = useGetTeachersQuery({ id: branchId, type: "branch" });

	return (
		<Template>
			<div>
				<Heading>{pageLabel}</Heading>

				<Margin direction="b" value={30}/>

				<ToolBar/>

				<Margin direction="b" value={30}/>

				<TableTeacher
					teachers={teachers}
					isLoading={isLoading}
					isError={isError}
				/>
			</div>
		</Template>
	)
}