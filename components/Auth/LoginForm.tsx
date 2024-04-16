"use client";
import { Button, Divider, Input, Tooltip } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { Form, FormField } from "../ui/form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa6";
import { useState } from "react";
import { signIn } from "next-auth/react";

export const LoginForm = () => {
  const form = useForm();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name="usuario"
            control={form.control}
            defaultValue={""}
            render={({ field }) => (
              <Input
                labelPlacement="outside"
                autoComplete="username"
                isRequired
                color="primary"
                variant="bordered"
                {...field}
                label="Usuario:"
                placeholder="Ingresa tu usuario"
              />
            )}
          />
          <FormField
            name="password"
            control={form.control}
            defaultValue={""}
            render={({ field }) => (
              <Input
                {...field}
                label="Password"
                isRequired
                variant="bordered"
                autoComplete="current-password"
                labelPlacement="outside"
                color="primary"
                placeholder="Ingresa tu contraseña"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <FiEyeOff className="text-lg text-default-400 pointer-events-none" />
                    ) : (
                      <FiEye className="text-lg text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="max-w-xs"
              />
            )}
          />
          <Button
            type="submit"
            className="w-full"
            variant="bordered"
            color="primary"
          >
            Iniciar sesión
          </Button>
        </form>
      </Form>
      <div>
        <div className="flex items-center my-5">
          <div className="flex-1 border-b-1 border-[#c1c7c6] mx-3" />
          <span className="text-[13px] text-[#5c6c75]">
            O inicia sesión con
          </span>
          <div className="flex-1 border-b-1 border-[#c1c7c6] mx-3" />
        </div>
        <div className="w-full flex items-center justify-center">
          <Tooltip content="Iniciar sesión con Google">
            <Button
              onPress={() => signIn("google")}
              variant="faded"
              color="primary"
              isIconOnly
              type="button"
            >
              <FaGoogle />
            </Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};
