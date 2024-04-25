import { db } from "@/lib/prisma";
import { NewItem } from "@/models/items/new-item";
import { Item } from "@prisma/client";

export const getItemById = async (id: string) => {
  const item = await db.item.findUnique({
    where: { id },
    include: {
      image: true,
    },
  });
  return item;
};

export const getItemsByStockId = async (stockId: string) => {
  const items = await db.item.findMany({
    where: { stockId },
  });
  return items;
};

export const createItem = async (new_item: NewItem) => {
  const item = await db.item.create({
    data: new_item,
  });
  return item;
};

export const updateItem = async (id: string, new_item: NewItem) => {
  const item = await db.item.update({
    where: { id },
    data: new_item,
  });
  return item;
};

export const deleteItem = async (id: string) => {
  const item = await db.item.delete({
    where: { id },
  });
  return item;
};

export const createItemImage = async (itemId: string, image_url: string) => {
  const image = await db.itemImage.create({
    data: {
      url: image_url,
      itemId,
    },
  });
  return image;
};
