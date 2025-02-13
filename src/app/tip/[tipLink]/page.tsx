"use client";
declare global {
  interface Window {
    phantom?: any;
  }
}

import { TipView } from "@/components/tip/tip-view";
import { useParams } from "next/navigation";

export default function TipPage() {
  const { tipLink } = useParams();
  return <TipView tipLinkId={tipLink as string} />;
}
