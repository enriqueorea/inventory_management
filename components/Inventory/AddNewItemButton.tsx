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
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { NewItem, type NewItemForm } from "@/models/items/new-item";
import axios from "axios";
import { toast } from "../ui/use-toast";

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
                <NewItemForm onSucces={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

const NewItemForm = ({ onSucces }: { onSucces: () => void }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const form = useForm<NewItemForm>({
    defaultValues: {
      inventoryId: session?.user.inventory_id || "",
    },
  });
  const handleImageChange = (file: any) => {
    form.setValue("image", file);
  };

  const mutation = useMutation({
    mutationKey: ["new_item"],
    mutationFn: async (data: any) => {
      const formData = new FormData();
      formData.append("stock_number", data.stock_number);
      formData.append("description", data.description);
      formData.append("brand", data.brand);
      formData.append("model", data.model);
      formData.append("serial", data.serial);
      formData.append("budget_number", data.budget_number);
      formData.append("price", data.price);
      formData.append("image", data.image);
      formData.append("remarks", data.remarks);

      return axios.post("/api/v1/items/new-item", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Error al guardar nuevo bien",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["inventory"],
      });
      toast({
        title: "Nuevo bien guardado",
        description: "El nuevo bien ha sido guardado exitosamente",
      });
      form.reset();
      onSucces();
    },
  });

  const onSubmit = async (data: NewItemForm) => {
    console.log(data);
    const itemWithFloatPrice = {
      ...data,
    };
    console.log(itemWithFloatPrice);
    mutation.mutate(itemWithFloatPrice);
  };

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
              placeholder="DPD50-00662"
              isRequired
              isInvalid={!!form.formState.errors.stock_number}
              errorMessage={form.formState.errors.stock_number?.message}
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
              placeholder="IMPRESORA LASER MONOCROMÁTICA"
              isRequired
              isInvalid={!!form.formState.errors.description}
              errorMessage={form.formState.errors.description?.message}
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
              isRequired
              placeholder="HP"
              isInvalid={!!form.formState.errors.brand}
              errorMessage={form.formState.errors.brand?.message}
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
              isRequired
              placeholder="MX404N"
              isInvalid={!!form.formState.errors.model}
              errorMessage={form.formState.errors.model?.message}
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
              isRequired
              placeholder="1234567890"
              isInvalid={!!form.formState.errors.serial}
              errorMessage={form.formState.errors.serial?.message}
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
              isRequired
              placeholder="1234567890"
              isInvalid={!!form.formState.errors.budget_number}
              errorMessage={form.formState.errors.budget_number?.message}
            />
          )}
        />

        <FormField
          control={form.control}
          name="price"
          defaultValue={0}
          render={({ field }) => (
            <Input
              step={0.01}
              value={
                isNaN(field.value) || field.value === 0
                  ? ""
                  : field.value.toString()
              }
              onChange={(e) => {
                console.log(e.target.value);
                const output = Number(e.target.value);
                console.log(output);
                field.onChange(isNaN(output) ? 0 : output);
              }}
              label="Precio:"
              labelPlacement="outside"
              variant="bordered"
              type="number"
              placeholder="1500.00"
              isRequired
              isInvalid={!!form.formState.errors.price}
              errorMessage={form.formState.errors.price?.message}
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
              label="Imágen:"
              labelPlacement="outside"
              placeholder="Selecciona una imagen del bien"
              variant="bordered"
              type="file"
              accept="image/*"
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
