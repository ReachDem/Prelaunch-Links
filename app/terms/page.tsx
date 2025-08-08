import type { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Conditions d'utilisation | Links by ReachDem",
  description: "Conditions générales d'accès pré‑lancement de Links by ReachDem (rcdm.ink).",
};

export default function TermsPage() {
  return <TermsClient />;
}
