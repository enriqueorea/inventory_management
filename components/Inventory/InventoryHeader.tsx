"use client";
import React from "react";
import { AddNewItemButton } from ".";
import { Session } from "next-auth";

export const InventoryHeader = ({
  user,
}: {
  user: Session["user"] | undefined;
}) => {
  console.log(user);
  return (
    <div className="flex w-full items-center">
      <h1 className="text-2xl font-semibold text-slate-700">Mi Inventario</h1>
      <div className="flex-1 border-b-1 border-[#c1c7c6] mx-3"></div>
      <AddNewItemButton />
    </div>
  );
};
