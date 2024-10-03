import returnCurrentDate from '@/functions/returnCurrentDate';
import usePersistentError from '@/hooks/usePersistentError';
import { useGetBranchesQuery } from '@/services/branchesAPI';
import { useGetGroupsByIdQuery, useCreateGroupMutation, useUpdateGroupMutation, useDeleteGroupMutation, useGetGroupsQuery } from '@/services/groupsAPI';
import { useCreateStudentMutation, useDeleteStudentMutation, useGetStudentByIdQuery, useUpdateStudentMutation } from '@/services/studentsAPI';
import { parseDate } from '@internationalized/date';
import { useDisclosure } from '@nextui-org/modal';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import ToolBar from './ToolBar';
import ToolBarModal from './ToolBarModal';
import { Input, Textarea } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import handleInput from '@/functions/handleInput';
import { DatePicker } from '@nextui-org/date-picker';
import { withEmptyFieldCheck } from '@/functions/decorators/withEmptyFieldCheck';
import { withPhoneNumberCheck } from '@/functions/decorators/withPhoneNumberCheck';
import withMinZeroCheck from '@/functions/decorators/withMinZeroCheck';
import InputSideContent from './InputSideContent';
import formatDate from '@/functions/formatDate';
import { setDisabled } from '@/store/selectedRowSlice';

