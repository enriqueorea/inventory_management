import { auth } from "@/auth";
import { InventoryHeader, InventoryTable } from "@/components/Inventory";
import React from "react";

const MyInventoryPage = async () => {
  const session = await auth();
  const user = session?.user;

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
