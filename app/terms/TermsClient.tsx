"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function TermsClient() {
  const [activeHeader, setActiveHeader] = useState<string | null>(null);
  const headerRefs = useRef<Record<string, HTMLElement>>({});
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const headers = Object.keys(headerRefs.current);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveHeader(e.target.id);
        });
      },
      { threshold: 1 },
    );
    headers.forEach((id) => {
      const el = headerRefs.current[id];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 1000);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const addHeaderRef = (id: string, el: HTMLElement | null) => {
    if (el) headerRefs.current[id] = el;
  };

  return (
    <section className="py-32">
      <div className="container mx-auto flex flex-col">
        <div className="mt-2 flex flex-col items-center gap-8 text-center md:gap-12">
          <h1 className="max-w-4xl text-pretty text-2xl font-bold tracking-tight md:text-5xl">
            Conditions d'utilisation
          </h1>
          <div className="flex items-center gap-3">
            <Avatar className="border-border border">
              <AvatarImage src="https://github.com/reachdem.png" />
            </Avatar>
            <p className="text-sm tracking-tight md:text-base">
              <span className="font-semibold">ReachDem</span>
              <span className="text-muted-foreground ml-1 font-medium">
                Dernière mise à jour le {new Date().toLocaleDateString("fr-FR")}
              </span>
            </p>
          </div>
        </div>
        <div className="relative mx-auto flex w-full max-w-6xl flex-col-reverse gap-8 px-4 md:px-6 lg:mt-24 lg:grid lg:grid-cols-10">
          <div className="lg:col-span-6">
            <div className="prose prose-h2:scroll-m-10 mt-6 space-y-4">
              <p className="text-sm italic mb-8 text-muted-foreground">
                Document provisoire à faire valider par un conseil juridique avant usage public.
              </p>

              <h2 className="font-bold text-2xl" id="objet" ref={(r) => addHeaderRef("objet", r)}>
                1. Objet
              </h2>
              <p>
                Ces conditions encadrent l'accès anticipé à <strong>Links by ReachDem</strong>, un module en pré‑lancement de la suite ReachDem LTD. Elles pourront être ajustées jusqu'au lancement officiel.
              </p>

              <h2 className="font-bold text-2xl" id="acces" ref={(r) => addHeaderRef("acces", r)}>
                2. Accès au service
              </h2>
              <div className="space-y-3">
                <p>
                  L'accès est actuellement <strong>restreint</strong> (liste d'attente ou invitation) afin de tester progressivement stabilité et expérience.
                </p>
                <p>
                  Aucune garantie de disponibilité continue : des interruptions techniques ou mises à jour rapides peuvent survenir.
                </p>
                <p>
                  Nous pouvons suspendre ou retirer un accès en cas d'abus, risque sécurité manifeste ou non‑respect des présentes règles.
                </p>
              </div>

              <h2 className="font-bold text-2xl" id="fonctionnalites" ref={(r) => addHeaderRef("fonctionnalites", r)}>
                3. Fonctionnalités
              </h2>
              <p>
                Les fonctionnalités sont fournies « en l'état » pour expérimentation et collecte de feedback. Aucune promesse ferme de roadmap; vos retours aident à déterminer les priorités.
              </p>

              <h2 className="font-bold text-2xl" id="compte" ref={(r) => addHeaderRef("compte", r)}>
                4. Compte / Identification
              </h2>
              <p>
                À ce stade seul votre email (newsletter / contact) peut être collecté. Si un espace compte est introduit plus tard, des conditions additionnelles préciseront droits et responsabilités.
              </p>

              <h2 className="font-bold text-2xl" id="engagements" ref={(r) => addHeaderRef("engagements", r)}>
                5. Engagements de l'utilisateur
              </h2>
              <div className="space-y-3">
                <p>Utiliser des informations exactes et ne pas usurper l'identité d'autrui.</p>
                <p>Ne pas contourner les mesures de sécurité ni chercher à dégrader le service.</p>
                <p>Aucune utilisation pour spam, fraude, attaque ou activité illégale.</p>
                <p>Pas d'extraction massive ou scraping sans accord écrit préalable.</p>
              </div>

              <h2 className="font-bold text-2xl" id="pi" ref={(r) => addHeaderRef("pi", r)}>
                6. Propriété intellectuelle
              </h2>
              <p>
                Le code, la marque et les éléments visuels de Links by ReachDem restent la propriété exclusive de ReachDem LTD ou de ses concédants. Aucune cession implicite : vous disposez uniquement d'un droit d'usage limité et révocable.
              </p>

              <h2 className="font-bold text-2xl" id="contenus" ref={(r) => addHeaderRef("contenus", r)}>
                7. Retours et suggestions
              </h2>
              <p>
                Les idées ou retours que vous partagez peuvent être utilisés librement pour améliorer le produit, sans compensation, sauf dispositions légales impératives contraires.
              </p>

              <h2 className="font-bold text-2xl" id="confidentialite" ref={(r) => addHeaderRef("confidentialite", r)}>
                8. Données personnelles
              </h2>
              <p>
                Le traitement de vos données est détaillé dans la <Link href="/privacy" className="underline">Politique de Confidentialité</Link>. En cas de divergence, cette dernière prévaut sur la présente section.
              </p>

              <h2 className="font-bold text-2xl" id="disponibilite" ref={(r) => addHeaderRef("disponibilite", r)}>
                9. Disponibilité & Support
              </h2>
              <p>
                Aucun SLA garanti. Support sur base de meilleur effort via <strong>contact@reachdem.cc</strong> pendant la phase pré‑lancement.
              </p>

              <h2 className="font-bold text-2xl" id="responsabilite" ref={(r) => addHeaderRef("responsabilite", r)}>
                10. Limitation de responsabilité
              </h2>
              <p>
                Dans la limite légale, toute responsabilité est plafonnée au montant payé (actuellement 0 €). Service fourni « en l'état » sans garantie implicite de performance, disponibilité ou adéquation spécifique.
              </p>

              <h2 className="font-bold text-2xl" id="resiliation" ref={(r) => addHeaderRef("resiliation", r)}>
                11. Résiliation
              </h2>
              <p>
                Nous pouvons mettre fin à l'accès test sans préavis en cas de violation majeure, risque sécurité ou obligation légale. Vous pouvez cesser l'usage à tout moment et demander la suppression de vos données personnelles (voir Politique de Confidentialité).
              </p>

              <h2 className="font-bold text-2xl" id="modifications" ref={(r) => addHeaderRef("modifications", r)}>
                12. Modifications
              </h2>
              <p>
                Les présentes peuvent évoluer; la date de révision affichée fait foi. Pour les changements significatifs, une notification email pourra être envoyée si vous êtes inscrit.
              </p>

              <h2 className="font-bold text-2xl" id="droit" ref={(r) => addHeaderRef("droit", r)}>
                13. Droit applicable
              </h2>
              <p>
                Le régime juridique et la juridiction compétente seront précisés avant lancement public (ex : Droit français / tribunaux compétents de Paris) ou selon la localisation principale d'exploitation.
              </p>

              <h2 className="font-bold text-2xl" id="contact" ref={(r) => addHeaderRef("contact", r)}>
                14. Contact
              </h2>
              <p>
                Toute question : <strong>contact@reachdem.cc</strong>
              </p>

              <hr className="my-8" />
              <p className="text-xs text-muted-foreground">
                Version pré‑lancement – Contenu susceptible d'évoluer. À faire valider juridiquement avant usage commercial.
              </p>
            </div>
          </div>
          <div className="top-6 h-fit lg:sticky lg:col-span-3 lg:col-start-8">
            <Separator className="my-10 block lg:hidden" />
            <div className="flex flex-col gap-1.5 text-sm lg:text-xs">
              <p className="text-muted-foreground text-xs">SOMMAIRE</p>
              <ul>
                {[
                  ["objet", "Objet"],
                  ["acces", "Accès"],
                  ["fonctionnalites", "Fonctionnalités"],
                  ["compte", "Compte"],
                  ["engagements", "Engagements"],
                  ["pi", "Propriété intellectuelle"],
                  ["contenus", "Retours"],
                  ["confidentialite", "Données personnelles"],
                  ["disponibilite", "Disponibilité"],
                  ["responsabilite", "Responsabilité"],
                  ["resiliation", "Résiliation"],
                  ["modifications", "Modifications"],
                  ["droit", "Droit applicable"],
                  ["contact", "Contact"],
                ].map(([id, label]) => (
                  <li key={id as string} className="py-1.5 transition-colors duration-200">
                    <a
                      href={`#${id}`}
                      className={cn(
                        "block transition-colors duration-200",
                        activeHeader === id
                          ? "text-muted-foreground lg:text-primary"
                          : "text-muted-foreground hover:text-primary",
                      )}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={cn(
                "hidden opacity-0 transition-opacity duration-200 lg:block",
                showBackToTop && "opacity-100",
              )}
            >
              <Separator className="my-3" />
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-muted-foreground gap-1 text-xs"
              >
                <ArrowUp className="size-3.5" />
                Retour en haut
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
