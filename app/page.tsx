import { auth } from "@/auth";
import { Card, CardHeader } from "@nextui-org/react";

export default async function Home() {
  const session = await auth();

  console.log(session?.user);
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
