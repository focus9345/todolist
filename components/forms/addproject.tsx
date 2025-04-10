"use client";
import React, { useActionState } from "react";
import { Form, Input, Textarea, Switch } from "@heroui/react";
import FormSubmit from "./formsubmit";
import HandleSubmit from "../../libs/actions";
import { cn } from "../../utils/clsxtw";

/**
 * Component will add a new project.
 *
 *
 */

interface ProjectFormState {
  message: string;
  errors: any;
  isError: boolean;
}
const initialState: ProjectFormState = {
  message: "",
  errors: {},
  isError: false,
};

async function projectAction(
  prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  formData.append('type', 'project');
  const result = await HandleSubmit(prevState, formData);
  
  return {
    message: result?.message || "Success!",
    errors: result.errors,
    isError: result.isError, // Adjust this based on your logic
  };
}
const AddProject: React.FC = () => {
  const [state, formAction] = useActionState<ProjectFormState, FormData>(
    projectAction,
    initialState
  );
  const [errors, setErrors] = React.useState<any>({});
  const [isActive, setIsActive] = React.useState(true);

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
      {state.message && (
        <div
          className={cn(
            state.isError ? "bg-red-800" : "bg-green-800",
            "text-center rounded-md my-3 p-2 text-white text-sm"
          )}
        >
          <p>
          {state.isError ? state.message as string : `Project Created`}
          </p>
         
        </div>
      )}
      <h3 className="text-sm pb-2 font-semibold">Add a New Project</h3>
      <Form
        className="w-full max-w-xs"
        validationErrors={errors}
        action={(formData: FormData) => formAction(formData)}
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
            Active
          </Switch>
          {/*
          <p className="text-tiny text-default-500">
            Selected: {isSelectedAct ? "true" : "false"}
          </p>
          
        </div>
        <div className="flex flex-col gap-2">
          <Switch
            name="completed"
            size="sm"
            isSelected={isCompleted}
            value={isCompleted ? "on" : "off"}
            onValueChange={setIsCompleted}
          >
            Completed
          </Switch>
          
          <p className="text-tiny text-default-500">
            Selected: {isSelectedCom ? "true" : "false"}
          </p>
          */}
        </div>
        <FormSubmit />
      </Form>
    </section>
  );
};
export default AddProject;
