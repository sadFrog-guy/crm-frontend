import returnCurrentDate from '@/functions/returnCurrentDate';
import usePersistentError from '@/hooks/usePersistentError';
import { useGetBranchesQuery } from '@/services/branchesAPI';
import { useCreateFinanceMutation, useUpdateFinanceMutation, useDeleteFinanceMutation } from '@/services/financesAPI';
import { parseDate } from '@internationalized/date';
import { useDisclosure } from '@nextui-org/modal';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import ToolBar from './ToolBar';

export default function FinanceToolbar() {
  // get branch
  const branchId = useSelector(state => state.branch.branchId);
  const { entities: branches, isError, isLoading } = usePersistentError(useGetBranchesQuery);
  const [branchName, setBranchName] = useState("")

  useEffect(() => {
    if (isLoading === false && branches) {
      const chosenBranch = branches.filter(item => item.id === branchId)[0]
      setBranchName(chosenBranch.name)
    }
  }, [isLoading, branches])

  // C - create, P - edit(put), D - delete
  const {isOpen: isCOpen, onOpen: onCOpen, onOpenChange: onCOpenChange} = useDisclosure();
  const {isOpen: isPOpen, onOpen: onPOpen, onOpenChange: onPOpenChange} = useDisclosure();
  const {isOpen: isDOpen, onOpen: onDOpen, onOpenChange: onDOpenChange} = useDisclosure();

  // Finance CRUD
  const [createFinance, { isLoading: isFinanceCreating, isError: isFinanceCreateError, error: financeCreateError, isSuccess: isFinanceCreateSuccess }] = useCreateFinanceMutation();
  const [editFinance, { isLoading: isFinanceEditing, isError: isFinanceEditError, error: financeEditError, isSuccess: isFinanceEditSuccess }] = useUpdateFinanceMutation();
  const [deleteFinance, { isLoading: isFinanceDeleting, isError: isFinanceDeleteError, error: financeDeleteError, isSuccess: isFinanceDeleteSuccess }] = useDeleteFinanceMutation();

  // Finance create effects, notifications about status of CRUD
  useEffect(() => {
    if (isFinanceCreateSuccess || (isFinanceCreateError && financeCreateError?.status === "PARSING_ERROR")) {
      toast.success("Финансовая запись добавлена")
    }

    if (isFinanceEditSuccess) {
      toast.success("Финансовая запись изменена")
    }

    if (isFinanceDeleteSuccess) {
      toast.success("Финансовая запись удалена")
    }

    if ((isFinanceCreateError && financeCreateError?.status !== "PARSING_ERROR") || isFinanceEditError || isFinanceDeleteError) {
      toast.error("Возникла ошибка при взаимодействии с финансовой записью", {
        style: {
          borderColor: "#F31260",
          color: "#F31260",
        }
      })
    }
  }, [
    isFinanceCreating,
    isFinanceCreateError,
    financeCreateError,
    isFinanceCreateSuccess,
    isFinanceEditing,
    isFinanceEditError,
    financeEditError,
    isFinanceEditSuccess,
    isFinanceDeleting,
    isFinanceDeleteError,
    financeDeleteError,
    isFinanceDeleteSuccess
  ]);

  // Select options
  const categoryOptions = ["Доход", "Расход"];
  const typeOptions = [
      "Оплата курса",
      "Авансовый платеж",
      "Продажа учебных материалов",
      "Платные консультации",
      "Зарплата преподавателям",
      "Аренда помещения",
      "Закупка учебных материалов",
      "Маркетинг и реклама",
      "Операционные расходы",
      "Техническое обслуживание и IT",
      "Покупка канцелярии",
      "Налоги и сборы"
  ];

  // Input states
  const [category, setCategory] = useState(categoryOptions[0]);
  const [type, setType] = useState(typeOptions[0]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(parseDate(returnCurrentDate()));
  const [time, setTime] = useState("");
  const [studentId, setStudentId] = useState(null);
  const [teacherId, setTeacherId] = useState(null);
  const [branchFinanceId, setBranchFinanceId] = useState(null);

  // Error states
  const [isCategoryError, setCategoryError] = useState(false)
  const [isTypeError, setTypeError] = useState(false)
  const [isNameError, setNameError] = useState(false)
  const [isAmountError, setAmountError] = useState(false)
  const [isDescriptionError, setDescriptionError] = useState(false)
  const [isDateError, setDateError] = useState(false)
  const [isTimeError, setTimeError] = useState(false)
  const [isStudentidError, setStudentidError] = useState(false)
  const [isTeacheridError, setTeacheridError] = useState(false)
  const [isBranchfinanceidError, setBranchfinanceidError] = useState(false)

  const [minZeroError, setMinZeroError] = useState("")
  const [emptyFieldError, setEmptyFieldError] = useState("")

  // Handlers
  function handleReset() {
    setCategory(categoryOptions[0]);
    setType(typeOptions[0]);
    setName("");
    setAmount(0);
    setDescription("");
    setDate(parseDate(returnCurrentDate()));
    setTime("");
    setStudentId(null);
    setTeacherId(null);
    setBranchFinanceId(null);

    // Error reseting
    setCategoryError(false)
    setTypeError(false)
    setNameError(false)
    setAmountError(false)
    setDescriptionError(false)
    setDateError(false)
    setTimeError(false)
    setStudentidError(false)
    setTeacheridError(false)
    setBranchfinanceidError(false)
    setMinZeroError("")
    setEmptyFieldError("")
  }

  async function handleCreate() {
    if (
      !isCategoryError &&
      !isTypeError &&
      !isNameError &&
      !isAmountError &&
      !isDescriptionError &&
      !isDateError &&
      !isTimeError &&
      !isStudentidError &&
      !isTeacheridError &&
      isBranchfinanceidError
    ) {
      const newFinance = {
        category,
        type,
        name,
        amount,
        description,
        date,
        time,
        student: studentId,
        teacher: teacherId,
        branch: branchFinanceId
      }

      try {
        await createFinance(newFinance).unwrap();
  
        handleReset()

        console.log('Finance record created successfully!');
      } catch (err) {
        console.error('Finance record to create group:', err);
      }
    }
  }

  return (
    <>
      <ToolBar 
        createEvent={onCOpen}
        editEvent={onPOpen}
        deleteEvent={onDOpen}
      />
    </>
  )
}
