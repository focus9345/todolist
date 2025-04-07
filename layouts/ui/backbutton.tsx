"use client";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";

function BackButton() {
  const router = useRouter();

  return <Button onPress={() => router.back()} variant="ghost" size="sm">Go Back</Button>;
}

export default BackButton;
