import { auth } from "@/auth";
import { NewProfileForm } from "@/components/Profile/NewProfile";
import { db } from "@/lib/prisma";
import { User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
): Promise<Response> {
  return auth(async (authreq: any & { auth?: { user?: User } }) => {
    // check user
    if (!authreq?.auth?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        {
          status: 401,
          statusText: "You must be logged in to perform this action",
        }
      );
    }
    const id = context?.params?.id;

    if (!id) {
      return NextResponse.json(
        { succes: false, message: "ID not provided", data: null },
        { status: 400 }
      );
    }

    const data: NewProfileForm = await req.json();

    const profile = await db.profile.update({
      where: { id },
      data: {
        ...data,
      },
    });

    return NextResponse.json(
      {
        succes: true,
        message: "Perfil actualizado correctamente",
        data: profile,
      },
      { status: 200 }
    );
  })(req, context) as Promise<Response>;
}
