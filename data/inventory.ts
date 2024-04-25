import { db } from "@/lib/prisma";
import { Inventory } from "@prisma/client";

export const getInventoryById = async (id: string) => {
  const inventory = await db.inventory.findUnique({ where: { id } });

  return inventory;
};

export const getInventoryByUserId = async (userId: string) => {
  const inventory = await db.inventory.findUnique({ where: { userId } });
  return inventory;
};

export const createInventory = async (userId: string) => {
  const inventory = db.inventory.create({
    data: {
      userId,
    },
  });

  return inventory;
};

export const updateInventory = async (id: string, data: Inventory) => {
  const inventory = db.inventory.update({
    where: { id },
    data,
  });

  return inventory;
};
