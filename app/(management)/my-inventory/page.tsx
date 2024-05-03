import { auth } from "@/auth";
import { InventoryHeader, InventoryTable } from "@/components/Inventory";
import React from "react";

const MyInventoryPage = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user?.inventory_id) {
    return <div>Inventory not found</div>;
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
