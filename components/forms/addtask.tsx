"use client";
import React, { useActionState } from "react";
import {
  Form,
  Input,
  Textarea,
  DatePicker,
  //RadioGroup,
  //Radio,
  //CheckboxGroup,
  //Checkbox,
  Select,
  SelectItem,
} from "@heroui/react";
import FormSubmit from "./formsubmit";
import HandleSubmit from "../../libs/actions";
import { DueDateDefault } from "../../utils/dates";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DateValue } from "@internationalized/date";
import { TaskStatus, TaskPriority, TaskTags } from "../../types/types";
import { cn } from "../../utils/clsxtw";
import { TaskModelType } from "../../models/task";

/**
 * Component will add a new task.
 *
 *
 */
interface TaskFormState {
  message: string;
  errors: TaskModelType | any;  
  isError: boolean;
}
const initialState: TaskFormState = {
  message: "",
  errors: {},
  isError: false,
};


// Server Form Action
async function taskServerAction(
  prevState: TaskFormState,
  formData: FormData  
): Promise<TaskFormState> {
    
    // sanitize the form data
    const formDataEntries: TaskFormState = await HandleSubmit(prevState, formData);
    return {
      message: formDataEntries?.message,
      errors: formDataEntries?.errors,
      isError: formDataEntries?.isError,
    };
}







// async function taskAction(
//   prevState: TaskFormState,
//   formData: FormData
// ): Promise<TaskFormState> {
//   // set formtype
//   formData.append("type", "task");
//   // Existing task logic
//   const result = await HandleSubmit(prevState, formData);
//   return {
//     message: result?.message || "Error", // Default message
//     errors: result?.errors,
//     isError: result?.isError || false, // Adjust this based on your logic
//   };
// }

const AddTask: React.FC = () => {
  const [state, dispatch] = useActionState<TaskFormState, FormData>(
    taskServerAction,
    initialState
  );
  const [valueDueDate, setValueDueDate] = React.useState<DateValue | null>(DueDateDefault());
  const [errors, setErrors] = React.useState<any>({});
  const queryClient = useQueryClient();
  const createTaskMutation = useMutation((formData: FormData) => dispatch(formData), {
    onSuccess: (data) => {
      // Handle success
      console.log("Task Created Successfully", data);
      queryClient.invalidateQueries({ queryKeys: ["tasks"] });
    }
  });


  const handleSubmit = async (formData: FormData) => {
    //event.preventDefault();
    //const formData = new FormData(event.currentTarget as HTMLFormElement);
    // Call the action with the form data
    // tell the handler what type of form it is
    formData.append("type", "task");
    createTaskMutation.mutate(formData);

    //await dispatch(formData);
    //queryClient.invalidateQueries(["tasks"]);
    // console.log("Add Task Form Submitted");
    // console.log(result);
    // router.refresh();
  };

  //replace this with utility function
  // const [date] = React.useState(today(getLocalTimeZone()));
  // const [state, formAction] = useActionState<TaskFormState, FormData>(
  //   taskAction,
  //   initialState
  // );

   
  // //const [isActive, setIsActive] = React.useState(true);
  // //replace this with util function
  // const [valueDueDate, setValueDueDate] = React.useState<DateValue | null>(
  //   date.add({ days: 4 })
  // );
  React.useEffect(() => {
    if (state.errors) {
      Object.keys(state.errors).forEach((key) => {
        setErrors((prev: any) => ({
          ...prev,
          [key]: state.errors[key].message,
        }));
      });
    }
  }, [state.errors]);

  return (
    <section className="mt-6 p-6 border border-zinc-700 rounded-md">
      <h3 className="text-sm pb-2 font-semibold">Add a New Task </h3>
      <Form
        className="w-full max-w-xs"
        validationBehavior="aria"
        validationErrors={errors}
        //onSubmit={handleSubmit}
        action={(formData: FormData) => handleSubmit(formData)}
        //action={(formData: FormData) => formAction(formData)}
      >
        <Input
          className="max-w-xs"
          description="Enter a task name"
          isRequired
          errorMessage="Please enter a valid task name"
          label="Task Name"
          labelPlacement="inside"
          name="title"
          type="text"
          size="sm"
          variant="faded"
        />
        <Textarea
          className="max-w-xs"
          description="Enter a description for the task"
          label="Description"
          labelPlacement="inside"
          name="description"
          size="sm"
          variant="faded"
        />
        <Select
          className="max-w-xs"
          label="Set Status"
          labelPlacement="inside"
          name="status"
          defaultSelectedKeys={[TaskStatus.opened]}
          isRequired
        >
          {Object.values(TaskStatus).map((status: string) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </Select>
        <Select
          className="max-w-xs"
          label="Set Priority"
          labelPlacement="inside"
          name="priority"
          defaultSelectedKeys={[TaskPriority.low]}
          isRequired
        >
          {Object.values(TaskPriority).map((priority: string) => (
            <SelectItem key={priority} value={priority}>
              {priority}
            </SelectItem>
          ))}
        </Select>

        <DatePicker
          className="max-w-xs"
          description="Enter a deadline for the task"
          granularity="day"
          isRequired
          label="Deadline"
          labelPlacement="inside"
          name="deadline"
          defaultValue={valueDueDate? valueDueDate : DueDateDefault()}
          onChange={(valueDueDate) =>
            valueDueDate && setValueDueDate(valueDueDate)
          }
          size="sm"
          variant="faded"
        />
        <Select
          className="max-w-xs"
          label="Tags"
          labelPlacement="inside"
          name="tags"
          defaultSelectedKeys={[TaskTags.feature]}
          selectionMode="multiple"
          isRequired
        >
          {Object.values(TaskTags).map((tag: string) => (
            <SelectItem key={tag} value={tag}>
              {tag}
            </SelectItem>
          ))}
        </Select>
        {/* will need to be a select for users on this project */}
        <Input
          className="max-w-xs"
          value="Fake Name"
          isDisabled
          label="Assignee"
          labelPlacement="inside"
          name="assignee"
          type="text"
          size="sm"
          variant="faded"
        />

        <FormSubmit />

        {state.message && (
          <div
            className={cn(
              state.isError ? "bg-red-800" : "bg-green-800",
              "text-center rounded-md my-3 p-2 text-white text-sm w-full"
            )}
          >
            <p>
              {state.isError ? (state.message as string) : `Task Created`}
              <br /> state isError: {state.isError ? "true" : "false"}
              <br /> state message: {state.message as string}
              <br /> state errors: {JSON.stringify(state.errors)}
            </p>
          </div>
        )}
      </Form>
    </section>
  );
};
export default AddTask;
