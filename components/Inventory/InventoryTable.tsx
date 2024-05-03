"use client";
import { useInventory } from "@/hooks/inventory";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Item } from "@prisma/client";
import { Session } from "next-auth";

export const InventoryTable = ({
  user,
}: {
  user: Session["user"] | undefined;
}) => {
  const { data, isLoading, isFetching, error } = useInventory();
  const loadingState =
    isLoading || isFetching || data?.data?.length === 0 ? "loading" : "idle";
  return (
    <Table aria-label="Tabla de inventarios personal">
      <TableHeader>
        <TableColumn>#</TableColumn>
        <TableColumn>Número de inventario</TableColumn>
        <TableColumn>Descripción del bien</TableColumn>
        <TableColumn>Marca</TableColumn>
        <TableColumn>Modelo</TableColumn>
        <TableColumn>Serie</TableColumn>
        <TableColumn>Número de presupuesto</TableColumn>
        <TableColumn>Precio</TableColumn>
      </TableHeader>
      <TableBody loadingState={loadingState} items={data?.data ?? []}>
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>0</TableCell>
            <TableCell>{item.stock_number}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item.brand}</TableCell>
            <TableCell>{item.model}</TableCell>
            <TableCell>{item.serial}</TableCell>
            <TableCell>{item.budget_number}</TableCell>
            <TableCell>{item.price}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
