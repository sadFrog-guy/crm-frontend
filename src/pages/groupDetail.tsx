import { useParams } from "react-router-dom";

import Template from "@/layouts/template";
import { useGetGroupsByIdQuery } from "@/services/groupsAPI";
import DetailPageLoading from "@/components/DetailPageLoading";
import GroupDetailContent from "@/components/GroupDetailContent";

export default function GroupDetail() {
  const { groupParam } = useParams();
  const {
    data: group,
    isError,
    isLoading,
  } = useGetGroupsByIdQuery(Number(groupParam));

  return (
    <Template>
      {isLoading ? (
        <DetailPageLoading />
      ) : (
        <GroupDetailContent group={group!} />
      )}
    </Template>
  );
}
