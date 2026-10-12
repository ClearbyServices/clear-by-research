"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export default function CrispChat() {
  useEffect(() => {
    Crisp.configure("b0029a46-1d5c-4d88-9141-a38f679625f1");
  }, []);

  return null;
}