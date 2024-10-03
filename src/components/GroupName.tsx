import { TableCell } from '@nextui-org/table'
import { useGetGroupsByIdQuery } from '@/services/groupsAPI'
import { Spinner } from '@nextui-org/spinner'

interface GroupNameProps {
    groupId: number
}

export default function GroupName({groupId}: GroupNameProps) {
    const { data: group, isLoading } = useGetGroupsByIdQuery(groupId)

    return (
        <>
            {isLoading
                ? <Spinner size="sm" color="default"/>
                : <p>{group?.name}</p>
            }
        </>
    )
}
