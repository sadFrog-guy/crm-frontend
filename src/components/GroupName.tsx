import { Spinner } from "@nextui-org/spinner";

import { useGetGroupsByIdQuery } from "@/services/groupsAPI";

interface GroupNameProps {
  groupId: number;
}

export default function GroupName({ groupId }: GroupNameProps) {
  const { data: group, isLoading } = useGetGroupsByIdQuery(groupId);

  return (
    <>
      {isLoading ? <Spinner color="default" size="sm" /> : <p>{group?.name}</p>}
    </>
  );
}
