"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
// Breadcrumb removed per design update
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function PrivacyClient() {
	const [activeHeader, setActiveHeader] = useState<string | null>(null);
	const headerRefs = useRef<Record<string, HTMLElement>>({});
	const [showBackToTop, setShowBackToTop] = useState(false);

	useEffect(() => {
		const headers = Object.keys(headerRefs.current);

		const observerCallback = (entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setActiveHeader(entry.target.id);
				}
			});
		};

		let observer: IntersectionObserver | null = new IntersectionObserver(
			observerCallback,
			{
				root: null,
				rootMargin: "0px",
				threshold: 1,
			},
		);

		headers.forEach((headerId) => {
			const element = headerRefs.current[headerId];
			if (element) {
				observer?.observe(element);
			}
		});

		return () => {
			observer?.disconnect();
			observer = null;
		};
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 1000) {
				setShowBackToTop(true);
			} else {
				setShowBackToTop(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const addHeaderRef = (id: string, ref: HTMLElement | null) => {
		if (ref) {
			headerRefs.current[id] = ref;
		}
	};

	return (
		<section className="py-32">
			<div className="container mx-auto flex flex-col">
				<div className="mt-2 flex flex-col items-center gap-8 text-center md:gap-12">
					<h1 className="max-w-4xl text-pretty text-4xl font-bold tracking-tight md:text-5xl">
						Politique de Confidentialité
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
								Ce document est fourni à titre informatif. Une version définitive validée par un conseil juridique sera publiée avant le lancement officiel.
							</p>

							<h2 className="font-black text-4xl" id="qui-sommes-nous" ref={(ref) => addHeaderRef("qui-sommes-nous", ref)}>
								1. Qui sommes-nous ?
							</h2>
							<p>
								<strong>Links by ReachDem</strong> (rcdm.ink) est un produit en pré‑lancement imaginé et développé par <strong>ReachDem LTD</strong>,
								l'équipe derrière une plateforme de messagerie moderne pensée pour aider les entreprises à créer des interactions plus humaines,
								mesurer l'engagement et faire grandir leurs audiences sans complexité inutile. Cette version préliminaire se concentre sur un
								raccourcisseur de liens intelligent et respectueux de la vie privée qui deviendra un module clé de notre écosystème.
							</p>
							<p>
								Nous opérons depuis <strong>Douala (Cameroun)</strong> et restons accessibles directement à l'adresse
								<strong> contact@reachdem.cc</strong>. L'objectif de cette phase est de valider l'expérience, recueillir vos retours et préparer un lancement
								public plus large — tout en appliquant dès maintenant des standards élevés de transparence et de protection des données.
							</p>
							<p>
								En bref : une petite équipe, un produit encore discret, mais une ambition claire — bâtir des outils fiables et élégants pour créer
								des relations pertinentes entre marques et audiences.
							</p>

							<h2 className="font-black text-4xl" id="donnees-collectees" ref={(ref) => addHeaderRef("donnees-collectees", ref)}>
								2. Données que nous collectons
							</h2>
							<p>Dans le cadre du pré-lancement de Links by ReachDem, nous collectons les données suivantes :</p>
							<div className="space-y-3">
								<p>
									Nous collectons votre <strong>adresse email</strong> lorsque vous vous inscrivez à la newsletter ou à la liste d'attente. C'est le cœur de notre communication avec vous.
								</p>
								<p>
									Vous pouvez aussi partager votre <strong>nom (optionnel)</strong> via le formulaire de contact : il nous aide simplement à personnaliser nos réponses, rien d'obligatoire.
								</p>
								<p>
									Les <strong>messages de contact</strong> que vous nous envoyez sont conservés le temps de vous répondre et d'améliorer le service.
								</p>
								<p>
									Nous enregistrons quelques <strong>données techniques minimales</strong> (adresse IP anonymisée, user‑agent dans les journaux serveur) uniquement pour assurer la sécurité et prévenir les abus.
								</p>
								<p>
									Nous gardons aussi trace de votre <strong>statut d'abonnement</strong> (inscrit / désinscrit) et, lorsque vous les exprimez, de vos <strong>préférences de communication</strong> afin de ne vous envoyer que ce qui compte pour vous.
								</p>
							</div>

							<h2 className="font-black text-4xl" id="finalites" ref={(ref) => addHeaderRef("finalites", ref)}>
								3. Finalités du traitement
							</h2>
							<div className="space-y-3">
								<p>
									Vos données servent d'abord à <strong>gérer la liste d'attente</strong> et vous tenir informé(e) de l'évolution de Links by ReachDem.
								</p>
								<p>
									Elles nous permettent aussi de <strong>répondre à vos messages</strong> et d'offrir un support humain, simple et direct.
								</p>
								<p>
									Nous les utilisons pour <strong>améliorer le service</strong> avant son lancement officiel, en tenant compte de vos retours et suggestions.
								</p>
								<p>
									Une petite partie technique est exploitée pour <strong>assurer la sécurité</strong> (prévenir les abus, spam ou intrusions) et respecter nos obligations légales.
								</p>
							</div>

							<h2 className="font-black text-4xl" id="base-legale" ref={(ref) => addHeaderRef("base-legale", ref)}>
								4. Base légale (RGPD)
							</h2>
							<div className="space-y-3">
								<p>
									Le <strong>consentement</strong> est la base lorsque vous vous inscrivez volontairement à la newsletter ou à la liste d'attente.
								</p>
								<p>
									Notre <strong>intérêt légitime</strong> couvre la sécurité du service, son amélioration continue et les communications essentielles liées au projet.
								</p>
								<p>
									L'<strong>exécution de mesures précontractuelles</strong> s'applique quand vous nous contactez pour en savoir plus avant d'utiliser le produit.
								</p>
								<p>
									Enfin, une <strong>obligation légale</strong> peut nous amener à conserver certains journaux techniques pour une durée limitée.
								</p>
							</div>

							<h2 className="font-black text-4xl" id="conservation" ref={(ref) => addHeaderRef("conservation", ref)}>
								5. Durées de conservation
							</h2>
							<div className="space-y-3">
								<p>
									Les <strong>emails d'inscription</strong> sont conservés jusqu'à votre désinscription ou après 24 mois d'inactivité pour éviter les listes dormantes.
								</p>
								<p>
									Les <strong>messages de contact</strong> sont archivés jusqu'à 12 mois après leur résolution, uniquement pour le suivi et la qualité.
								</p>
								<p>
									Les <strong>journaux techniques</strong> (logs) ne vivent pas plus de 90 jours, sauf incident particulier nécessitant une analyse plus longue.
								</p>
								<p>
									Les <strong>données spécifiques au pré‑lancement</strong> sont automatiquement purgées dans les 6 mois suivant le lancement officiel, sauf si vous vous êtes désinscrit(e) avant.
								</p>
							</div>

							<h2 className="font-black text-4xl" id="destinataires" ref={(ref) => addHeaderRef("destinataires", ref)}>
								6. Destinataires et sous-traitants
							</h2>
							<p>
								Nous utilisons des services tiers sélectionnés pour leur conformité RGPD :
							</p>
							<div className="space-y-3">
								<p>
									Pour l'<strong>hébergement</strong>, nous utilisons Vercel. Lorsque des transferts hors UE existent, ils sont encadrés par des mécanismes comme les clauses contractuelles types.
								</p>
								<p>
									L'<strong>envoi d'emails transactionnels</strong> reposera sur un fournisseur encore en sélection, avec une priorité donnée aux solutions privacy‑first.
								</p>
								<p>
									Côté <strong>mesure d'audience</strong>, seules des solutions respectueuses de la vie privée pourront être envisagées, sans profilage invasif.
								</p>
							</div>

							<h2 className="font-black text-4xl" id="droits" ref={(ref) => addHeaderRef("droits", ref)}>
								7. Vos droits
							</h2>
							<p>Conformément au RGPD, vous disposez des droits suivants :</p>
							<div className="space-y-3">
								<p>
									Vous pouvez exercer votre <strong>droit d'accès</strong> pour savoir précisément quelles données nous détenons à votre sujet.
								</p>
								<p>
									Le <strong>droit de rectification</strong> vous permet de corriger des informations inexactes ou incomplètes.
								</p>
								<p>
									Avec le <strong>droit d'effacement</strong> (ou droit à l'oubli), vous pouvez demander la suppression de vos données lorsqu'elles ne sont plus nécessaires.
								</p>
								<p>
									Le <strong>droit de limitation</strong> vous autorise à restreindre temporairement certains traitements.
								</p>
								<p>
									Le <strong>droit d'opposition</strong> s'applique notamment aux communications que vous ne souhaitez plus recevoir.
								</p>
								<p>
									Le <strong>droit à la portabilité</strong> vous offre la possibilité de recevoir vos données dans un format structuré.
								</p>
								<p>
									Enfin, vous pouvez retirer votre <strong>consentement</strong> à tout moment pour les traitements qui y reposent.
								</p>
							</div>
							<p>
								Pour exercer vos droits : <strong>contact@reachdem.cc</strong><br />
								Réponse sous 30 jours. Désinscription rapide via les liens dans nos emails ou la page <Link href="/unsubscribe" className="underline">Désinscription</Link>.
							</p>

							<h2 className="font-black text-4xl" id="securite" ref={(ref) => addHeaderRef("securite", ref)}>
								8. Sécurité
							</h2>
							<p>
								Mesures de protection mises en place :
							</p>
							<div className="space-y-3">
								<p>
									Toutes les communications transitent via un <strong>chiffrement HTTPS</strong> moderne.
								</p>
								<p>
									L'<strong>accès aux données</strong> est minimisé et réservé aux seules personnes ayant un besoin opérationnel clair.
								</p>
								<p>
									Des <strong>journaux de sécurité</strong> et une surveillance basique des accès nous aident à détecter d'éventuelles anomalies.
								</p>
								<p>
									Nous effectuons des <strong>sauvegardes sécurisées</strong> pour éviter la perte accidentelle d'information.
								</p>
								<p>
									En cas d'incident pertinent, une <strong>notification conforme au RGPD</strong> serait déclenchée.
								</p>
							</div>

							<h2 className="font-black text-4xl" id="cookies" ref={(ref) => addHeaderRef("cookies", ref)}>
								9. Cookies et suivi
							</h2>
							<p>
								En phase de pré-lancement, Links by ReachDem n'utilise <strong>aucun cookie publicitaire ou de suivi</strong>.
								Seuls les cookies techniques essentiels au fonctionnement du site sont présents.
							</p>
							<p>
								Si des outils d'analytics sont ajoutés avant le lancement, ils seront respectueux de la vie privée
								et vous en serez informés avec possibilité de refus.
							</p>

							<h2 className="font-black text-4xl" id="contact" ref={(ref) => addHeaderRef("contact", ref)}>
								10. Contact et réclamations
							</h2>
							<p>
								<strong>Questions sur cette politique :</strong> contact@reachdem.cc<br />
								<strong>Réclamations :</strong> Vous pouvez également saisir la CNIL ou l'autorité de protection des données de votre pays.
							</p>

							<hr className="my-8" />
							<p className="text-xs text-muted-foreground">
								Links by ReachDem est un service de ReachDem en cours de développement.
								Cette politique sera mise à jour avant le lancement officiel du service.
							</p>
						</div>
					</div>

					<div className="top-6 h-fit lg:sticky lg:col-span-3 lg:col-start-8">
						<Separator className="my-10 block lg:hidden" />
						<div className="flex flex-col gap-1.5 text-sm lg:text-xs">
							<p className="text-muted-foreground text-xs">SOMMAIRE</p>
							<ul>
								<li className="py-1.5 transition-colors duration-200">
									<a
										href="#qui-sommes-nous"
										className={cn(
											"block transition-colors duration-200",
											activeHeader === "qui-sommes-nous"
												? "text-muted-foreground lg:text-primary"
												: "text-muted-foreground hover:text-primary",
										)}
									>
										Qui sommes-nous ?
									</a>
								</li>
								<li className="py-1.5 transition-colors duration-200">
									<a
										href="#donnees-collectees"
										className={cn(
											"block transition-colors duration-200",
											activeHeader === "donnees-collectees"
												? "text-muted-foreground lg:text-primary"
												: "text-muted-foreground hover:text-primary",
										)}
									>
										Données collectées
									</a>
								</li>
								<li className="py-1.5 transition-colors duration-200">
									<a
										href="#finalites"
										className={cn(
											"block transition-colors duration-200",
											activeHeader === "finalites"
												? "text-muted-foreground lg:text-primary"
												: "text-muted-foreground hover:text-primary",
										)}
									>
										Finalités du traitement
									</a>
								</li>
								<li className="py-1.5 transition-colors duration-200">
									<a
										href="#base-legale"
										className={cn(
											"block transition-colors duration-200",
											activeHeader === "base-legale"
												? "text-muted-foreground lg:text-primary"
												: "text-muted-foreground hover:text-primary",
										)}
									>
										Base légale
									</a>
								</li>
								<li className="py-1.5 transition-colors duration-200">
									<a
										href="#conservation"
										className={cn(
											"block transition-colors duration-200",
											activeHeader === "conservation"
												? "text-muted-foreground lg:text-primary"
												: "text-muted-foreground hover:text-primary",
										)}
									>
										Durées de conservation
									</a>
								</li>
								<li className="py-1.5 transition-colors duration-200">
									<a
										href="#destinataires"
										className={cn(
											"block transition-colors duration-200",
											activeHeader === "destinataires"
												? "text-muted-foreground lg:text-primary"
												: "text-muted-foreground hover:text-primary",
										)}
									>
										Destinataires
									</a>
								</li>
								<li className="py-1.5 transition-colors duration-200">
									<a
										href="#droits"
										className={cn(
											"block transition-colors duration-200",
											activeHeader === "droits"
												? "text-muted-foreground lg:text-primary"
												: "text-muted-foreground hover:text-primary",
										)}
									>
										Vos droits
									</a>
								</li>
								<li className="py-1.5 transition-colors duration-200">
									<a
										href="#securite"
										className={cn(
											"block transition-colors duration-200",
											activeHeader === "securite"
												? "text-muted-foreground lg:text-primary"
												: "text-muted-foreground hover:text-primary",
										)}
									>
										Sécurité
									</a>
								</li>
								<li className="py-1.5 transition-colors duration-200">
									<a
										href="#cookies"
										className={cn(
											"block transition-colors duration-200",
											activeHeader === "cookies"
												? "text-muted-foreground lg:text-primary"
												: "text-muted-foreground hover:text-primary",
										)}
									>
										Cookies et suivi
									</a>
								</li>
								<li className="py-1.5 transition-colors duration-200">
									<a
										href="#contact"
										className={cn(
											"block transition-colors durée-200",
											activeHeader === "contact"
												? "text-muted-foreground lg:text-primary"
												: "text-muted-foreground hover:text-primary",
										)}
									>
										Contact
									</a>
								</li>
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
