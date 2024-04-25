import { auth } from "@/auth";
import { createItem, createItemImage } from "@/data/items";
import { db } from "@/lib/prisma";
import { NewItemForm } from "@/models/items/new-item";
import { NextResponse } from "next/server";
import mime from "mime";
import { join } from "path";
import { stat, writeFile, mkdir } from "fs/promises";

export const POST = auth(async function POST(req) {
  if (req.auth) {
    const data: NewItemForm = await req.json();

    const item = await createItem(data);

    if (data.image && item) {
      console.log(data.image);
      const buffer = Buffer.from(await data.image.arrayBuffer());
      const relativeUploadDir = `/images`;
      const uploadDir = join(process.cwd(), "public", relativeUploadDir);
      const filename = `${item.id}.${mime.getExtension(data.image.type)}`;

      try {
        await stat(uploadDir);
      } catch (error) {
        await mkdir(uploadDir, { recursive: true });
      }

      await writeFile(join(uploadDir, filename), buffer);

      const fileUrl = `${relativeUploadDir}/${filename}`;

      await createItemImage(item.id, fileUrl);
    }

    return NextResponse.json(
      { succes: true, message: "Item created successfully", data: item },
      { status: 201 }
    );
  }

  return NextResponse.json(
    { succes: false, message: "Not authenticated", data: null },
    { status: 401 }
  );
});
