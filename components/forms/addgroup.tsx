import React from "react";
import { Form, Input, Button } from "@heroui/react";
import { useFormStatus } from "react-dom";
import FormSubmit from "./formsubmit";

/**
 * Component will add a new group.
 *
 *
 */
const AddGroup: React.FC = () => {
  const [submitted, setSubmitted] = React.useState<{
    [k: string]: FormDataEntryValue;
  } | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    setSubmitted(data);
  };
  return (
    <Form
      className="w-full max-w-xs"
      validationBehavior="native"
      onSubmit={onSubmit}
    >
      <Input
        isRequired
        errorMessage="Please enter a unique group name"
        label="Goup Name"
        labelPlacement="outside"
        name="groupname"
        placeholder="Enter Group Name"
        type="text"
      />
      <FormSubmit />
      {submitted && (
        <div className="text-small text-default-500">
          You submitted: <code>{JSON.stringify(submitted)}</code>
        </div>
      )}
    </Form>
  );
};
export default AddGroup;
