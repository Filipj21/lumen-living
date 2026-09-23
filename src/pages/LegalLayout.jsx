import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function LegalLayout({ title, updated, children }) {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="noise-overlay" />

      <header className="relative bg-deep text-background rounded-b-5xl overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-56 w-[36rem] rounded-full bg-primary/15 blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-6 sm:px-10 pt-14 pb-20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-primary-light transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Späť na úvod
          </Link>

          <div className="flex items-center gap-2.5 mt-10">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 border border-primary/30">
              <span className="h-3 w-3 rounded-full bg-primary-light" />
            </span>
            <span className="font-display text-xl">Lumen Living</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl mt-6 tracking-tight leading-[1.05] font-light">
            {title}
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mt-5">
            Aktualizované {updated}
          </p>
        </div>
      </header>

      <main className="relative max-w-4xl mx-auto px-6 sm:px-10 py-16 sm:py-24">
        <div className="space-y-10">{children}</div>

        <div className="mt-14 p-6 rounded-3xl bg-primary/5 border border-primary/15">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-dark mb-2">
            Vzorový text
          </p>
          <p className="text-sm text-muted leading-relaxed font-light">
            Tento dokument je pripravená šablóna. Pred spustením webu doplňte skutočné firemné údaje
            a dajte znenie skontrolovať právnikovi.
          </p>
        </div>

        <Link
          to="/"
          className="magnetic-btn mt-10 inline-flex items-center gap-2 bg-primary text-white font-medium px-7 py-3.5 rounded-full"
        >
          <ArrowLeft className="h-4 w-4" />
          Späť na hlavnú stránku
        </Link>
      </main>
    </div>
  )
}

export function Section({ heading, children }) {
  return (
    <section>
      <h2 className="font-display text-2xl sm:text-3xl text-ink tracking-tight mb-4 font-normal">
        {heading}
      </h2>
      <div className="space-y-4 text-muted text-[15px] leading-relaxed font-light">{children}</div>
    </section>
  )
}
