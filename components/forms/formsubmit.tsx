"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@heroui/react";

const FormSubmit: React.FC = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" color="primary">
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
};

export default FormSubmit;
