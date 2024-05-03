import { Item } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export const useInventory = () => {
  const getAllItems = async () => {
    const { data } = await axios.get<{
      succes: boolean;
      data: Item[];
      message: string;
    }>("/api/v1/inventory");
    return data;
  };

  const inventory = useQuery({
    queryKey: ["inventory"],
    queryFn: getAllItems,
  });

  return inventory;
};
