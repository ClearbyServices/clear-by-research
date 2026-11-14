"use client";

import { useEffect } from "react";

export default function WebMCPInit() {
  useEffect(() => {
    // @ts-expect-error - WebMCP navigator.modelContext is an emerging standard
    if (typeof navigator !== "undefined" && navigator.modelContext) {
      // @ts-expect-error - registerTool is part of the experimental modelContext API
      navigator.modelContext.registerTool({
        name: "book_phd_consultation",
        description: "Initiates a free consultation booking for a PhD scholar.",
        inputSchema: {
          type: "object",
          properties: {
            service_needed: { 
              type: "string", 
              description: "The research service they need (e.g., Topic Consultation, Data Analysis)" 
            }
          },
          required: ["service_needed"]
        },
        execute: async (args: { service_needed: string }) => {
          window.location.href = `/contact?service=${encodeURIComponent(args.service_needed)}`;
          return { success: true, message: "Redirecting user to contact form." };
        }
      });
    }
  }, []);

  return null;
}