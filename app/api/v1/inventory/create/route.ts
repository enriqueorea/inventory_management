import { auth } from "@/auth";
import { createInventory } from "@/data/inventory";
import { user } from "@nextui-org/react";

import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  if (req.auth) {
    try {
      const user_id = req.auth.user.id as string;

      const inventory = await createInventory(user_id);

      const inventory_id = inventory?.id;

      if (!inventory_id) {
        return NextResponse.json({
          succes: false,
          message: "Inventory not created, try again or contact support",
          data: null,
        });
      }

      if (inventory) {
        return NextResponse.json({
          succes: true,
          message: "Inventory created successfully",
          data: inventory,
        });
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          succes: false,
          message: "Inventory not created, try again or contact support",
          data: null,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      succes: false,
      message: "Inventory not created, try again or contact support",
      data: null,
    });
  }

  return NextResponse.json(
    {
      succes: false,
      message: "Not authenticated",
      data: null,
    },
    { status: 401 }
  );
});
