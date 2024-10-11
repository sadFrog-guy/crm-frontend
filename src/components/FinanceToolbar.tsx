import returnCurrentDate from '@/functions/returnCurrentDate';
import usePersistentError from '@/hooks/usePersistentError';
import { useGetBranchesQuery } from '@/services/branchesAPI';
import { useCreateFinanceMutation, useUpdateFinanceMutation, useDeleteFinanceMutation, useGetFinanceByIdQuery } from '@/services/financesAPI';
import { parseDate } from '@internationalized/date';
import { useDisclosure } from '@nextui-org/modal';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import ToolBar from './ToolBar';
import ToolBarModal from './ToolBarModal';
import { Select, SelectItem } from '@nextui-org/select';
import { Input, Textarea } from '@nextui-org/input';
import InputSideContent from './InputSideContent';
import handleInput from '@/functions/handleInput';
import { DatePicker } from '@nextui-org/date-picker';
import {parseAbsoluteToLocal, Time, ZonedDateTime} from "@internationalized/date";
import {useDateFormatter} from "@react-aria/i18n";
import { TimeInput } from '@nextui-org/date-input';
import { useGetStudentsQuery } from '@/services/studentsAPI';
import { useGetTeachersQuery } from '@/services/teachersAPI';
import withMinZeroCheck from '@/functions/decorators/withMinZeroCheck';
import { withEmptyFieldCheck } from '@/functions/decorators/withEmptyFieldCheck';
import formatFinance from '@/functions/formatFinance';

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

  // get students and teachers
  const { data: students, isError: isStudentsError, isLoading: isStudentsLoading } = useGetStudentsQuery({id: branchId, type: 'branch'})
  const { data: teachers, isError: isTeachersError, isLoading: isTeachersLoading } = useGetTeachersQuery({id: branchId, type: 'branch'})

  const selectedRowId = useSelector(state => state.selectedRow.rowId)
  const { data: finance, isError: isGetFinanceByIdError, isLoading: isGetFinanceByIdLoading, refetch: refetchFinance } = useGetFinanceByIdQuery(selectedRowId)

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
  const typeOptions = {
    income: [
      "Оплата за обучение",
      "Авансовый платеж",
      "Продажа учебных материалов",
    ],
    expense: [
      "Зарплата преподавателям",
      "Аренда помещения",
      "Закупка учебных материалов",
      "Маркетинг и реклама",
      "Операционные расходы",
      "Техническое обслуживание и IT",
      "Покупка канцелярии",
      "Налоги и сборы"
    ]
  };

  // Type Detect state
  const [currentType, setCurrentType] = useState(typeOptions.income)

  // Input states
  const [category, setCategory] = useState(categoryOptions[0]);
  const [type, setType] = useState(currentType[0]);
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

  // confirm disabled
  const [isConfirmDisabled, setConfirmDisabled] = useState(false) 

  useEffect(() => {
    if (
      (name.length > 0 && (studentId !== null || teacherId !== null)) 
      && 
      (
        !isCategoryError &&
        !isTypeError &&
        !isNameError &&
        !isAmountError &&
        !isDescriptionError &&
        !isDateError &&
        !isTimeError &&
        !isStudentidError &&
        !isTeacheridError
      )
    ) {
      setConfirmDisabled(false)
    } else {
      setConfirmDisabled(true)
    }
  }, [
    name,
    studentId,
    teacherId,
    isCategoryError,
    isTypeError,
    isNameError,
    isAmountError,
    isDescriptionError,
    isDateError,
    isTimeError,
    isStudentidError,
    isTeacheridError
  ])

  // Handlers
  function handleReset() {
    setCategory(categoryOptions[0]);
    setType(currentType[0]);
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
      !isBranchfinanceidError
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
        branch: branchId
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

  function setValuesForEditing() {
    onPOpen()

    setCurrentType(finance?.category === "Доход" ? typeOptions.income : typeOptions.expense)

    setCategory(finance?.category!)
    setType(finance?.type!)
    setName(finance?.name!)
    setAmount(Number(finance?.amount)!)
    setDescription(finance?.description!)
    setDate(parseDate(finance?.date)!)
    setTime(finance?.time!)
    setStudentId(finance?.student!)
    setTeacherId(finance?.teacher!)
    setBranchFinanceId(finance?.branch!)
  }

  async function handleEdit() {
    const updatedFinance = {
      category,
      type,
      name,
      amount,
      description,
      date,
      time,
      student: studentId,
      teacher: teacherId,
      branch: branchId
    }

    try {
      await editFinance({id: selectedRowId, updatedFinance}).unwrap();

      handleReset()
      refetchFinance()

      console.log('Finance edited successfully!');
    } catch (err) {
      console.error('Finance to edit group:', err);
    }
  }

  async function handleDelete() {
    try {
      await deleteFinance(selectedRowId).unwrap();
      
      console.log('Finance deleted successfully!');
    } catch (err) {
      console.error('Failed to delete finance:', err);
    }
  }

  // decorateds

  const decoratedHandleName = withEmptyFieldCheck(handleInput, setNameError, setEmptyFieldError)
  const decoratedHandleAmount = withMinZeroCheck(handleInput, setAmountError, setMinZeroError)

  return (
    <>
      <ToolBar 
        createEvent={onCOpen}
        editEvent={setValuesForEditing}
        deleteEvent={onDOpen}
      />

      <ToolBarModal
        title='Добавление финансов'
        isOpen={isCOpen}
        onOpen={onCOpen}
        onOpenChange={onCOpenChange}
        onDiscard={handleReset}
        onConfirm={handleCreate}
        isLoading={isFinanceCreating}
        isConfirmDisabled={isConfirmDisabled}
      >
        <div className="flex flex-col gap-5">
         <Select
            disallowEmptySelection={true}
            isRequired
            label="Категория"
            labelPlacement="outside" 
            placeholder="Выберите значение"
            selectedKeys={[category]}
            onChange={(e) => {
              console.log(e.target.value)
              if (e.target.value === "Доход") {
                setCurrentType(typeOptions.income)
              } else {
                setCurrentType(typeOptions.expense)
              }

              handleInput(e, setCategory)
            }}
          >
            {categoryOptions.map(item => {
              return (
                <SelectItem key={item}>
                  {item}
                </SelectItem>
              )
            })}
          </Select>

          <Select
            disallowEmptySelection={true}
            isRequired
            label={"Тип " + category.toLowerCase() + "а"}
            labelPlacement="outside" 
            placeholder="Выберите значение"
            selectedKeys={[type]}
            onChange={(e) => {
              handleInput(e, setType)
            }}
          >
            {currentType.map(item => {
              return (
                <SelectItem key={item}>
                  {item}
                </SelectItem>
              )
            })}
          </Select>

          <Input
            isRequired
            type="number"
            label="Сумма"
            labelPlacement="outside" 
            placeholder="Введите значение"
            endContent={<InputSideContent>сом</InputSideContent>}
            value={String(amount)}
            isInvalid={isAmountError}
            errorMessage={minZeroError}
            onChange={(e) => decoratedHandleAmount(e, setAmount)}
          />

          {type === "Зарплата преподавателям" && category === "Расход"
            ? (
              <Select
                disallowEmptySelection={true}
                isRequired
                label="Педагог"
                labelPlacement="outside" 
                placeholder="Выберите значение"
                selectedKeys={[String(teacherId)]}
                isLoading={isTeachersLoading}
                items={teachers}
                onChange={(e) => {
                  handleInput(e, setTeacherId)
                }}
              >
                {(item => {
                  return (
                    <SelectItem key={item.id}>
                      {item.name + " " + item.surname}
                    </SelectItem>
                  )
                })}
              </Select>
            )
            : typeOptions.income.includes(type) && category === "Доход" ? (
              <Select
                disallowEmptySelection={true}
                isRequired
                label="Ученик"
                labelPlacement="outside" 
                placeholder="Выберите значение"
                selectedKeys={[String(studentId)]}
                isLoading={isStudentsLoading}
                items={students}
                onChange={(e) => {
                  handleInput(e, setStudentId)
                }}
              >
                {(item => {
                  return (
                    <SelectItem key={item.id}>
                      {item.name + " " + item.surname}
                    </SelectItem>
                  )
                })}
              </Select>
            )
            : ""
          }

          <Textarea
            isRequired
            type="text"
            label="Заметка к финансовой записи"
            labelPlacement="outside" 
            placeholder="Введите значение"
            value={name}
            isInvalid={isNameError}
            errorMessage={emptyFieldError}
            onValueChange={(e) => decoratedHandleName(e, setName)}
          />  

          <Input
            isDisabled
            value={isLoading ? "Загрузка..." : branchName}
            label="Филиал" 
            placeholder="..."
            labelPlacement="outside"
          />      
           
        </div>
      </ToolBarModal>

      <ToolBarModal
        title='Редактирование финансов'
        isOpen={isPOpen}
        onOpen={onPOpen}
        onOpenChange={onPOpenChange}
        onDiscard={handleReset}
        onConfirm={handleEdit}
        isLoading={isFinanceEditing}
        isConfirmDisabled={isConfirmDisabled}
      >
        <div className="flex flex-col gap-5">
         <Select
            disallowEmptySelection={true}
            isRequired
            label="Категория"
            labelPlacement="outside" 
            placeholder="Выберите значение"
            selectedKeys={[category]}
            onChange={(e) => {
              console.log(e.target.value)
              if (e.target.value === "Доход") {
                setCurrentType(typeOptions.income)
              } else {
                setCurrentType(typeOptions.expense)
              }

              handleInput(e, setCategory)
            }}
          >
            {categoryOptions.map(item => {
              return (
                <SelectItem key={item}>
                  {item}
                </SelectItem>
              )
            })}
          </Select>

          <Select
            disallowEmptySelection={true}
            isRequired
            label={"Тип " + category.toLowerCase() + "а"}
            labelPlacement="outside" 
            placeholder="Выберите значение"
            selectedKeys={[type]}
            onChange={(e) => {
              handleInput(e, setType)
            }}
          >
            {currentType.map(item => {
              return (
                <SelectItem key={item}>
                  {item}
                </SelectItem>
              )
            })}
          </Select>

          <Input
            isRequired
            type="number"
            label="Сумма"
            labelPlacement="outside" 
            placeholder="Введите значение"
            endContent={<InputSideContent>сом</InputSideContent>}
            value={String(amount)}
            isInvalid={isAmountError}
            errorMessage={minZeroError}
            onChange={(e) => decoratedHandleAmount(e, setAmount)}
          />

          {type === "Зарплата преподавателям" && category === "Расход"
            ? (
              <Select
                disallowEmptySelection={true}
                isRequired
                label="Педагог"
                labelPlacement="outside" 
                placeholder="Выберите значение"
                selectedKeys={[String(teacherId)]}
                isLoading={isTeachersLoading}
                items={teachers}
                onChange={(e) => {
                  handleInput(e, setTeacherId)
                }}
              >
                {(item => {
                  return (
                    <SelectItem key={item.id}>
                      {item.name + " " + item.surname}
                    </SelectItem>
                  )
                })}
              </Select>
            )
            : typeOptions.income.includes(type) && category === "Доход" ? (
              <Select
                disallowEmptySelection={true}
                isRequired
                label="Ученик"
                labelPlacement="outside" 
                placeholder="Выберите значение"
                selectedKeys={[String(studentId)]}
                isLoading={isStudentsLoading}
                items={students}
                onChange={(e) => {
                  handleInput(e, setStudentId)
                }}
              >
                {(item => {
                  return (
                    <SelectItem key={item.id}>
                      {item.name + " " + item.surname}
                    </SelectItem>
                  )
                })}
              </Select>
            )
            : ""
          }

          <Textarea
            isRequired
            type="text"
            label="Заметка к финансовой записи"
            labelPlacement="outside" 
            placeholder="Введите значение"
            value={name}
            isInvalid={isNameError}
            errorMessage={emptyFieldError}
            onValueChange={(e) => decoratedHandleName(e, setName)}
          />  

          <Input
            isDisabled
            value={isLoading ? "Загрузка..." : branchName}
            label="Филиал" 
            placeholder="..."
            labelPlacement="outside"
          />      
           
        </div>
      </ToolBarModal>

      <ToolBarModal
        title='Удаление финансов'
        isOpen={isDOpen}
        onOpen={onDOpen}
        onOpenChange={onDOpenChange}
        isLoading={isFinanceDeleting}
        onConfirm={handleDelete}
      >
        Вы действительно хотите удалить "{finance?.category} - {finance?.type}: {formatFinance(Number(finance?.amount))}"?
      </ToolBarModal>
    </>
  )
}
