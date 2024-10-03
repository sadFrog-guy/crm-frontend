import {Select, SelectItem} from "@nextui-org/select";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setBranchId } from '@/store/branchSlice';
import { useGetBranchesQuery } from "@/services/branchesAPI";
import usePersistentError from "@/hooks/usePersistentError";
import { Toaster, toast } from 'sonner'

export default function TopBar() {
	const { entities: branches, isError, isLoading } = usePersistentError(useGetBranchesQuery);

	const dispatch = useDispatch();
  const branchId = useSelector((state: RootState) => state.branch.branchId);

	const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBranchId = Number(event.target.value);
    dispatch(setBranchId(selectedBranchId));

		const selectedBranchName = branches?.filter(item => item.id === selectedBranchId)[0]
		toast.info(`Вы перешли на филиал ${selectedBranchName.name}`, {duration: 3000})
  };

	return (
		<div className="flex justify-center items-center min-h-10 border-b-2 border-foreground-200">
			<Select 
				className="max-w-[235px]" 
				classNames={{trigger: "bg-white data-[hover=true]:bg-white"}}
				onChange={handleBranchChange}
				defaultSelectedKeys={branchId ? [`${branchId}`] : ["1"]}
				placeholder="Выберите филиал"
				isLoading={isLoading}
				items={branches || []}
				variant="flat"
				aria-label="Филиал"
			>
				{(item) => (
					<SelectItem key={item.id}>
						{item.name}
					</SelectItem>
				)}
			</Select>
		</div>
	)
}
