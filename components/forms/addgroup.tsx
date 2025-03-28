'use client';
import React, { useActionState } from "react";
import { Form, Input, Textarea} from "@heroui/react";
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
  isError: boolean;
}
const initialState: GroupFormState = {
  message: "",
  isError: false,
};

async function groupAction(prevState: GroupFormState, formData: FormData): Promise<GroupFormState> {
  // Existing group logic
  const result = await ValidateGroup(prevState, formData);
  return {
    message: result?.message || "Success!",
    isError: result?.message ? true : false,
  };
};
const AddGroup: React.FC = () => {

  const [state, formAction] = useActionState<GroupFormState, FormData>(groupAction, initialState);
  return (
    <section className="mt-6 p-6 border border-zinc-700 rounded-md">
      {state.message && (
        <div
                  className={cn(
                    state.isError ? "bg-green-800" : "bg-red-800",
                    "text-center rounded-md my-3 p-2 text-white text-sm"
                  )}
                >
          <p>{state.message}</p>
        </div>
      )}
    <h3 className="text-sm pb-2 font-semibold">Add a New Group</h3>
    <Form
      className="w-full max-w-xs"
      validationBehavior="native"
      action={(formData: FormData) => formAction(formData)}
    >
      <Input
        isRequired
        errorMessage="Please enter a unique group name"
        label="Goup Name"
        className="max-w-xs"
        labelPlacement="inside"
        size="sm"
        variant="faded"
        name="groupname"
        placeholder="Enter Group Name"
        type="text"
      />
      <Textarea
          className="max-w-xs"
          defaultValue=""
          description="Enter a description for the group"
          errorMessage="Please enter a description for the group"
          isRequired
          label="Description"
          labelPlacement="outside"
          name="description"
          placeholder="Enter your group description"
          size="sm"
          variant="faded"
        />
      <FormSubmit />
    </Form>
    </section>
  );
};
export default AddGroup;
