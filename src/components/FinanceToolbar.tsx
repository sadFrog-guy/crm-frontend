// @ts-nocheck

import { parseDate } from "@internationalized/date";
import { useDisclosure } from "@nextui-org/modal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Select, SelectItem } from "@nextui-org/select";
import { Input, Textarea } from "@nextui-org/input";

import InputSideContent from "./InputSideContent";
import ToolBarModal from "./ToolBarModal";
import ToolBar from "./ToolBar";

import handleInput from "@/functions/handleInput";
import {
  useCreateFinanceMutation,
  useUpdateFinanceMutation,
  useDeleteFinanceMutation,
  useGetFinanceByIdQuery,
} from "@/services/financesAPI";
import { useGetBranchesQuery } from "@/services/branchesAPI";
import usePersistentError from "@/hooks/usePersistentError";
import returnCurrentDate from "@/functions/returnCurrentDate";
import { useGetStudentsQuery } from "@/services/studentsAPI";
import { useGetTeachersQuery } from "@/services/teachersAPI";
import withMinZeroCheck from "@/functions/decorators/withMinZeroCheck";
import { withEmptyFieldCheck } from "@/functions/decorators/withEmptyFieldCheck";
import formatFinance from "@/functions/formatFinance";
import { RootState } from "@/store/store";
import { Finance } from "@/types/finances";
import { formatDateISO } from "@/functions/formatDateISO";

type CategoryOption = "Доход" | "Расход";
type typeIncomeOption =  "Оплата за обучение"
                        | "Авансовый платеж"
                        | "Продажа учебных материалов"
type typeExpenseOption = "Зарплата преподавателям"
                        | "Зарплата сотруднику"
                        | "Аренда помещения"
                        | "Закупка учебных материалов"
                        | "Маркетинг и реклама"
                        | "Операционные расходы"
                        | "Техническое обслуживание и IT"
                        | "Покупка канцелярии"
                        | "Налоги и сборы";

