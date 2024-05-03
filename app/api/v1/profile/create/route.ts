import { auth } from "@/auth";
import { NewProfileForm } from "@/components/Profile/NewProfile";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = auth(async function POST(req) {
  if (req.auth) {
    const data: NewProfileForm = await req.json();

    const profile = await db.profile.create({
      data: {
        ...data,
        user: {
          connect: {
            id: req.auth.user.id,
          },
        },
      },
    });

    //stock id creation
    await db.inventory.create({
      data: {
        user: {
          connect: {
            id: req.auth.user.id,
          },
        },
      },
    });

    return NextResponse.json(
      { succes: true, message: "Perfil creado correctamente", data: profile },
      { status: 201 }
    );
  }

  return NextResponse.json(
    { succes: false, message: "Not authenticated", data: null },
    { status: 401 }
  );
});
