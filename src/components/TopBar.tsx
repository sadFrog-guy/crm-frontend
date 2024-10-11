import { Select, SelectItem } from "@nextui-org/select";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { RootState } from "@/store/store";
import { setBranchId } from "@/store/branchSlice";
import { useGetBranchesQuery } from "@/services/branchesAPI";
import usePersistentError from "@/hooks/usePersistentError";

export default function TopBar() {
  const {
    entities: branches,
    isError,
    isLoading,
  } = usePersistentError(useGetBranchesQuery);

  const dispatch = useDispatch();
  const branchId = useSelector((state: RootState) => state.branch.branchId);

  const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBranchId = Number(event.target.value);

    dispatch(setBranchId(selectedBranchId));

    const selectedBranchName = branches?.filter(
      (item) => item.id === selectedBranchId,
    )[0];

    toast.info(`Вы перешли на филиал ${selectedBranchName.name}`);
  };

  return (
    <div className="flex justify-center items-center min-h-10 border-b-2 border-foreground-200">
      <Select
        aria-label="Филиал"
        className="max-w-[235px]"
        classNames={{ trigger: "bg-white data-[hover=true]:bg-white" }}
        defaultSelectedKeys={branchId ? [`${branchId}`] : ["1"]}
        disallowEmptySelection={true}
        isLoading={isLoading}
        items={branches || []}
        placeholder="Выберите филиал"
        variant="flat"
        onChange={handleBranchChange}
      >
        {(item) => <SelectItem key={item.id}>{item.name}</SelectItem>}
      </Select>
    </div>
  );
}
