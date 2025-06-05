"use client";
import React, { useState, useRef } from "react";
import {
  Form,
  Textarea,
  DatePicker,
  Input,
  Select,
  SelectItem,
  DateValue,
} from "@heroui/react";
import FormSubmit from "./formsubmit";
import HandleSubmit from "../../libs/actions";
import { DueDateDefault, CreateDate } from "../../utils/dates";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskStatus, TaskPriority, TaskTags, FormState } from "../../types/types";
//import { cn } from "../../utils/clsxtw";
import { TaskModelType } from "../../models/task";
import { GroupModelType } from "../../models/group";
import mongoose from "mongoose";
import FormMessage from "./formmessage";
/**
 * Component will add a new task.
 * TODO - Move initialState to a separate file for better organization.
 * TODO - Look into refactoring projects, groups, and tasks into more reusable components.
 */
const initialState: FormState = {
  message: "", // Ensure message is always a string
  errors: {},
  isError: false,
};
interface SidebarRightProps {
    projectId: mongoose.Types.ObjectId;
}

// Server Form Action
async function taskServerAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // submit the form data to the server
  const formDataEntries: FormState = (await HandleSubmit(
    prevState,
    formData
  )) || { message: "", errors: {}, isError: false };
  return formDataEntries;
}

const AddTask: React.FC<SidebarRightProps> = ({projectId}) => {
  const formRef = useRef<HTMLFormElement>(null);
  // const [showMessage, setShowMessage] = useState(false);
  // Initialize state for the due date
  const [valueDueDate, setValueDueDate] = useState<DateValue>(DueDateDefault());
  const [errors, setErrors] = React.useState<FormState["errors"]>(initialState.errors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  // lets get the query data for groups to choose from
  const groups = queryClient.getQueryData<GroupModelType[]>(["groups", projectId]);
  console.log("Groups: ", groups);

  // Create a mutation for adding a new task
  const taskMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const result = await taskServerAction(initialState, formData);
      return result;
    },
    mutationKey: ["tasks"],
    onMutate: async (newFormData: FormData) => {
      // Optimistically update the cache with the new task
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData<TaskModelType[]>([
        "tasks",
      ]);
      if (previousTasks) {
        queryClient.setQueryData(["tasks"], (old: TaskModelType[]) => [
          ...old,
          newFormData,
        ]);
      }
      return { previousTasks };
    },
    onSuccess: async (): Promise<void> => {
      // Handle success: this will update the state so that the mutation becomes visible to the user
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error, newFormData, context) => {
      // Rollback the optimistic update in case of error
      queryClient.setQueryData(["tasks"], context?.previousTasks);
      // Optionally, you can show an error message to the user
      throw new Error("Error creating task", error);
    },
  
  });
  interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {
    currentTarget: HTMLFormElement;
  }

  const handleSubmit = async (event: HandleSubmitEvent): Promise<void> => {
    event.preventDefault();
    
    if (!isSubmitting) {
      setIsSubmitting(true);
      const formData = new FormData(event.currentTarget);
      // Append the type to the form data
      formData.append("type", "task");

      try {
        // Call the server action to handle the form submission
        await taskMutation.mutateAsync(formData);
      } catch (error) {
        console.error("Error submitting form:", error);
        if (taskMutation.data) {
          taskMutation.data.message = "Error submitting form";
          taskMutation.data.isError = true;
        }
        setTimeout(() => {
          taskMutation.data = initialState;
        }, 5000);
      } finally {
        setIsSubmitting(false);
        // Reset the form after submission
        formRef.current?.reset();
      }
    }
  };

  React.useEffect(() => {
      if (taskMutation.data) {
        setErrors(() => ({
          ...taskMutation.data.errors, // Spread only the errors object
        }));
      }
    }, [taskMutation.data]);

    // React.useEffect(() => {
    //   if (taskMutation.isSuccess) {
    //     setShowMessage(true);
    //     const timer = setTimeout(() => {
    //       setShowMessage(false);
    //       taskMutation.data = initialState; // Reset the data after showing the message
    //     }, 6000);
    //   return () => clearTimeout(timer); // Clean up the timer on unmount
    //  } 
    // }
    // , [taskMutation.isSuccess]);

  return (
    <section className="mt-6 p-6 border border-zinc-700 rounded-md">
      <h3 className="text-sm pb-2 font-semibold">Add a New Task </h3>
      <Form
        className="w-full max-w-xs"
        validationBehavior="aria"
        validationErrors={errors}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <Input
          className="max-w-xs"
          description="Enter a task name"
          isRequired
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
          label="Group"
          labelPlacement="inside"
          name="groupId"
          selectionMode="single"
          isRequired
        >
          {Object.values(groups ?? []).map((group) => (
            <SelectItem 
              key={group._id.toString()}>

              {group.title}
            </SelectItem>
          ))}
        </Select>
        <Select
          className="max-w-xs"
          label="Set Status"
          labelPlacement="inside"
          name="status"
          defaultSelectedKeys={[TaskStatus.opened]}
          isRequired
        >
          {Object.values(TaskStatus).map((status: string) => (
            <SelectItem key={status}>
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
            <SelectItem key={priority}>
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
          minValue={CreateDate()}
          defaultValue={valueDueDate ? valueDueDate : CreateDate()}
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
          {Object.values(TaskTags).map((tag) => (
            <SelectItem key={tag}>
              {tag}
            </SelectItem>
          ))}
        </Select>
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
        <FormMessage message={taskMutation} />

        {/* {taskMutation.isPending && (
          <div className="text-center">
            <p className="text-sm text-gray-500">Creating Task...</p>
          </div>
        )}
        {taskMutation.isError && (
          <div className="text-center">
            <p className="text-sm text-red-600">
              {(taskMutation.error as Error).message}
            </p>
          </div>
        )}
        {taskMutation.isSuccess && (
          <div
            className={cn(
              taskMutation.data?.isError ? "bg-red-800" : "bg-green-800",
              "text-center rounded-md my-3 p-2 text-white text-sm w-full"
            )}
          >
            <p className="text-sm">
              {taskMutation.data?.message
                ? taskMutation.data.message
                : "Task Created Successfully!"} </p>
                <p>
            </p>
          </div>
        )} */}
        
      </Form>
    </section>
  );
};
export default AddTask;
