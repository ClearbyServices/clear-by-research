import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { writeFile } from 'fs/promises';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    
    let name, email, phone, service, message, source;
    let fileUrl: string | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      name = formData.get("name") as string;
      email = formData.get("email") as string;
      phone = formData.get("phone") as string;
      service = formData.get("service") as string;
      message = formData.get("message") as string;
      source = formData.get("source") as string;

      const file: File | null = formData.get("file") as unknown as File;

      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = uniqueSuffix + "-" + file.name.replace(/\s+/g, "-");
        
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        const filePath = path.join(uploadDir, filename);

        await writeFile(filePath, buffer);
        fileUrl = `/uploads/${filename}`;
      }
    } else {
      const body = await request.json();
      name = body.name;
      email = body.email;
      phone = body.phone;
      service = body.service;
      message = body.message;
      source = body.source;
    }

    const tableName = source === "Google Ads" ? "google_ads_leads" : "leads";

    const insertPayload = source === "Google Ads" 
      ? { name, email, phone, service, message, source: "Google Ads", priority: "High", status: "Fresh", file_url: fileUrl }
      : { name, email, phone, service, message, file_url: fileUrl };

    const { error: dbError } = await supabase
      .from(tableName)
      .insert([insertPayload]);

    if (dbError) {
      console.error("Supabase Database Error:", dbError);
      return NextResponse.json({ success: false, message: 'Failed to save lead to database' }, { status: 500 });
    }

    const emailSubjectPrefix = source === "Google Ads" ? "🔥 Google Ads Lead" : "New Enquiry";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.clearbyresearch.com';

    const emailResponse = await resend.emails.send({
      from: 'Clearby Research <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'contact@clearbyresearch.com'],
      subject: `${emailSubjectPrefix}: ${service} from ${name}`,
      html: `
        <h2>${emailSubjectPrefix} Received</h2>
        <p><strong>Source:</strong> ${source || 'Website'}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service Requested:</strong> ${service}</p>
        <p><strong>Research Brief:</strong></p>
        <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #2E1A47;">
          ${message}
        </blockquote>
        ${fileUrl ? `<p><strong>Attached File:</strong> <a href="${siteUrl}${fileUrl}" target="_blank">View Uploaded File</a></p>` : ''}
      `,
    });

    console.log("Lead successfully stored and email dispatched:", emailResponse);

    return NextResponse.json({ success: true, message: 'Enquiry processed successfully', fileUrl }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}