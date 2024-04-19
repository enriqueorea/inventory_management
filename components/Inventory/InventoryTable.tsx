"use client";
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

const fakeData: Item[] = [
  {
    id: "234234-234",
    stockId: "4534532",
    stock_number: "DPD50-00670",
    model: "VICA",
    serial: "322104502225",
    description: "EQUIPO ELECTRONICO PARA SOPORTE DE ENERGIA REGULADA",
    brand: "VICA",
    budget_number: "5150001",
    price: 1455.27,
    remarks: "N/A",
  },
  {
    id: "534523-879",
    stockId: "7832456",
    stock_number: "DPD50-00567",
    model: "XLTZ",
    serial: "456789012345",
    description: "COMPUTADORA PORTÁTIL PARA USO GENERAL",
    brand: "XYZ Corp",
    budget_number: "5150002",
    price: 999.99,
    remarks: "N/A",
  },

  {
    id: "123456-789",
    stockId: "9876543",
    stock_number: "DPD50-00321",
    model: "GAMMA",
    serial: "987654321098",
    description: "TELÉFONO INTELIGENTE DE ÚLTIMA GENERACIÓN",
    brand: "GammaTech",
    budget_number: "5150003",
    price: 799.5,
    remarks: "N/A",
  },
];

export const InventoryTable = ({
  user,
}: {
  user: Session["user"] | undefined;
}) => {
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
      <TableBody items={fakeData}>
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>{fakeData.indexOf(item) + 1}</TableCell>
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
