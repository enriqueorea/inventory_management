import { auth } from "@/auth";
import { InventoryHeader, InventoryTable } from "@/components/Inventory";
import { redirect } from "next/navigation";
import React from "react";

const MyInventoryPage = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user?.inventory_id) {
    return redirect("/my-inventory/create");
  }

  return (
    <main>
      <InventoryHeader user={user} />
      <div>
        <InventoryTable user={user} />
      </div>
    </main>
  );
};

export default MyInventoryPage;
