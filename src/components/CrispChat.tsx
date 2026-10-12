"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";
import { usePathname } from "next/navigation";

export default function CrispChat() {
  const pathname = usePathname();

  useEffect(() => {
    Crisp.configure("b0029a46-1d5c-4d88-9141-a38f679625f1");

    // Hide the chat widget box/button when inside LeadDesk
    if (pathname?.startsWith("/leaddesk")) {
      Crisp.chat.hide();
    } else {
      Crisp.chat.show();
    }
  }, [pathname]);

  return null;
}