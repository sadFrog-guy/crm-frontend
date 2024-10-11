// @ts-nocheck
import { useSelector } from "react-redux";

import Heading from "@/components/Heading";
import Margin from "@/components/Margin";
import Template from "@/layouts/template";
import usePageLabel from "@/hooks/usePageLabel";
import { useGetGroupsQuery } from "@/services/groupsAPI";
import TableGroup from "@/components/TableGroup";
import GroupToolbar from "@/components/GroupToolbar";

export default function GroupsPage() {
  const pageLabel = usePageLabel();
  const branchId = useSelector((state) => state.branch.branchId);
  const { data: groups, isError, isLoading } = useGetGroupsQuery(branchId);

  return (
    <Template>
      <div>
        <Heading>{pageLabel}</Heading>

        <Margin direction="b" value={30} />

        <GroupToolbar />

        <Margin direction="b" value={30} />

        <TableGroup groups={groups} isError={isError} isLoading={isLoading} />
      </div>
    </Template>
  );
}
