// @ts-nocheck
import { Button } from "@nextui-org/button";
import { useSelector } from "react-redux";

interface ToolBarProps {
  isCreateDisabled?: boolean;
  createEvent?: () => any;
  editEvent?: () => any;
  deleteEvent?: () => any;
}

export default function ToolBar({
  isCreateDisabled = false,
  createEvent,
  editEvent,
  deleteEvent,
}: ToolBarProps) {
  const isDisabled = useSelector((state) => state.selectedRow.isDisabled);

  return (
    <div className="flex gap-4 items-center">
      <Button
        className="font-medium"
        color="primary"
        variant="bordered"
        onClick={createEvent}
        isDisabled={isCreateDisabled}
      >
        Создать
      </Button>

      <Button
        className="font-medium"
        color={isDisabled ? "default" : "secondary"}
        isDisabled={isCreateDisabled ? isCreateDisabled : isDisabled}
        variant="bordered"
        onClick={editEvent}
      >
        Изменить
      </Button>

      <Button
        className="font-medium"
        color={isDisabled ? "default" : "danger"}
        isDisabled={isCreateDisabled ? isCreateDisabled : isDisabled}
        variant="bordered"
        onClick={deleteEvent}
      >
        Удалить
      </Button>

      <p
        className={
          `text-sm text-gray-400 transition-all ` +
          (isDisabled ? "opacity-100" : "opacity-0")
        }
      >
        Нажмите на строчку в таблице, чтобы выбрать элемент
      </p>
    </div>
  );
}