export default function StudentToolbar() {
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

  // Student CRUD
  const [createStudent, { isLoading: isStudentCreating, isError: isStudentCreateError, error: studentCreateError, isSuccess: isStudentCreateSuccess }] = useCreateStudentMutation();
  const [editStudent, { isLoading: isStudentEditing, isError: isStudentEditError, error: studentEditError, isSuccess: isStudentEditSuccess }] = useUpdateStudentMutation();
  const [deleteStudent, { isLoading: isStudentDeleting, isError: isStudentDeleteError, error: studentDeleteError, isSuccess: isStudentDeleteSuccess }] = useDeleteStudentMutation();

  // Student create effects, notifications about status of CRUD
  useEffect(() => {
    if (isStudentCreateSuccess || (isStudentCreateError && studentCreateError?.status === "PARSING_ERROR")) {
      toast.success("Ученик добавлен")
    }

    if (isStudentEditSuccess) {
      toast.success("Ученик изменен")
    }

    if (isStudentDeleteSuccess) {
      toast.success("Ученик удален")
    }

    if ((isStudentCreateError && studentCreateError?.status !== "PARSING_ERROR") || isStudentEditError || isStudentDeleteError) {
      toast.error("Возникла ошибка при взаимодействии с учеником", {
        style: {
          borderColor: "#F31260",
          color: "#F31260",
        }
      })
    }
  }, [
    isStudentCreating,
    isStudentCreateError,
    studentCreateError,
    isStudentCreateSuccess,
    isStudentEditing,
    isStudentEditError,
    studentEditError,
    isStudentEditSuccess,
    isStudentDeleting,
    isStudentDeleteError,
    studentDeleteError,
    isStudentDeleteSuccess
  ])

  // Select options
  const sexOptions = ["Мужчина", "Женщина"]
  const statusOptions = ["Учится", "На отпуске", "Бросил", "Закончил", "Скоро закончит", "Оплата просрочена"]
  const sourceOptions = ["Соц. сеть", "Узнал от друзей", "Увидел на улице"]

  // Input states  
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [phone, setPhone] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [description, setDescription] = useState("")
  const [studyStart, setStudyStart] = useState(parseDate(returnCurrentDate()))
  const [payment, setPayment] = useState(100)
  const [groupId, setGroupId] = useState(1)
  const [sex, setSex] = useState(sexOptions[0])
  const [status, setStatus] = useState(statusOptions[0])
  const [source, setSource] = useState(sourceOptions[0])

  // Error states
  const [isNameError, setNameError] = useState(false)
  const [isSurnameError, setSurnameError] = useState(false)
  const [isPaymentError, setPaymentError] = useState(false)
  const [isPhoneError, setPhoneError] = useState(false)
  const [isWhatsappError, setWhatsappError] = useState(false)
  const [isDescriptionError, setDescriptionError] = useState(false)

  const [minZeroError, setMinZeroError] = useState("")
  const [emptyFieldError, setEmptyFieldError] = useState("")
  const [notPhoneFormattedError, setNotPhoneFormattedError] = useState("")

  // get selected row
  const selectedRowId = useSelector(state => state.selectedRow.rowId)
  const { data: student, isError: isGetStudentByIdError, isLoading: isGetStudentByIdLoading, refetch: refetchStudent } = useGetStudentByIdQuery(selectedRowId)

  // get group list for form
  const { data: groups, isError: isGroupsError, isLoading: isGroupsLoading } = useGetGroupsQuery(branchId)

  // Handlers
  function handleReset() {
    setName("")
    setSurname("")
    setPhone("")
    setWhatsapp("")
    setDescription("")
    setStudyStart(parseDate(returnCurrentDate()))
    setPayment(1)
    setGroupId(1)
    setSex(sexOptions[0])
    setStatus(statusOptions[0])
    setSource(sourceOptions[0])

    // Error reseting
    setNameError(false)
    setSurnameError(false)
    setPaymentError(false)
    setPhoneError(false)
    setWhatsappError(false)
    setDescriptionError(false)
    setMinZeroError("")
    setEmptyFieldError("")
    setNotPhoneFormattedError("")
  }

  async function handleCreate() {
    if (
      !isNameError &&
      !isSurnameError &&
      !isPaymentError &&
      !isPhoneError &&
      !isWhatsappError &&
      !isDescriptionError
    ) {
      const newStudent = {
        attendances: [],
        sex,
        status,
        name,
        surname,
        phone: "+996" + phone,
        whatsapp: "+996" + whatsapp,
        description,
        source,
        payment,
        study_start_date: formatDate(studyStart.year, studyStart.month, studyStart.day),
        group: groupId,
        branch: branchId
      }

      try {
        await createStudent(newStudent).unwrap();
  
        handleReset()

        console.log('Student created successfully!');
      } catch (err) {
        console.error('Student to create group:', err);
      }
    }
  }

  async function handleEdit() {
    if (
      !isNameError &&
      !isSurnameError &&
      !isPaymentError &&
      !isPhoneError &&
      !isWhatsappError &&
      !isDescriptionError
    ) {
      const updatedStudent = {
        attendances: [],
        sex,
        status,
        name,
        surname,
        phone: "+996" + phone,
        whatsapp: "+996" + whatsapp,
        description,
        source,
        payment,
        study_start_date: formatDate(studyStart.year, studyStart.month, studyStart.day),
        group: groupId,
        branch: branchId
      }

      try {
        await editStudent({id: selectedRowId, updatedStudent}).unwrap();
  
        handleReset()
        refetchStudent()

        console.log('Student edited successfully!');
      } catch (err) {
        console.error('Student to edit group:', err);
      }
    }
  }

  async function handleDelete() {
    try {
      await deleteStudent(selectedRowId).unwrap();
      
      console.log('Student deleted successfully!');
    } catch (err) {
      console.error('Failed to delete student:', err);
    }
  }

  function setValuesForEditing() {
    onPOpen()

    setName(student?.name!)
    setSurname(student?.surname!)
    setPhone(student?.phone.replace("+996", "")!)
    setWhatsapp(student?.whatsapp.replace("+996", "")!)
    setDescription(student?.description!)
    setStudyStart(parseDate(student?.study_start_date!))
    setPayment(student?.payment!)
    setGroupId(student?.group!)
  }

  // Decorated handlers
  const decoratedHandleName = withEmptyFieldCheck(handleInput, setNameError, setEmptyFieldError)
  const decoratedHandleSurname = withEmptyFieldCheck(handleInput, setSurnameError, setEmptyFieldError)
  const decoratedHandleDescription = withEmptyFieldCheck(handleInput, setDescriptionError, setEmptyFieldError)
  const decoratedHandlePayment = withMinZeroCheck(handleInput, setPaymentError, setMinZeroError)
  const decoratedHandlePhone = withPhoneNumberCheck(handleInput, setPhoneError, setNotPhoneFormattedError)
  const decoratedHandleWhatsapp = withPhoneNumberCheck(handleInput, setWhatsappError, setNotPhoneFormattedError)

  return (
    <>
      <ToolBar 
        createEvent={onCOpen}
        editEvent={setValuesForEditing}
        deleteEvent={onDOpen}
      />

      <ToolBarModal
        title='Добавление ученика'
        isOpen={isCOpen}
        onOpen={onCOpen}
        onOpenChange={onCOpenChange}
        onDiscard={handleReset}
        onConfirm={handleCreate}
        isLoading={isStudentCreating}
      >
        <div className="flex flex-col gap-5">
          <div className="flex justify-between">
            <Input
              isRequired
              type="text"
              label="Имя"
              labelPlacement="outside" 
              placeholder="Введите значение"
              className="max-w-[48.5%]"
              value={name}
              isInvalid={isNameError}
              errorMessage={emptyFieldError}
              onValueChange={(e) => decoratedHandleName(e, setName)}
            />

            <Input
              isRequired
              type="text"
              label="Фамилия"
              labelPlacement="outside" 
              placeholder="Введите значение"
              className="max-w-[48.5%]"
              value={surname}
              isInvalid={isSurnameError}
              errorMessage={emptyFieldError}
              onValueChange={(e) => decoratedHandleSurname(e, setSurname)}
            />
          </div>

          <div className="flex justify-between">
            <Select
              isRequired
              label="Пол"
              labelPlacement="outside" 
              placeholder="Выберите значение"
              className="max-w-[29%]"
              selectedKeys={[sex]}
              onChange={(e) => {
                handleInput(e, setSex)
              }}
            >
              {sexOptions.map(item => {
                return (
                  <SelectItem key={item}>
                    {item}
                  </SelectItem>
                )
              })}
            </Select>

            <Select
              isRequired
              label="Статус"
              labelPlacement="outside" 
              placeholder="Выберите значение"
              className="max-w-[68%]"
              selectedKeys={[status]}
              onChange={(e) => {
                handleInput(e, setStatus)
              }}
            >
              {statusOptions.map(item => {
                return (
                  <SelectItem key={item}>
                    {item}
                  </SelectItem>
                )
              })}
            </Select>
          </div>

          <Input
            isRequired
            type="text"
            label="Номер телефона"
            labelPlacement="outside" 
            placeholder="Введите значение"
            startContent={<InputSideContent>+996</InputSideContent>}
            value={phone}
            isInvalid={isPhoneError}
            errorMessage={notPhoneFormattedError}
            onValueChange={(e) => decoratedHandlePhone(e, setPhone)}
          />

          <Input
            isRequired
            type="text"
            label="Whatsapp"
            labelPlacement="outside" 
            placeholder="Введите значение"
            startContent={<InputSideContent>+996</InputSideContent>}
            value={whatsapp}
            isInvalid={isWhatsappError}
            errorMessage={notPhoneFormattedError}
            onValueChange={(e) => decoratedHandleWhatsapp(e, setWhatsapp)}
          />

          <Textarea
            isRequired
            type="text"
            label="Описание"
            labelPlacement="outside" 
            placeholder="Введите значение"
            value={description}
            isInvalid={isDescriptionError}
            errorMessage={emptyFieldError}
            onValueChange={(e) => decoratedHandleDescription(e, setDescription)}
          />

          <div className="flex justify-between items-start">
            <Select
              isRequired
              label="Откуда узнал"
              labelPlacement="outside" 
              placeholder="Выберите значение"
              className="max-w-[48.5%]"
              selectedKeys={[source]}
              onChange={(e) => {
                handleInput(e, setSource)
              }}
            >
              {sourceOptions.map(item => {
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
              label="Оплата"
              labelPlacement="outside" 
              placeholder="Введите значение"
              className="max-w-[48.5%]"
              endContent={<InputSideContent>сом</InputSideContent>}
              value={String(payment)}
              isInvalid={isPaymentError}
              errorMessage={minZeroError}
              onValueChange={(e) => decoratedHandlePayment(e, setPayment)}
            />
          </div>

          <DatePicker 
            isRequired
            label="Дата начала обучения" 
            labelPlacement="outside" 
            value={studyStart}
            onChange={(e) => handleInput(e, setStudyStart)}
          />

          <Select
            isRequired
            label="Группа"
            labelPlacement="outside" 
            placeholder="Выберите значение"
            selectedKeys={[String(groupId)]}
            isLoading={isGroupsLoading}
            items={groups}
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
        </div>
      </ToolBarModal>

      <ToolBarModal
        title='Редактирование ученика'
        isOpen={isPOpen}
        onOpen={onPOpen}
        onOpenChange={onPOpenChange}
        onDiscard={handleReset}
        onConfirm={handleEdit}
        isLoading={isStudentEditing}
      >
        <div className="flex flex-col gap-5">
          <div className="flex justify-between">
            <Input
              isRequired
              type="text"
              label="Имя"
              labelPlacement="outside" 
              placeholder="Введите значение"
              className="max-w-[48.5%]"
              value={name}
              isInvalid={isNameError}
              errorMessage={emptyFieldError}
              onValueChange={(e) => decoratedHandleName(e, setName)}
            />

            <Input
              isRequired
              type="text"
              label="Фамилия"
              labelPlacement="outside" 
              placeholder="Введите значение"
              className="max-w-[48.5%]"
              value={surname}
              isInvalid={isSurnameError}
              errorMessage={emptyFieldError}
              onValueChange={(e) => decoratedHandleSurname(e, setSurname)}
            />
          </div>

          <div className="flex justify-between">
            <Select
              isRequired
              label="Пол"
              labelPlacement="outside" 
              placeholder="Выберите значение"
              className="max-w-[29%]"
              selectedKeys={[sex]}
              onChange={(e) => {
                handleInput(e, setSex)
              }}
            >
              {sexOptions.map(item => {
                return (
                  <SelectItem key={item}>
                    {item}
                  </SelectItem>
                )
              })}
            </Select>

            <Select
              isRequired
              label="Статус"
              labelPlacement="outside" 
              placeholder="Выберите значение"
              className="max-w-[68%]"
              selectedKeys={[status]}
              onChange={(e) => {
                handleInput(e, setStatus)
              }}
            >
              {statusOptions.map(item => {
                return (
                  <SelectItem key={item}>
                    {item}
                  </SelectItem>
                )
              })}
            </Select>
          </div>

          <Input
            isRequired
            type="text"
            label="Номер телефона"
            labelPlacement="outside" 
            placeholder="Введите значение"
            startContent={<InputSideContent>+996</InputSideContent>}
            value={phone}
            isInvalid={isPhoneError}
            errorMessage={notPhoneFormattedError}
            onValueChange={(e) => decoratedHandlePhone(e, setPhone)}
          />

          <Input
            isRequired
            type="text"
            label="Whatsapp"
            labelPlacement="outside" 
            placeholder="Введите значение"
            startContent={<InputSideContent>+996</InputSideContent>}
            value={whatsapp}
            isInvalid={isWhatsappError}
            errorMessage={notPhoneFormattedError}
            onValueChange={(e) => decoratedHandleWhatsapp(e, setWhatsapp)}
          />

          <Textarea
            isRequired
            type="text"
            label="Описание"
            labelPlacement="outside" 
            placeholder="Введите значение"
            value={description}
            isInvalid={isDescriptionError}
            errorMessage={emptyFieldError}
            onValueChange={(e) => decoratedHandleDescription(e, setDescription)}
          />

          <div className="flex justify-between items-start">
            <Select
              isRequired
              label="Откуда узнал"
              labelPlacement="outside" 
              placeholder="Выберите значение"
              className="max-w-[48.5%]"
              selectedKeys={[source]}
              onChange={(e) => {
                handleInput(e, setSource)
              }}
            >
              {sourceOptions.map(item => {
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
              label="Оплата"
              labelPlacement="outside" 
              placeholder="Введите значение"
              className="max-w-[48.5%]"
              endContent={<InputSideContent>сом</InputSideContent>}
              value={String(payment)}
              isInvalid={isPaymentError}
              errorMessage={minZeroError}
              onValueChange={(e) => decoratedHandlePayment(e, setPayment)}
            />
          </div>

          <DatePicker 
            isRequired
            label="Дата начала обучения" 
            labelPlacement="outside" 
            value={studyStart}
            onChange={(e) => handleInput(e, setStudyStart)}
          />

          <Select
            isRequired
            label="Группа"
            labelPlacement="outside" 
            placeholder="Выберите значение"
            selectedKeys={[String(groupId)]}
            isLoading={isGroupsLoading}
            items={groups}
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
        </div>
      </ToolBarModal>

      <ToolBarModal
        title='Удаление ученика'
        isOpen={isDOpen}
        onOpen={onDOpen}
        onOpenChange={onDOpenChange}
        isLoading={isStudentDeleting}
        onConfirm={handleDelete}
      >
        Вы действительно хотите удалить "{student?.name}"?
      </ToolBarModal>
    </>
  )
}
