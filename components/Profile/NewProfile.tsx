"use client";
import React from "react";
import { Form, FormField } from "../ui/form";
import { useForm } from "react-hook-form";
import { Button, Input, Tooltip } from "@nextui-org/react";
import { CircleHelpIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { redirect } from "next/navigation";

export interface NewProfileForm {
  department: string;
  fullname: string;
  position: string;
  phone: string;
}

export const NewProfile = () => {
  const form = useForm<NewProfileForm>();
  const mutate = useMutation({
    mutationKey: ["new_profile"],
    mutationFn: (data: NewProfileForm) => {
      return axios.post("/api/v1/profile/create", data);
    },
    onSuccess(data) {
      console.log(data);
      redirect("/profile");
    },
  });
  const onSubmit = (data: NewProfileForm) => {
    mutate.mutate(data);
  };
  return (
    <div className="w-full grid place-content-center">
      <Form {...form}>
        <h3 className="text-2xl text-center mb-10 font-semibold stroke-slate-400 text-slate-800">
          Comienza tu perfil
        </h3>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            defaultValue=""
            name="fullname"
            render={({ field }) => (
              <Input
                labelPlacement="outside"
                label="Nombre completo:"
                variant="bordered"
                placeholder="Jose Castillo"
                isInvalid={!!form.formState?.errors?.fullname}
                errorMessage={form.formState?.errors?.fullname?.message}
                className="w-80"
                {...field}
                endContent={
                  <Tooltip
                    content={
                      <div className="px-1 py-2 max-w-[150px]">
                        <div className="text-small font-bold">
                          Nombre completo
                        </div>
                        <div className="text-tiny">
                          Ingresa tu nombre completo tal como aparece en tu
                          documento ya que este será utilizado para generar los
                          formatos de reporte.
                        </div>
                      </div>
                    }
                  >
                    <Button isIconOnly variant="light">
                      <CircleHelpIcon className="text-slate-400" />
                    </Button>
                  </Tooltip>
                }
              />
            )}
          />
          <FormField
            control={form.control}
            defaultValue=""
            name="department"
            render={({ field }) => (
              <Input
                labelPlacement="outside"
                label="Departamento:"
                variant="bordered"
                placeholder="Dirección de planeación"
                isInvalid={!!form.formState?.errors?.department}
                errorMessage={form.formState?.errors?.department?.message}
                className="w-80"
                {...field}
                endContent={
                  <Tooltip
                    content={
                      <div className="px-1 py-2 max-w-[150px]">
                        <div className="text-small font-bold">Departamento</div>
                        <div className="text-tiny">
                          Ingresa el departamento o unidad donde se localizan
                          fisicamente los bienes.
                        </div>
                      </div>
                    }
                  >
                    <Button isIconOnly variant="light">
                      <CircleHelpIcon className="text-slate-400" />
                    </Button>
                  </Tooltip>
                }
              />
            )}
          />

          <FormField
            control={form.control}
            defaultValue=""
            name="position"
            render={({ field }) => (
              <Input
                labelPlacement="outside"
                label="Posición:"
                variant="bordered"
                placeholder="trabajador"
                isInvalid={!!form.formState?.errors?.position}
                errorMessage={form.formState?.errors?.position?.message}
                className="w-80"
                {...field}
                endContent={
                  <Tooltip
                    content={
                      <div className="px-1 py-2 max-w-[150px]">
                        <div className="text-small font-bold">Posición</div>
                        <div className="text-tiny">
                          Ingresa tu posición en la empresa.
                        </div>
                      </div>
                    }
                  >
                    <Button isIconOnly variant="light">
                      <CircleHelpIcon className="text-slate-400" />
                    </Button>
                  </Tooltip>
                }
              />
            )}
          />

          <FormField
            control={form.control}
            defaultValue=""
            name="phone"
            render={({ field }) => (
              <Input
                labelPlacement="outside"
                label="Teléfono:"
                variant="bordered"
                placeholder="12345678"
                isInvalid={!!form.formState?.errors?.phone}
                errorMessage={form.formState?.errors?.phone?.message}
                className="w-80"
                {...field}
                endContent={
                  <Tooltip
                    content={
                      <div className="px-1 py-2 max-w-[150px]">
                        <div className="text-small font-bold">Teléfono</div>
                        <div className="text-tiny">
                          Ingresa tu número de teléfono.
                        </div>
                      </div>
                    }
                  >
                    <Button isIconOnly variant="light">
                      <CircleHelpIcon className="text-slate-400" />
                    </Button>
                  </Tooltip>
                }
              />
            )}
          />
          <Button
            isLoading={mutate.isPending}
            className="w-80 self-center"
            size="md"
            variant="bordered"
            type="submit"
          >
            Crear perfil
          </Button>
        </form>
      </Form>
    </div>
  );
};
