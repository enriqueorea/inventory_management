import { auth } from "@/auth";
import { Card, CardHeader } from "@nextui-org/react";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session) redirect("/dashboard");
  if (!session) redirect("/auth/login");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Card>
          <CardHeader>Total de activos</CardHeader>
        </Card>
      </div>
    </main>
  );
}
