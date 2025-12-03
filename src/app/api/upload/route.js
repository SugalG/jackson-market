import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name}`;
  const filepath = path.join(process.cwd(), "public", "uploads", filename);

  await writeFile(filepath, buffer);

  return NextResponse.json({
    url: `/uploads/${filename}`,
  });
}
