"use client";
import React, { useState, useRef } from "react";
//import { usePathname } from 'next/navigation';
import { Form, Input, Textarea, Switch } from "@heroui/react";
import FormSubmit from "./formsubmit";
import HandleSubmit from "../../libs/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cn } from "../../utils/clsxtw";
import { ProjectModelType } from "../../models/project";
import { FormState } from "../../types/types";

/**
 * Component will add a new project.
 *
 *
 */

const initialState: FormState = {
  message: "",
  errors: {},
  isError: false,
};

// Server Form Action
async function projectServerAction(
  prevState: FormState,
  formData: FormData,  
): Promise<FormState> {
    
    // submit the form data to the server
    const formDataEntries: FormState = (await HandleSubmit(
      prevState,
      formData
    )) || { message: "", errors: {}, isError: false };
    return formDataEntries;
}

const AddProject: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  // //const [state, dispatch] = useActionState<FormState, FormData>(
  //   projectServerAction,
  //   initialState
  // );
  const [errors, setErrors] = React.useState<FormState["errors"]>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isActive, setIsActive] = React.useState(true);
  const queryClient = useQueryClient();
  const projectMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const result = await projectServerAction(initialState, formData);
      return result;
    },
    mutationKey: ["projects"],
    onMutate: async (newFormData: FormData) => {
      // Optimistically update the cache with the new item
      await queryClient.cancelQueries({ queryKey: ["projects"] });
      const previousGroups = queryClient.getQueryData<ProjectModelType[]>([
        "projects",
      ]);
      if (previousGroups) {
        queryClient.setQueryData(["projects"], (old: ProjectModelType[]) => [
          ...old,
          newFormData,
        ]);
      }
      return { previousGroups };
    },
    onSuccess: async (): Promise<void> => {
      // Handle success: this will update the state so that the mutation becomes visible to the user
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error, newFormData, context) => {
      // Rollback the optimistic update in case of error
      queryClient.setQueryData(["projects"], context?.previousGroups);
      // Optionally, you can show an error message to the user
      throw new Error("Error creating project", error);
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
      formData.append("type", "project");
      try {
        // Call the server action to handle the form submission
        await projectMutation.mutateAsync(formData);
      } catch (error) {
        console.error("Error submitting form:", error);
        if (projectMutation.data) {
          projectMutation.data.message = "Error submitting form";
          projectMutation.data.isError = true;
        }
        setTimeout(() => {
          projectMutation.data = initialState;
        }, 4000);
      } finally {
        setIsSubmitting(false);
        // Reset the form after submission
        formRef.current?.reset();
      }
    }
  };

  React.useEffect(() => {
    if (projectMutation.data) {
      console.log("Group Mutation Data: ", projectMutation.data.errors);
      setErrors(() => ({
        ...projectMutation.data.errors, // Spread only the errors object
      }));
    }
  }, [projectMutation.data]);
  














  // const handleSubmit = async (formData: FormData, pathname: string | null) => {
    
  //   // tell the handler what type of form it is
  //   formData.append("type", "project");
  //   formData.append("pathname", pathname ?? "");
    
  //   await dispatch(formData);
  //   //router.refresh(); // not working :()
  //   //revalidatePath(`${pathname}`, 'page');
  //   //redirect(`${pathname}`);
  // };

  // React.useEffect(() => {
  //   if (state.errors) {
  //     Object.keys(state.errors).forEach((key) => {
  //       setErrors((prev: any) => ({
  //         ...prev,
  //         [key]: state.errors[key].message,
  //       }));
  //     });
  //   }
  // }, [state.errors]);

  return (
    <section className="mt-6 p-6 border border-zinc-700 rounded-md">
      <h3 className="text-sm pb-2 font-semibold">Add a New Project</h3>
      <Form
        className="w-full max-w-xs"
        validationBehavior="aria"
        validationErrors={errors}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <Input
          isRequired
          label="Project Name"
          className="max-w-xs"
          labelPlacement="inside"
          size="sm"
          variant="faded"
          name="title"
          description="Enter a unique title for the project"
          type="text"
        />

        <Textarea
          className="max-w-xs"
          description="Enter a description for the group"
          label="Project Description"
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
            {isActive ? "Active" : "Dormant"}
           
          </Switch>

        </div>
        
        <FormSubmit />
        {projectMutation.isPending && (
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Creating Group...</p>
                  </div>
                )}
                {projectMutation.isError && (
                  <div className="text-center">
                    <p className="text-sm text-red-600">
                      {(projectMutation.error as Error).message}
                    </p>
                  </div>
                )}
                {projectMutation.isSuccess && (
                  <div
                    className={cn(
                      projectMutation.data?.isError ? "bg-red-800" : "bg-green-800",
                      "text-center rounded-md my-3 p-2 text-white text-sm w-full"
                    )}
                  >
                    <p className="text-sm">
                      {projectMutation.data?.message
                        ? projectMutation.data.message
                        : "Group Created Successfully!"}{" "}
                    </p>
                    <p></p>
                  </div>
                )}
      </Form>
    </section>
  );
};
export default AddProject;
