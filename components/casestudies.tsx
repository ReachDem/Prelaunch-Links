import { MoveRight, TrendingUp, Users, Building2 } from "lucide-react";
import React from "react";
import { MarketingChart } from "./charts/MarketingChart";
import { CreatorChart } from "./charts/CreatorChart";
import { EnterpriseChart } from "./charts/EnterpriseChart";

interface CasestudyItem {
  icon: React.ReactNode;
  category: string;
  tags: string;
  title: string;
  subtitle: string;
  chartComponent: React.ReactNode;
  link?: string;
  metrics?: {
    primary: string;
    secondary: string;
  };
}

interface CasestudiesProps {
  featuredCasestudy?: CasestudyItem;
  casestudies?: CasestudyItem[];
}

const defaultFeaturedCasestudy: CasestudyItem = {
  icon: <TrendingUp className="h-8 w-8" />,
  category: "Équipes Marketing",
  tags: "TESTS A/B / OPTIMISATION DES CONVERSIONS",
  title: "Boostez vos taux de conversion avec des tests A/B intelligents.",
  subtitle: "Arrêtez de deviner, commencez à optimiser avec des insights basés sur les données.",
  chartComponent: <MarketingChart />,
  link: "#marketing",
  metrics: {
    primary: "+34% de conversion",
    secondary: "vs liens traditionnels"
  }
};

const defaultCasestudies: CasestudyItem[] = [
  {
    icon: <Users className="h-8 w-8" />,
    category: "Créateurs de Contenu",
    tags: "SUIVI D'ENGAGEMENT / MONÉTISATION",
    title: "Maximisez la portée et les revenus de votre contenu.",
    subtitle: "Transformez chaque lien en opportunité de revenus.",
    chartComponent: <CreatorChart />,
    link: "#creators",
    metrics: {
      primary: "2 847 clics au total",
      secondary: "sur toutes les plateformes"
    }
  },
  {
    icon: <Building2 className="h-8 w-8" />,
    category: "Entreprise",
    tags: "CROISSANCE DU CHIFFRE D'AFFAIRES / INTELLIGENCE D'AFFAIRES",
    title: "Développez votre entreprise avec une gestion intelligente des liens.",
    subtitle: "Analyses de niveau entreprise pour une croissance sérieuse.",
    chartComponent: <EnterpriseChart />,
    link: "#enterprise",
    metrics: {
      primary: "$28k de revenus",
      secondary: "72% de croissance annuelle"
    }
  },
];

const Casestudies = ({
  featuredCasestudy = defaultFeaturedCasestudy,
  casestudies = defaultCasestudies,
}: CasestudiesProps) => {
  return (
    <section className="py-32 px-4 md:px-26">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Transformez Vos Liens, Transformez Votre Business
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez comment notre raccourcisseur de liens intelligent génère des résultats dans différents secteurs et cas d'usage.
          </p>
        </div>

        <div className="border-border border">
          {/* Featured Case Study */}
          <a
            href={featuredCasestudy.link || "#"}
            className="hover:bg-muted/40 group grid gap-4 overflow-hidden px-6 transition-colors duration-500 ease-out lg:grid-cols-2 xl:px-28"
          >
            <div className="flex flex-col justify-between gap-4 pt-8 md:pt-16 lg:pb-16">
              <div className="flex items-center gap-3 text-2xl font-medium">
                <div className="text-primary">{featuredCasestudy.icon}</div>
                {featuredCasestudy.category}
              </div>
              <div>
                <span className="text-muted-foreground text-xs sm:text-sm">
                  {featuredCasestudy.tags}
                </span>
                <h3 className="mb-5 mt-4 text-balance text-2xl font-semibold sm:text-3xl sm:leading-10">
                  {featuredCasestudy.title}
                  <span className="text-primary/50 group-hover:text-primary/70 font-medium transition-colors duration-500 ease-out">
                    {" "}
                    {featuredCasestudy.subtitle}
                  </span>
                </h3>
                {featuredCasestudy.metrics && (
                  <div className="mb-4 p-4 bg-primary/5 rounded-lg border">
                    <div className="text-2xl font-bold text-primary">
                      {featuredCasestudy.metrics.primary}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {featuredCasestudy.metrics.secondary}
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2 font-medium">
                  Explorer la solution
                  <MoveRight className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                </div>
              </div>
            </div>
            <div className="relative isolate py-16">
              <div className="border-border bg-background relative isolate h-full border p-6">
                <div className="h-full overflow-hidden">
                  {featuredCasestudy.chartComponent}
                </div>
              </div>
            </div>
          </a>
          <div className="border-border flex border-t">
            <div className="hidden w-28 shrink-0 bg-[radial-gradient(var(--muted-foreground)_1px,transparent_1px)] opacity-15 [background-size:10px_10px] xl:block"></div>
            <div className="grid lg:grid-cols-2">
              {casestudies.map((item, idx) => (
                <a
                  key={item.category}
                  href={item.link || "#"}
                  className={`border-border bg-background hover:bg-muted/40 group flex flex-col justify-between gap-8 px-6 py-8 transition-colors duration-500 ease-out md:py-16 lg:pb-16 xl:gap-12 ${idx === 0
                      ? "xl:border-l xl:pl-8"
                      : "border-t lg:border-l lg:border-t-0 xl:border-r xl:pl-8"
                    }`}
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 text-xl font-medium">
                      <div className="text-primary">{item.icon}</div>
                      {item.category}
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs sm:text-sm">
                        {item.tags}
                      </span>
                      <h3 className="mb-4 mt-4 text-balance text-xl font-semibold sm:text-2xl sm:leading-8">
                        {item.title}
                        <span className="text-primary/50 group-hover:text-primary/70 font-medium transition-colors duration-500 ease-out">
                          {" "}
                          {item.subtitle}
                        </span>
                      </h3>
                      {item.metrics && (
                        <div className="mb-4 p-3 bg-primary/5 rounded-lg border">
                          <div className="text-lg font-bold text-primary">
                            {item.metrics.primary}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.metrics.secondary}
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-2 font-medium">
                        Explorer la solution
                        <MoveRight className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                  <div className="border-border bg-background relative isolate border p-4 rounded-lg">
                    <div className="overflow-hidden">
                      {item.chartComponent}
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div className="hidden w-28 shrink-0 bg-[radial-gradient(var(--muted-foreground)_1px,transparent_1px)] opacity-15 [background-size:10px_10px] xl:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Casestudies };
