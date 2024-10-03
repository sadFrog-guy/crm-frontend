import { Button } from '@nextui-org/button'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface ToolBarProps {
    createEvent?: () => any,
    editEvent?: () => any,
    deleteEvent?: () => any,
}

export default function ToolBar({createEvent, editEvent, deleteEvent}: ToolBarProps) {
	const isDisabled = useSelector(state => state.selectedRow.isDisabled);

  return (
    <div className="flex gap-4 items-center">
        <Button
            color="primary"
            variant="bordered"
            className="font-medium"
            onClick={createEvent}
        >
            Создать
        </Button>

        <Button
            color={isDisabled ? "default" : "secondary"}
            className="font-medium"
						isDisabled={isDisabled}
            variant="bordered"
						onClick={editEvent}
        >
            Изменить
        </Button>

        <Button
            color={isDisabled ? "default" : "danger"}
            className="font-medium"
						isDisabled={isDisabled}
            variant="bordered"
						onClick={deleteEvent}
        >
            Удалить
        </Button>

				<p className={`text-sm text-gray-400 transition-all ` + (isDisabled ? 'opacity-100' : 'opacity-0')}>
					Нажмите на строчку в таблице, чтобы выбрать группу
				</p>
    </div>
  )
}