import React, { useActionState } from "react";
import {
  Form,
  Input,
  Textarea,
  DatePicker,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
  Select,
  SelectItem,
} from "@heroui/react";
import FormSubmit from "./formsubmit";
import { createTask } from "../../libs/actions";
import {
  today,
  getLocalTimeZone,
  DateValue,
  parseAbsoluteToLocal,
} from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { TaskStatus, TaskPriority } from "../../types/types";
import { cn } from "../../utils/clsxtw";

/**
 * Component will add a new task.
 *
 *
 */
interface TaskFormState {
  message: string;
  isError: boolean;
}
const initialState: TaskFormState = {
  message: "",
  isError: false,
};
async function taskAction(
  prevState: TaskFormState,
  formData: FormData
): Promise<TaskFormState> {
  // Existing task logic
  const result = await createTask(prevState, formData);
  return {
    message: result?.message || "Success!",
    isError: result?.message ? true : false,
  };
}

const AddTask: React.FC = () => {
  const [date] = React.useState(today(getLocalTimeZone()));

  //const [formattedDate, setFormattedDate] = React.useState(date);

  const [state, formAction] = useActionState<TaskFormState, FormData>(
    taskAction,
    initialState
  );
  const [valueTitle, setValue] = React.useState("");
  //replace this with util function
  const [valueDueDate, setValueDueDate] = React.useState<DateValue | null>(
    date.add({ days: 4 })
  );

  const formatter = useDateFormatter({ dateStyle: "full" });

  return (
    <section className="mt-6 p-6 border border-zinc-700 rounded-md">
      {state.message && (
        <div
          className={cn(
            state.isError ? "bg-red-800" : "bg-green-800",
            "text-center rounded-md my-3 p-2 text-white text-sm"
          )}
        >
          <p>{state.message}</p>
        </div>
      )}
      <h3 className="text-sm">Add a New Task</h3>
      <Form
        className="w-full max-w-xs"
        validationBehavior="native"
        action={(formData: FormData) => formAction(formData)}
      >
        <Input
          className="max-w-xs"
          defaultValue=""
          description="Enter a unique task name"
          errorMessage="Please enter a unique task name"
          isRequired
          label="Task Name"
          labelPlacement="outside"
          name="title"
          placeholder="Enter your task name"
          type="text"
          value={valueTitle}
          onValueChange={(valueTitle) => setValue(valueTitle)}
          size="sm"
          variant="faded"
        />

        <Textarea
          className="max-w-xs"
          defaultValue=""
          description="Enter a description for the task"
          errorMessage="Please enter a description for the task"
          isRequired
          label="Description"
          labelPlacement="outside"
          name="description"
          placeholder="Enter your task description"
          size="sm"
          variant="faded"
        />

        <Select
          className="max-w-xs"
          label="Set Status"
          name="status"
          defaultValue={TaskStatus.open}
        >
          {Object.values(TaskStatus).map((status: string) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </Select>

        <DatePicker
          className="max-w-xs"
          description="Enter a deadline for the task"
          errorMessage="Please enter a deadline for the task"
          granularity="day"
          isRequired
          label="Deadline"
          labelPlacement="outside"
          name="deadline"
          defaultValue={valueDueDate}
          onChange={(valueDueDate) =>
            valueDueDate && setValueDueDate(valueDueDate)
          }
          size="sm"
          variant="faded"
        />
        <p className="text-default-500 text-sm">
          Selected date:{" "}
          {valueDueDate
            ? formatter.format(valueDueDate.toDate(getLocalTimeZone()))
            : "--"}
        </p>

        <RadioGroup label="Set Priority" name="priority">
          {Object.values(TaskPriority).map((priority: string) => (
            <Radio key={priority} value={priority}>
              {priority}
            </Radio>
          ))}
        </RadioGroup>
        <RadioGroup label="Set Group" name="group">
          <Radio value="group-1">Group 1</Radio>
          <Radio value="group-2">Group 2</Radio>
        </RadioGroup>

        <RadioGroup
          label="Set Assignee"
          name="assignee"
          defaultValue={"John Snow"}
        >
          <Radio value="John Snow">John Snow</Radio>
          <Radio value="Tom Jones">Tom Jones</Radio>
        </RadioGroup>
        <RadioGroup label="Set Creator" name="creator">
          <Radio value="John Snow">John Snow</Radio>
          <Radio value="Tom Jones">Tom Jones</Radio>
        </RadioGroup>
        <CheckboxGroup label="Set Tags" name="tags">
          <Checkbox value="this">This</Checkbox>
          <Checkbox value="that">That</Checkbox>
        </CheckboxGroup>
        <CheckboxGroup label="Set Subtasks" name="subtasks">
          <Checkbox value="subtask-1">Subtask 1</Checkbox>
          <Checkbox value="subtask-2">Subtask 2</Checkbox>
        </CheckboxGroup>
        <CheckboxGroup
          label="Set Dependencies"
          name="dependencies"
          defaultValue={["task-1", "task-2"]}
        >
          <Checkbox value="task-1">Task 1</Checkbox>
          <Checkbox value="task-2">Task 2</Checkbox>
        </CheckboxGroup>
        <RadioGroup label="Set Project" name="project">
          <Radio value="project-1">Project 1</Radio>
          <Radio value="project-2">Project 2</Radio>
        </RadioGroup>

        <FormSubmit />
      </Form>
    </section>
  );
};
export default AddTask;
