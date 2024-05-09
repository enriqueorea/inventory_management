"use client";
import { useCreateInventory } from "@/hooks/inventory";
import { Button } from "@nextui-org/react";
import { PackageOpen } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useState } from "react";

export const GenerateInventory = () => {
  const [isRequest, setIsRequest] = useState(false);

  const { data, isLoading, isFetching, error } = useCreateInventory(isRequest);

  const handlePress = () => {
    setIsRequest((prev) => !prev);
  };

  if (!data?.success && error) {
    return <p>Error: {data?.message}</p>;
  }

  if (data?.data?.id) {
    redirect(`/my-inventory/`);
  }

  return (
    <Button
      className="text-xl"
      color="primary"
      variant="bordered"
      onPress={handlePress}
      isLoading={isFetching || isLoading}
    >
      Inicializar Inventario
      <PackageOpen />
    </Button>
  );
};
