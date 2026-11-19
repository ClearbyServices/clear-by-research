import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Sanitize filename (removes spaces and special characters like '&')
    const ext = file.name.split(".").pop() || "png";
    const baseName = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .toLowerCase();
    const fileName = `${Date.now()}-${baseName}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage
      .from("blog-images")
      .getPublicUrl(fileName);

    return NextResponse.json({
      url: publicUrlData.publicUrl,
      success: true,
    });
  } catch (err) {
    console.error("Upload API error:", err);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}