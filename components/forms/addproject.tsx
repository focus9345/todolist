"use client";
import React, { useActionState } from "react";
import { usePathname } from 'next/navigation';
import { Form, Input, Textarea, Switch } from "@heroui/react";
import FormSubmit from "./formsubmit";
import HandleSubmit from "../../libs/actions";
import { cn } from "../../utils/clsxtw";
import { ProjectModelType } from "../../models/project";

/**
 * Component will add a new project.
 *
 *
 */

interface ProjectFormState {
  message: string;
  errors: ProjectModelType | any;
  isError: boolean;
}
const initialState: ProjectFormState = {
  message: "",
  errors: {},
  isError: false,
};

// Server Form Action
async function taskServerAction(
  prevState: ProjectFormState,
  formData: FormData,  
): Promise<ProjectFormState> {
    
    // sanitize the form data
    const formDataEntries: ProjectFormState = await HandleSubmit(prevState, formData);
    
    return {
      message: formDataEntries?.message,
      errors: formDataEntries?.errors,
      isError: formDataEntries?.isError,
    };
}

const AddProject: React.FC = () => {
  const [state, dispatch] = useActionState<ProjectFormState, FormData>(
    taskServerAction,
    initialState
  );
  const [errors, setErrors] = React.useState<any>({});
  const [isActive, setIsActive] = React.useState(true);
  //const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = async (formData: FormData, pathname: string | null) => {
    
    // tell the handler what type of form it is
    formData.append("type", "project");
    formData.append("pathname", pathname ?? "");
    
    await dispatch(formData);
    //router.refresh(); // not working :()
    //revalidatePath(`${pathname}`, 'page');
    //redirect(`${pathname}`);
  };

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
      <h3 className="text-sm pb-2 font-semibold">Add a New Project</h3>
      <Form
        className="w-full max-w-xs"
        validationErrors={errors}
        action={(formData: FormData) => handleSubmit(formData, pathname)}
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
        {state.message && (
          <div
            className={cn(
              state.isError ? "bg-red-800" : "bg-green-800",
              "text-center rounded-md my-3 p-2 text-white text-sm"
            )}
          >
            <p>
              {state.isError ? (state.message as string) : `Project Created`}
              <br /> state isError: {state.isError ? "true" : "false"}
              <br /> state message: {state.message as string}
              <br /> state errors: {JSON.stringify(state.errors)}
            </p>
          </div>
        )}
        <FormSubmit />
      </Form>
    </section>
  );
};
export default AddProject;
