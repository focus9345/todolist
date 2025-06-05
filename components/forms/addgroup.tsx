"use client";
import React, { useState, useRef } from "react";
import { Form, Input, Textarea, Switch } from "@heroui/react";
import FormSubmit from "./formsubmit";
import HandleSubmit from "../../libs/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormState } from "../../types/types";
import { GroupModelType } from "../../models/group";
import mongoose from "mongoose";
import FormMessage from "./formmessage";
/**
 * Add Group Component
 * * This component is used to add a new group to the project.
 * TODO: Add a way to add multiple groups at once
 * TODO: Split form messages and errors into new component
 * TODO - Look into refactoring projects, groups, and tasks into more reusable components.
 * @component
 * @param {string} projectId - The ID of the project to which the group belongs.
 */
const initialState: FormState = {
  message: "",
  errors: {},
  isError: false,
};
interface SidebarRightProps {
  projectId: mongoose.Types.ObjectId;
}
// Server Form Action
async function groupServerAction(
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
const AddGroup: React.FC<SidebarRightProps> = ({ projectId }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = React.useState<FormState["errors"]>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isActive, setIsActive] = React.useState(true);
  const queryClient = useQueryClient();
  const groupMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const result = await groupServerAction(initialState, formData);
      return result;
    },
    mutationKey: ["groups"],
    onMutate: async (newFormData: FormData) => {
      // Optimistically update the cache with the new item
      await queryClient.cancelQueries({ queryKey: ["groups"] });
      const previousGroups = queryClient.getQueryData<GroupModelType[]>([
        "groups",
      ]);
      if (previousGroups) {
        queryClient.setQueryData(["groups"], (old: GroupModelType[]) => [
          ...old,
          newFormData,
        ]);
      }
      return { previousGroups };
    },
    onSuccess: async (): Promise<void> => {
      // Handle success: this will update the state so that the mutation becomes visible to the user
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: (error, newFormData, context) => {
      // Rollback the optimistic update in case of error
      queryClient.setQueryData(["groups"], context?.previousGroups);
      // Optionally, you can show an error message to the user
      throw new Error("Error creating group", error);
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
      formData.append("type", "group");
      formData.append("projectId", String(projectId));
      try {
        // Call the server action to handle the form submission
        await groupMutation.mutateAsync(formData);
      } catch (error) {
        console.error("Error submitting form:", error);
        if (groupMutation.data) {
          groupMutation.data.message = "Error submitting form";
          groupMutation.data.isError = true;
        }
        setTimeout(() => {
          groupMutation.data = initialState;
        }, 4000);
      } finally {
        setIsSubmitting(false);
        // Reset the form after submission
        formRef.current?.reset();
      }
    }
  };
  React.useEffect(() => {
    if (groupMutation.data) {
      //console.log("Group Mutation Data: ", groupMutation.data.errors);
      setErrors(() => ({
        ...groupMutation.data.errors, // Spread only the errors object
      }));
    }
  }, [groupMutation.data]);
  return (
    <section className="mt-6 p-6 border border-zinc-700 rounded-md">
      <h3 className="text-sm pb-2 font-semibold">Add a New Group</h3>
      <Form
        className="w-full max-w-xs"
        validationBehavior="aria"
        validationErrors={errors}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <Input
          isRequired
          label="Group Name"
          className="max-w-xs"
          labelPlacement="inside"
          size="sm"
          variant="faded"
          name="title"
          description="Enter unique title for groups in this project"
          type="text"
        />
        <Textarea
          className="max-w-xs"
          description="Enter a description for the group"
          label="Description"
          labelPlacement="inside"
          name="description"
          size="sm"
          variant="faded"
        />
        <div className="flex flex-col gap-2">
          <Switch
            name="active"
            size="sm"
            isSelected={isActive}
            value={isActive ? "on" : "off"}
            onValueChange={setIsActive}
          >
            Active
          </Switch>
        </div>
        <FormSubmit />
        <FormMessage message={groupMutation} />
      </Form>
    </section>
  );
};
export default AddGroup;