export default function FinanceToolbar() {
  // get branch
  const branchId = useSelector((state: RootState) => state.branch.branchId);
  const {
    entities: branches,
    isError,
    isLoading,
  } = usePersistentError(useGetBranchesQuery);
  const [branchName, setBranchName] = useState("");

  useEffect(() => {
    if (isLoading === false && branches) {
      const chosenBranch = branches.filter((item) => item.id === branchId)[0];

      setBranchName(chosenBranch.name);
    }
  }, [isLoading, branches]);

  // get students and teachers
  const {
    data: students,
    isError: isStudentsError,
    isLoading: isStudentsLoading,
  } = useGetStudentsQuery({ id: branchId, type: "branch" });
  const {
    data: teachers,
    isError: isTeachersError,
    isLoading: isTeachersLoading,
  } = useGetTeachersQuery({ id: branchId, type: "branch" });

  const selectedRowId = useSelector((state: RootState) => state.selectedRow.rowId);
  const {
    data: finance,
    isError: isGetFinanceByIdError,
    isLoading: isGetFinanceByIdLoading,
    refetch: refetchFinance,
  } = useGetFinanceByIdQuery(selectedRowId);

  // C - create, P - edit(put), D - delete
  const {
    isOpen: isCOpen,
    onOpen: onCOpen,
    onOpenChange: onCOpenChange,
  } = useDisclosure();
  const {
    isOpen: isPOpen,
    onOpen: onPOpen,
    onOpenChange: onPOpenChange,
  } = useDisclosure();
  const {
    isOpen: isDOpen,
    onOpen: onDOpen,
    onOpenChange: onDOpenChange,
  } = useDisclosure();

  // Finance CRUD
  const [
    createFinance,
    {
      isLoading: isFinanceCreating,
      isError: isFinanceCreateError,
      error: financeCreateError,
      isSuccess: isFinanceCreateSuccess,
    },
  ] = useCreateFinanceMutation();
  const [
    editFinance,
    {
      isLoading: isFinanceEditing,
      isError: isFinanceEditError,
      error: financeEditError,
      isSuccess: isFinanceEditSuccess,
    },
  ] = useUpdateFinanceMutation();
  const [
    deleteFinance,
    {
      isLoading: isFinanceDeleting,
      isError: isFinanceDeleteError,
      error: financeDeleteError,
      isSuccess: isFinanceDeleteSuccess,
    },
  ] = useDeleteFinanceMutation();

  // Finance create effects, notifications about status of CRUD
  useEffect(() => {
    if (
      isFinanceCreateSuccess ||
      isFinanceCreateError
    ) {
      toast.success("Финансовая запись добавлена");
    }

    if (isFinanceEditSuccess) {
      toast.success("Финансовая запись изменена");
    }

    if (isFinanceDeleteSuccess) {
      toast.success("Финансовая запись удалена");
    }

    if (
      isFinanceCreateError ||
      isFinanceEditError ||
      isFinanceDeleteError
    ) {
      toast.error("Возникла ошибка при взаимодействии с финансовой записью", {
        style: {
          borderColor: "#F31260",
          color: "#F31260",
        },
      });
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
    isFinanceDeleteSuccess,
  ]);

  // Select options
  const categoryOptions: CategoryOption[] = ["Доход", "Расход"];
  const typeOptions: { income: typeIncomeOption[], expense: typeExpenseOption[] } = {
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
      "Налоги и сборы",
    ],
  };

  // Type Detect state
  const [currentType, setCurrentType] = useState(typeOptions.income);

  // Input states
  const [category, setCategory] = useState<"Доход" | "Расход">(categoryOptions[0]);
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
  const [isCategoryError, setCategoryError] = useState(false);
  const [isTypeError, setTypeError] = useState(false);
  const [isNameError, setNameError] = useState(false);
  const [isAmountError, setAmountError] = useState(false);
  const [isDescriptionError, setDescriptionError] = useState(false);
  const [isDateError, setDateError] = useState(false);
  const [isTimeError, setTimeError] = useState(false);
  const [isStudentidError, setStudentidError] = useState(false);
  const [isTeacheridError, setTeacheridError] = useState(false);
  const [isBranchfinanceidError, setBranchfinanceidError] = useState(false);

  const [minZeroError, setMinZeroError] = useState("");
  const [emptyFieldError, setEmptyFieldError] = useState("");

  // confirm disabled
  const [isConfirmDisabled, setConfirmDisabled] = useState(false);

  useEffect(() => {
    if (
      name.length > 0 &&
      (
        (category === "Доход" && studentId !== null) 
        || 
        (type === "Зарплата преподавателям" && teacherId !== null)
        ||
        (category === "Расход" && type !== "Зарплата преподавателям")
      ) &&
      !isCategoryError &&
      !isTypeError &&
      !isNameError &&
      !isAmountError &&
      !isDescriptionError &&
      !isDateError &&
      !isTimeError &&
      !isStudentidError &&
      !isTeacheridError
    ) {
      setConfirmDisabled(false);
    } else {
      setConfirmDisabled(true);
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
    isTeacheridError,
  ]);

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
    setCategoryError(false);
    setTypeError(false);
    setNameError(false);
    setAmountError(false);
    setDescriptionError(false);
    setDateError(false);
    setTimeError(false);
    setStudentidError(false);
    setTeacheridError(false);
    setBranchfinanceidError(false);
    setMinZeroError("");
    setEmptyFieldError("");
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
      const newFinance: Partial<Finance> = {
        category,
        type,
        name,
        amount: String(amount),
        description,
        date,
        time,
        student: studentId,
        teacher: teacherId,
        branch: branchId,
      };

      try {
        await createFinance(newFinance).unwrap();

        handleReset();

        console.log("Finance record created successfully!");
      } catch (err) {
        console.error("Finance record to create group:", err);
      }
    }
  }

  function setValuesForEditing() {
    onPOpen();

    setCurrentType(
      
      finance?.category === "Доход" ? typeOptions.income : typeOptions.expense,
    );

    setCategory(finance?.category!);
    
    setType(finance?.type!);
    setName(finance?.name!);
    setAmount(Number(finance?.amount)!);
    setDescription(finance?.description!);
    
    setDate(parseDate(finance?.date)!);
    setTime(finance?.time!);
    setStudentId(finance?.student!);
    setTeacherId(finance?.teacher!);
    setBranchFinanceId(finance?.branch!);
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
      branch: branchId,
    };

    try {
      await editFinance({ id: selectedRowId, updatedFinance }).unwrap();

      handleReset();
      refetchFinance();

      console.log("Finance edited successfully!");
    } catch (err) {
      console.error("Finance to edit group:", err);
    }
  }

  async function handleDelete() {
    try {
      await deleteFinance(selectedRowId).unwrap();

      console.log("Finance deleted successfully!");
    } catch (err) {
      console.error("Failed to delete finance:", err);
    }
  }

  // decorateds

  const decoratedHandleName = withEmptyFieldCheck(
    handleInput,
    setNameError,
    setEmptyFieldError,
  );
  const decoratedHandleAmount = withMinZeroCheck(
    handleInput,
    setAmountError,
    setMinZeroError,
  );

  return (
    <>
      <ToolBar
        createEvent={onCOpen}
        deleteEvent={onDOpen}
        editEvent={setValuesForEditing}
      />

      <ToolBarModal
        isConfirmDisabled={isConfirmDisabled}
        isLoading={isFinanceCreating}
        isOpen={isCOpen}
        title="Добавление финансов"
        onConfirm={handleCreate}
        onDiscard={handleReset}
        onOpen={onCOpen}
        onOpenChange={onCOpenChange}
      >
        <div className="flex flex-col gap-5">
          <Select
            isRequired
            disallowEmptySelection={true}
            label="Категория"
            labelPlacement="outside"
            placeholder="Выберите значение"
            selectedKeys={[category]}
            onChange={(e) => {
              console.log(e.target.value);
              if (e.target.value === "Доход") {
                setCurrentType(typeOptions.income);
              } else {
                
                setCurrentType(typeOptions.expense);
              }

              handleInput(e, setCategory);
            }}
          >
            {categoryOptions.map((item) => {
              return <SelectItem key={item}>{item}</SelectItem>;
            })}
          </Select>

          <Select
            isRequired
            disallowEmptySelection={true}
            label={"Тип " + category.toLowerCase() + "а"}
            labelPlacement="outside"
            placeholder="Выберите значение"
            selectedKeys={[type]}
            onChange={(e) => {
              handleInput(e, setType);
            }}
          >
            {currentType.map((item) => {
              return <SelectItem key={item}>{item}</SelectItem>;
            })}
          </Select>

          <Input
            isRequired
            endContent={<InputSideContent>сом</InputSideContent>}
            errorMessage={minZeroError}
            isInvalid={isAmountError}
            label="Сумма"
            labelPlacement="outside"
            placeholder="Введите значение"
            type="number"
            value={String(amount)}
            onChange={(e) => decoratedHandleAmount(e, setAmount)}
          />
          {
          type === "Зарплата преподавателям" && category === "Расход" ? (
            <Select
              isRequired
              disallowEmptySelection={true}
              isLoading={isTeachersLoading}
              items={teachers}
              label="Педагог"
              labelPlacement="outside"
              placeholder="Выберите значение"
              selectedKeys={[String(teacherId)]}
              onChange={(e) => {
                handleInput(e, setTeacherId);
              }}
            >
              {(item) => {
                return (
                  <SelectItem key={item.id}>
                    {item.name + " " + item.surname}
                  </SelectItem>
                );
              }}
            </Select>
          ) : typeOptions.income.includes(type) && category === "Доход" ? (
            <Select
              isRequired
              disallowEmptySelection={true}
              isLoading={isStudentsLoading}
              items={students}
              label="Ученик"
              labelPlacement="outside"
              placeholder="Выберите значение"
              selectedKeys={[String(studentId)]}
              onChange={(e) => {
                handleInput(e, setStudentId);
              }}
            >
              {(item) => {
                return (
                  <SelectItem key={item.id}>
                    {item.name + " " + item.surname}
                  </SelectItem>
                );
              }}
            </Select>
          ) : (
            ""
          )}

          <Textarea
            isRequired
            errorMessage={emptyFieldError}
            isInvalid={isNameError}
            label="Заметка к финансовой записи"
            labelPlacement="outside"
            placeholder="Введите значение"
            type="text"
            value={name}
            onValueChange={(e) => decoratedHandleName(e, setName)}
          />

          <Input
            isDisabled
            label="Филиал"
            labelPlacement="outside"
            placeholder="..."
            value={isLoading ? "Загрузка..." : branchName}
          />
        </div>
      </ToolBarModal>

      <ToolBarModal
        isConfirmDisabled={isConfirmDisabled}
        isLoading={isFinanceEditing}
        isOpen={isPOpen}
        title="Редактирование финансов"
        onConfirm={handleEdit}
        onDiscard={handleReset}
        onOpen={onPOpen}
        onOpenChange={onPOpenChange}
      >
        <div className="flex flex-col gap-5">
          <Select
            isRequired
            disallowEmptySelection={true}
            label="Категория"
            labelPlacement="outside"
            placeholder="Выберите значение"
            selectedKeys={[category]}
            onChange={(e) => {
              console.log(e.target.value);
              if (e.target.value === "Доход") {
                setCurrentType(typeOptions.income);
              } else {
                
                setCurrentType(typeOptions.expense);
              }

              handleInput(e, setCategory);
            }}
          >
            {categoryOptions.map((item) => {
              return <SelectItem key={item}>{item}</SelectItem>;
            })}
          </Select>

          <Select
            isRequired
            disallowEmptySelection={true}
            label={"Тип " + category.toLowerCase() + "а"}
            labelPlacement="outside"
            placeholder="Выберите значение"
            selectedKeys={[type]}
            onChange={(e) => {
              handleInput(e, setType);
            }}
          >
            {currentType.map((item) => {
              return <SelectItem key={item}>{item}</SelectItem>;
            })}
          </Select>

          <Input
            isRequired
            endContent={<InputSideContent>сом</InputSideContent>}
            errorMessage={minZeroError}
            isInvalid={isAmountError}
            label="Сумма"
            labelPlacement="outside"
            placeholder="Введите значение"
            type="number"
            value={String(amount)}
            onChange={(e) => decoratedHandleAmount(e, setAmount)}
          />
          {
          type === "Зарплата преподавателям" && category === "Расход" ? (
            <Select
              isRequired
              disallowEmptySelection={true}
              isLoading={isTeachersLoading}
              items={teachers}
              label="Педагог"
              labelPlacement="outside"
              placeholder="Выберите значение"
              selectedKeys={[String(teacherId)]}
              onChange={(e) => {
                handleInput(e, setTeacherId);
              }}
            >
              {(item) => {
                return (
                  <SelectItem key={item.id}>
                    {item.name + " " + item.surname}
                  </SelectItem>
                );
              }}
            </Select>
          ) : typeOptions.income.includes(type) && category === "Доход" ? (
            <Select
              isRequired
              disallowEmptySelection={true}
              isLoading={isStudentsLoading}
              items={students}
              label="Ученик"
              labelPlacement="outside"
              placeholder="Выберите значение"
              selectedKeys={[String(studentId)]}
              onChange={(e) => {
                handleInput(e, setStudentId);
              }}
            >
              {(item) => {
                return (
                  <SelectItem key={item.id}>
                    {item.name + " " + item.surname}
                  </SelectItem>
                );
              }}
            </Select>
          ) : (
            ""
          )}

          <Textarea
            isRequired
            errorMessage={emptyFieldError}
            isInvalid={isNameError}
            label="Заметка к финансовой записи"
            labelPlacement="outside"
            placeholder="Введите значение"
            type="text"
            value={name}
            onValueChange={(e) => decoratedHandleName(e, setName)}
          />

          <Input
            isDisabled
            label="Филиал"
            labelPlacement="outside"
            placeholder="..."
            value={isLoading ? "Загрузка..." : branchName}
          />
        </div>
      </ToolBarModal>

      <ToolBarModal
        isLoading={isFinanceDeleting}
        isOpen={isDOpen}
        title="Удаление финансов"
        onConfirm={handleDelete}
        onOpen={onDOpen}
        onOpenChange={onDOpenChange}
      >
        Вы действительно хотите удалить "{finance?.category} - {finance?.type}:{" "}
        {formatFinance(Number(finance?.amount))}"?
      </ToolBarModal>
    </>
  );
}
