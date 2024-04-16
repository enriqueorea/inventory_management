import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { MdOutlineInventory2 } from "react-icons/md";
import React from "react";
import { LoginForm } from "@/components/Auth";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await auth();

  if (session) redirect("/");

  return (
    <main className="flex flex-wrap justify-center items-center min-h-[100dvh]">
      <Card className="max-w-80 w-full" shadow="lg">
        <CardHeader className="flex flex-col">
          <h1 className="text-center text-2xl font-semibold w-full">
            Bienvenido
          </h1>
          <p className="text-sm text-slate-500 flex gap-1 justify-center items-center">
            Administrador de inventarios{" "}
            <span>
              <MdOutlineInventory2 className="text-slate-900 text-base" />
            </span>
          </p>
        </CardHeader>
        <CardBody>
          <LoginForm />
        </CardBody>
      </Card>
    </main>
  );
};

export default LoginPage;
