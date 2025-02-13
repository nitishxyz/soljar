"use client";
declare global {
  interface Window {
    phantom?: any;
  }
}

import { TipView } from "@/components/tip/tip-view";
import { TipFooter } from "@/components/tip/tip-footer";
import { useParams } from "next/navigation";

export default function TipPage() {
  const { tipLink } = useParams();
  return (
    <>
      <TipView tipLinkId={tipLink as string} />
      <TipFooter />
    </>
  );
}
