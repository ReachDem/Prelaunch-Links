import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-background/50 backdrop-blur py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-6 md:flex-row md:items-center md:justify-between text-sm">
        <p className="text-muted-foreground">© {new Date().getFullYear()} <span className="font-bold font-mono">Links by ReachDem (rcdm.ink)</span>. Pré‑lancement.</p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/privacy" className="hover:underline">Confidentialité</Link>
          <Link href="/terms" className="hover:underline">Conditions d&apos;utilisation</Link>
          <Link href="/unsubscribe" className="hover:underline">Désinscription</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}