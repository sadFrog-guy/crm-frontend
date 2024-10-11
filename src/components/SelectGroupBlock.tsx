// @ts-nocheck
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { useSelector } from "react-redux";

import { useGetGroupsQuery } from "@/services/groupsAPI";
import BlockTemplate from "@/layouts/BlockTemplate";
import handleInput from "@/functions/handleInput";

interface SelectGroupBlockProps {
  setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
  groupId: number;
  setGroupId: React.Dispatch<React.SetStateAction<null>>;
}

export default function SelectGroupBlock({
  setCurrentStage,
  groupId,
  setGroupId,
}: SelectGroupBlockProps) {
  const branchId = useSelector((state) => state.branch.branchId);
  const {
    data: groups,
    isError: isGroupsError,
    isLoading: isGroupsLoading,
  } = useGetGroupsQuery(branchId);

  return (
    <BlockTemplate>
      <p className="text-lg font-medium">
        Выберите группу, чтобы указать посещения
      </p>

      <Select
        disallowEmptySelection={true}
        isLoading={isGroupsLoading}
        items={groups || []}
        label="Группа"
        selectedKeys={[String(groupId)]}
        onChange={(e) => {
          handleInput(e, setGroupId);
        }}
      >
        {(item) => {
          return <SelectItem key={item.id}>{item.name}</SelectItem>;
        }}
      </Select>

      <Button
        color="primary"
        isDisabled={groupId ? false : true}
        variant="shadow"
        onClick={() => setCurrentStage(2)}
      >
        Продолжить
      </Button>
    </BlockTemplate>
  );
}
