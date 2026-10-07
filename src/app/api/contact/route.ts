import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, service, message, source } = data;

    // Determine target table based on source (Google Ads vs Regular Website)
    const tableName = source === "Google Ads" ? "google_ads_leads" : "leads";

    const insertPayload = source === "Google Ads" 
      ? { name, email, phone, service, message, source: "Google Ads", priority: "High", status: "Fresh" }
      : { name, email, phone, service, message };

    // 1. Save lead to the correct Supabase database table
    const { error: dbError } = await supabase
      .from(tableName)
      .insert([insertPayload]);

    if (dbError) {
      console.error("Supabase Database Error:", dbError);
      return NextResponse.json({ success: false, message: 'Failed to save lead to database' }, { status: 500 });
    }

    // 2. Send instant email notification via Resend
    const emailSubjectPrefix = source === "Google Ads" ? "🔥 Google Ads Lead" : "New Enquiry";
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
      `,
    });

    console.log("Lead successfully stored and email dispatched:", emailResponse);

    return NextResponse.json({ success: true, message: 'Enquiry processed successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}