"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";


const NAV_ITEMS = [
  { name: "Accueil", link: "/" },
  { name: "Etudes de cas", link: "/casestudies" },
  { name: "Contact", link: "/contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  // Determine active nav item based on current pathname
  const activeItem: string | null = React.useMemo(() => {
    const matches = NAV_ITEMS.filter((item) => {
      if (item.link === "/") return pathname === "/"; // Accueil uniquement sur la racine exacte
      return pathname === item.link || pathname.startsWith(item.link + "/"); // match strict segment ou sous-route
    });
    if (matches.length === 0) return null;
    // choisir le plus spécifique (lien le plus long)
    return matches.sort((a, b) => b.link.length - a.link.length)[0].name;
  }, [pathname]);

  const indicatorRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = document.querySelector(
        `[data-nav-item="${activeItem}"]`,
      ) as HTMLElement;

      if (activeEl && indicatorRef.current && menuRef.current) {
        const menuRect = menuRef.current.getBoundingClientRect();
        const itemRect = activeEl.getBoundingClientRect();

        indicatorRef.current.style.width = `${itemRect.width}px`;
        indicatorRef.current.style.left = `${itemRect.left - menuRect.left}px`;
      } else if (indicatorRef.current) {
        // Masquer l'indicateur si aucune page active
        indicatorRef.current.style.width = `0px`;
        indicatorRef.current.style.left = `0px`;
      }
    };
    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeItem, pathname]);

  return (
    <section className="fixed top-4 w-full px-4 md:px-26 z-21">
      <nav className="container mx-auto flex items-center justify-center">
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList
            ref={menuRef}
            className="backdrop-blur rounded-4xl flex items-center gap-6 px-8 py-3"
          >
            {NAV_ITEMS.map((item) => (
              <React.Fragment key={item.name}>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    data-nav-item={item.name}
                    className={`relative cursor-pointer text-sm font-medium hover:bg-transparent ${
                      activeItem === item.name
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                    asChild
                  >
                    <Link href={item.link}>
                      {item.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </React.Fragment>
            ))}
            {/* Feedback Dialog (desktop) */}
            <NavigationMenuItem>
              <FeedbackDialog />
            </NavigationMenuItem>
            {/* Active Indicator */}
            <div
              ref={indicatorRef}
              className="absolute bottom-2 flex h-1 items-center justify-center px-2 transition-all duration-300"
            >
              <div className={`bg-foreground h-0.5 w-full rounded-t-none transition-all duration-300 ${!activeItem ? 'opacity-0' : 'opacity-100'}`} />
            </div>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu Popover */}
  <MobileNav activeItem={activeItem} />
      </nav>
    </section>
  );
};

export { Navbar };

const AnimatedHamburger = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="group relative size-full">
      <div className="absolute flex size-full items-center justify-center">
        <Menu
          className={`text-muted-foreground group-hover:text-foreground absolute size-6 transition-all duration-300 ${
            isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
          }`}
        />
        <X
          className={`text-muted-foreground group-hover:text-foreground absolute size-6 transition-all duration-300 ${
            isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
          }`}
        />
      </div>
    </div>
  );
};

const MobileNav = ({ activeItem }: { activeItem: string | null }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" flex h-full items-center lg:hidden">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon">
            <AnimatedHamburger isOpen={isOpen} />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="relative -right-4 top-4 block w-[calc(100vw-32px)] overflow-hidden rounded-xl p-0 sm:right-auto sm:top-auto sm:w-80 lg:hidden"
        >
          <ul className="bg-background text-foreground w-full py-4">
            {NAV_ITEMS.map((navItem, idx) => (
              <li key={idx}>
                <Link
                  href={navItem.link}
                  className={`text-foreground flex items-center border-l-[3px] px-6 py-4 text-sm font-medium transition-all duration-75 ${
                    activeItem === navItem.name
                      ? "border-foreground text-foreground"
                      : "text-muted-foreground hover:text-foreground border-transparent"
                  }`}
                >
                  {navItem.name}
                </Link>
              </li>
            ))}
            <li className="px-6 pt-2">
              <FeedbackDialog mobile />
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};

/* Feedback dialog component reused on desktop & mobile */
import { useFormStatus } from "react-dom";
import { submitFeedback } from "@/app/actions/feedback";

const FeedbackDialog = ({ mobile = false }: { mobile?: boolean }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={mobile ? "outline" : "outline"}
          size={mobile ? "sm" : "sm"}
          className={mobile ? "w-full" : ""}
        >
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Partagez votre expérience</DialogTitle>
          <DialogDescription className="space-y-2 text-left">
            <p>
              Aidez-nous à améliorer la plateforme en partageant des détails sur :
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Vos attentes</strong> (ce que vous aimeriez voir ou faire)</li>
              <li><strong>Votre point de vue</strong> (avis général, suggestions, priorités)</li>
            </ul>
            <p className="text-muted-foreground text-xs">
              Plus vous êtes précis, plus nous pouvons prioriser efficacement.
            </p>
          </DialogDescription>
        </DialogHeader>
  <form action={async (fd) => { await submitFeedback(fd); }} className="space-y-4">
          <Textarea
            id="feedback"
            name="message"
            required
            placeholder="Ex: J'utilise actuellement..., je m'attendais à..., ce qui me manque..., ce que vous pourriez ajouter..."
            aria-label="Envoyer un feedback"
            className="min-h-40"
          />
          <div className="flex gap-2">
            <input
              type="email"
              name="email"
              required
              placeholder="Votre email (pour réponse)"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
            <input
              type="text"
              name="name"
              placeholder="Nom (optionnel)"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="flex justify-end">
            <SubmitButton />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="sm" disabled={pending}>
      {pending ? "Envoi..." : "Envoyer"}
    </Button>
  );
};
