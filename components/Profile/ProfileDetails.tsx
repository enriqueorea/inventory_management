"use client";
import { Profile } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField } from "../ui/form";
import { Button, Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CircleXIcon, SquarePenIcon } from "lucide-react";
import { NewProfileForm } from "./NewProfile";
import { revalidatePath } from "next/cache";

export const ProfileDetails = ({ profile }: { profile: Profile | null }) => {
  const [isDisable, setIsDisable] = useState(true);

  const mutate = useMutation({
    mutationKey: ["update_profile"],
    mutationFn: (data: NewProfileForm) => {
      return axios.put(`/api/v1/profile/${profile?.id}`, data);
    },
    onSuccess(data) {
      setIsDisable((prev) => !prev);
      console.log(data.data);
      revalidatePath("/profile");
    },
  });

  const form = useForm<Profile>({
    defaultValues: profile ?? {},
    disabled: isDisable,
  });

  const onSubmit = (data: Profile) => {
    if (!data) return;
    const updateProfile: NewProfileForm = {
      department: data?.department as string,
      fullname: data?.fullname as string,
      phone: data?.phone as string,
      position: data?.position as string,
    };
    mutate.mutate(updateProfile);
  };

  const handleFormState = () => {
    if (isDisable) {
      setIsDisable((prev) => !prev);
      return;
    }
    form.reset();
    setIsDisable((prev) => !prev);
  };

  if (!profile) return null;
  return (
    <section>
      <div className="flex justify-around items-center gap-4">
        <h3 className="flex-1 text-2xl my-4 font-semibold stroke-slate-400 text-slate-800">
          Perfil
        </h3>
        <Button
          onClick={handleFormState}
          size="sm"
          variant="light"
          isIconOnly
          className="w-fit mx-auto"
        >
          {isDisable ? <SquarePenIcon /> : <CircleXIcon />}
        </Button>
      </div>
      <Form {...form}>
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
                {...field}
                value={field.value ? field.value : ""}
                labelPlacement="outside"
                label="Nombre completo:"
                variant="bordered"
                placeholder="Jose Castillo"
                isInvalid={!!form.formState?.errors?.fullname}
                errorMessage={form.formState?.errors?.fullname?.message}
                className="w-80"
              />
            )}
          />
          <FormField
            control={form.control}
            defaultValue=""
            name="department"
            render={({ field }) => (
              <Input
                {...field}
                value={field.value ? field.value : ""}
                labelPlacement="outside"
                label="Departamento:"
                variant="bordered"
                placeholder="Dirección de planeación"
                isInvalid={!!form.formState?.errors?.department}
                errorMessage={form.formState?.errors?.department?.message}
                className="w-80"
              />
            )}
          />

          <FormField
            control={form.control}
            defaultValue=""
            name="position"
            render={({ field }) => (
              <Input
                {...field}
                value={field.value ? field.value : ""}
                labelPlacement="outside"
                label="Posición:"
                variant="bordered"
                placeholder="trabajador"
                isInvalid={!!form.formState?.errors?.position}
                errorMessage={form.formState?.errors?.position?.message}
                className="w-80"
              />
            )}
          />

          <FormField
            control={form.control}
            defaultValue=""
            name="phone"
            render={({ field }) => (
              <Input
                {...field}
                value={field.value ? field.value : ""}
                labelPlacement="outside"
                label="Teléfono:"
                variant="bordered"
                placeholder="12345678"
                isInvalid={!!form.formState?.errors?.phone}
                errorMessage={form.formState?.errors?.phone?.message}
                className="w-80"
              />
            )}
          />
          {isDisable ? null : (
            <Button
              isLoading={mutate.isPending}
              className="w-full mx-auto"
              size="md"
              variant="bordered"
              type="submit"
            >
              Editar perfil
            </Button>
          )}
        </form>
      </Form>
    </section>
  );
};
