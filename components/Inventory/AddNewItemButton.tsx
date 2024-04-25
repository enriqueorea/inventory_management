"use client";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";
import { Item } from "@prisma/client";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { FiPlusCircle } from "react-icons/fi";
import { Form, FormField } from "../ui/form";
import { useMutation } from "@tanstack/react-query";
import { NewItem, type NewItemForm } from "@/models/items/new-item";
import axios from "axios";

export const AddNewItemButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  console.log();
  return (
    <>
      <Button
        startContent={<FiPlusCircle />}
        variant="bordered"
        onPress={onOpen}
      >
        Agregar nuevo bien
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center gap-1">
                Nuevo bien
                <div className="flex-1 border-b-1 border-[#c1c7c6] mx-3" />
              </ModalHeader>
              <ModalBody>
                <NewItemForm />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

const NewItemForm = () => {
  const { data: session } = useSession();
  const form = useForm<NewItemForm>({
    defaultValues: {
      stockId: session?.user.stock_id || "",
    },
  });
  const handleImageChange = (file: any) => {
    form.setValue("image", file);
  };

  const mutation = useMutation({
    mutationKey: ["new_item"],
    mutationFn: async (data: any) => {
      return axios.post("/api/v1/items/new-item", data);
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const onSubmit = async (data: NewItemForm) => {
    console.log(data);
    const itemWithFloatPrice = {
      ...data,
      price: data.price.toFixed(2) as number,
    };
    console.log(itemWithFloatPrice);
    mutation.mutate(itemWithFloatPrice);
  };

  console.log(form.watch("image"));
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="stock_number"
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              label="Número de inventario:"
              labelPlacement="outside"
              variant="bordered"
              type="text"
              placeholder="Número de inventario del bien"
            />
          )}
        />
        <FormField
          control={form.control}
          name="description"
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              label="Descripción:"
              labelPlacement="outside"
              variant="bordered"
              type="text"
              placeholder="Descripción del bien"
            />
          )}
        />

        <FormField
          control={form.control}
          name="brand"
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              label="Marca:"
              labelPlacement="outside"
              variant="bordered"
              type="text"
              placeholder="Marca del bien"
            />
          )}
        />

        <FormField
          control={form.control}
          name="model"
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              label="Modelo:"
              labelPlacement="outside"
              variant="bordered"
              type="text"
              placeholder="Modelo del bien"
            />
          )}
        />

        <FormField
          control={form.control}
          name="serial"
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              label="Número de serie:"
              labelPlacement="outside"
              variant="bordered"
              type="text"
              placeholder="Número de serie del bien"
            />
          )}
        />

        <FormField
          control={form.control}
          name="budget_number"
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              label="Número de presupuesto:"
              labelPlacement="outside"
              variant="bordered"
              type="text"
              placeholder="Número de presupuesto del bien"
            />
          )}
        />

        <FormField
          control={form.control}
          name="price"
          defaultValue={0}
          render={({ field }) => (
            <Input
              {...field}
              value={field.value.toString()}
              label="Precio:"
              labelPlacement="outside"
              variant="bordered"
              type="number"
              placeholder="Precio del bien"
            />
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <Input
              onChange={(e) => {
                e.preventDefault();
                handleImageChange(e.target.files?.[0]);
              }}
              label="Imágenes:"
              labelPlacement="outside"
              placeholder="Selecciona una imagen del bien"
              variant="bordered"
              type="file"
            />
          )}
        />

        <FormField
          control={form.control}
          name="remarks"
          defaultValue=""
          render={({ field }) => (
            <Textarea
              {...field}
              label="Observaciones:"
              labelPlacement="outside"
              variant="bordered"
              placeholder="Observaciones u comentarios del bien"
            />
          )}
        />

        <Button type="submit" color="primary">
          Guardar nuevo bien
        </Button>
      </form>
    </Form>
  );
};
