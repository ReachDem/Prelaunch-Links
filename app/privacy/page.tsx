import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Links by ReachDem",
  description:
    "Politique de confidentialité de Links by ReachDem (rcdm.ink) - Raccourcisseur de liens intelligents en pré-lancement.",
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
