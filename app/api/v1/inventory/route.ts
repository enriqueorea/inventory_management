import { auth } from "@/auth";
import { getInventoryById, getInventoryByUserId } from "@/data/inventory";
import { getItemsByStockId } from "@/data/items";

import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  if (req.auth) {
    const user_id = req.auth.user.id as string;
    console.log(user_id);
    const inventory = await getInventoryByUserId(user_id);
    console.log(inventory);
    const inventory_id = inventory?.id;

    if (!inventory_id) {
      return NextResponse.json({
        succes: false,
        message: "Inventory not found",
        data: null,
      });
    }

    const items = await getItemsByStockId(inventory_id);

    if (items) {
      return NextResponse.json({
        succes: true,
        message: "Items found",
        data: items,
      });
    }

    return NextResponse.json({
      succes: false,
      message: "Items not found",
      data: [],
    });
  }

  return NextResponse.json({
    succes: false,
    message: "Not authenticated",
    data: null,
  });
});
