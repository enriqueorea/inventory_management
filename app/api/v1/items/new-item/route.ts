import { auth } from "@/auth";
import { createItem, createItemImage } from "@/data/items";
import { db } from "@/lib/prisma";
import { NewItemForm } from "@/models/items/new-item";
import { NextResponse } from "next/server";
import mime from "mime";
import { join } from "path";
import { stat, writeFile, mkdir } from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = auth(async function POST(req) {
  if (req.auth) {
    const formData = await req.formData();

    const newItem = {
      stockId: req.auth.user.stock_id as string,
      stock_number: formData.get("stock_number") as string,
      model: formData.get("model") as string,
      serial: formData.get("serial") as string,
      description: formData.get("description") as string,
      brand: formData.get("brand") as string,
      budget_number: formData.get("budget_number") as string,
      price: Number(formData.get("price")),
      remarks: formData.get("remarks") as string,
    };
    console.log(newItem);
    const image = formData.get("image") as File;
    const item = await createItem(newItem);

    if (image && item) {
      console.log(image);
      const buffer = Buffer.from(await image.arrayBuffer());
      const relativeUploadDir = `/images`;
      const uploadDir = join(process.cwd(), "public", relativeUploadDir);
      const filename = `${item.id}.${mime.getExtension(image.type)}`;

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
      { succes: true, message: "Item created successfully", data: null },
      { status: 201 }
    );
  }

  return NextResponse.json(
    { succes: false, message: "Not authenticated", data: null },
    { status: 401 }
  );
});
