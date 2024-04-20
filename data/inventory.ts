import { db } from "@/lib/prisma";
import { Stock } from "@prisma/client";

export const getInventoryById = async (id: string) => {
  const inventory = await db.stock.findUnique({ where: { id } });

  return inventory;
};

export const getInventoryByUserId = async (userId: string) => {
  const inventory = await db.stock.findUnique({ where: { userId } });
  return inventory;
};

export const createInventory = async (userId: string) => {
  const inventory = db.stock.create({
    data: {
      userId,
    },
  });

  return inventory;
};

export const updateInventory = async (id: string, data: Stock) => {
  const inventory = db.stock.update({
    where: { id },
    data,
  });

  return inventory;
};
