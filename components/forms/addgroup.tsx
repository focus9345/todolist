'use client';
import React, { useActionState } from "react";
import { Form, Input} from "@heroui/react";
import FormSubmit from "./formsubmit";
import { createGroup } from "../../libs/actions";

/**
 * Component will add a new group.
 *
 *
 */

interface GroupFormState {
  message: string;
}
const initialState: GroupFormState = {
  message: "",
};

async function groupAction(prevState: GroupFormState, formData: FormData): Promise<GroupFormState> {
  // Existing group logic
  const result = await groupAction(prevState, formData);
  return {
    message: result?.message || "Success!",
  };
};
const AddGroup: React.FC = () => {

  const [state, formAction] = useActionState<GroupFormState, FormData>(groupAction, initialState);
  return (
    <section className="mt-6 p-6 border border-zinc-700 rounded-md">
      {state.message && (
        <div className="bg-red-800 text-center rounded-md my-3 p-2">
          <p>{state.message}</p>
        </div>
      )}
    <h3 className="text-sm">Add a New Group</h3>
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
        labelPlacement="outside"
        size="sm"
        variant="faded"
        name="groupname"
        placeholder="Enter Group Name"
        type="text"
      />
      <FormSubmit />
      {/* {submitted && (
        <div className="text-small text-default-500">
          You submitted: <code>{JSON.stringify(submitted)}</code>
        </div>
      )} */}
    </Form>
    </section>
  );
};
export default AddGroup;
