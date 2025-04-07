'use client';
import React, { useActionState } from "react";
import { Form, Input, Textarea, Switch} from "@heroui/react";
import FormSubmit from "./formsubmit";
import { ValidateGroup } from "../../libs/actions";
import { cn } from "../../utils/clsxtw";

/**
 * Component will add a new group.
 *
 *
 */

interface GroupFormState {
  message: string;
  errors: any;
  isError: boolean;
}
const initialState: GroupFormState = {
  message: "",
  errors: {},
  isError: false,
};

async function groupAction(prevState: GroupFormState, formData: FormData): Promise<GroupFormState> {
  // Existing group logic
  const result = await ValidateGroup(prevState, formData);
  return {
    message: result?.message || "Success!",
    errors: result?.errors || {},
    isError: result?.message ? true : false,
  };
};
const AddGroup: React.FC = () => {

  const [state, formAction] = useActionState<GroupFormState, FormData>(groupAction, initialState);
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
          {state.isError ? state.message as string : `Group Created`}
          </p>
        </div>
      )}
    <h3 className="text-sm pb-2 font-semibold">Add a New Group</h3>
    <Form
      className="w-full max-w-xs"
      validationErrors={errors}
      action={(formData: FormData) => formAction(formData)}
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
    </Form>
    </section>
  );
};
export default AddGroup;
