import handleInput from '@/functions/handleInput'
import BlockTemplate from '@/layouts/BlockTemplate'
import { useGetGroupsQuery } from '@/services/groupsAPI'
import { Button } from '@nextui-org/button'
import { Select, SelectItem } from '@nextui-org/select'
import { useState } from 'react'
import { useSelector } from 'react-redux'

interface SelectGroupBlockProps {
  setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
  groupId: number;
  setGroupId: React.Dispatch<React.SetStateAction<null>>;
}

export default function SelectGroupBlock({setCurrentStage, groupId, setGroupId}: SelectGroupBlockProps) {
  const branchId = useSelector(state => state.branch.branchId);
  const { data: groups, isError: isGroupsError, isLoading: isGroupsLoading } = useGetGroupsQuery(branchId)

  return (
    <BlockTemplate>
      <p className="text-lg font-medium">Выберите группу, чтобы указать посещения</p>

      <Select
        disallowEmptySelection={true}
        label="Группа"
        selectedKeys={[String(groupId)]}
        isLoading={isGroupsLoading}
        items={groups || []}
        onChange={(e) => {
          handleInput(e, setGroupId)
        }}
      >
        {(item => {
          return (
            <SelectItem key={item.id}>
              {item.name}
            </SelectItem>
          )
        })}
      </Select>

      <Button 
        variant="shadow"
        color="primary" 
        isDisabled={groupId ? false : true}
        onClick={() => setCurrentStage(2)}
      >
        Продолжить
      </Button>
    </BlockTemplate>
  )
}
