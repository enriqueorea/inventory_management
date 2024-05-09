import { Inventory } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

interface InventoryResponse {
  data: Inventory | null;
  success: boolean;
  message: string;
}

export const useCreateInventory = (isRequest: boolean) => {
  const createInventory = async () => {
    const { data } = await axios.get<InventoryResponse>(
      "/api/v1/inventory/create"
    );
    console.log(data);
    return data;
  };

  const createInvQuery = useQuery({
    queryKey: ["createInventory"],
    queryFn: createInventory,
    enabled: isRequest,
  });

  return createInvQuery;
};
