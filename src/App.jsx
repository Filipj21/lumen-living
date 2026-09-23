import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Sunrise,
  Utensils,
  Film,
  Moon,
  Lightbulb,
  Blinds,
  ThermometerSun,
  AudioLines,
  ScanFace,
  SlidersHorizontal,
  ShieldCheck,
  DraftingCompass,
  Headset,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Upload,
  Menu,
  X,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ================================================================
   Obsah
================================================================ */
const NAV_LINKS = [
  { label: 'Scény', href: '#sceny' },
  { label: 'Čo riadime', href: '#systemy' },
  { label: 'Rezidencie', href: '#rezidencie' },
  { label: 'Spolupráca', href: '#proces' },
  { label: 'Kontakt', href: '#kontakt' },
]

const TEL_DISPLAY = '+421 918 402 660'
const TEL_HREF = 'tel:+421918402660'
const EMAIL = 'studio@lumenliving.sk'

const SCENES = [
  {
    id: 'rano',
    label: 'Ráno',
    time: '06:40',
    Icon: Sunrise,
    title: 'Dom sa budí',
    flourish: 'skôr ako vy.',
    text: 'Svetlo v spálni rastie dvadsať minút od piatich percent. Žalúzie idú hore až keď vstanete, kúpeľňa má 23 stupňov a v kuchyni hrajú ranné správy.',
    image:
      'https://images.unsplash.com/photo-1704040686428-7534b262d0d8?auto=format&fit=crop&w=2400&q=80',
    alt: 'Presvetlená obývacia izba s podhľadovým osvetlením',
    overlay: 'bg-gradient-to-t from-deep/85 via-deep/30 to-deep/45',
    light: {
      kelvin: 4000,
      blind: 0.15,
      daylight: 0.5,
      fixtures: { podhlad: 0.35, zaves: 0.2, police: 0.3, orient: 0 },
    },
    status: 'Nábeh svetla · 20 minút',
    readouts: [
      { k: 'Svetlá', v: 35, unit: '%', d: 0 },
      { k: 'Teplota svetla', v: 4000, unit: 'K', d: 0 },
      { k: 'Tienenie', v: 85, unit: '% hore', d: 0 },
      { k: 'Interiér', v: 22.5, unit: '°C', d: 1 },
    ],
    rows: [
      {
        Icon: Lightbulb,
        k: 'Svetlá',
        v: 'Spálňa 35 %, kúpeľňa 60 %',
        note: 'chladnejšie 4 000 K, aby telo pochopilo, že je ráno',
      },
      {
        Icon: Blinds,
        k: 'Tienenie',
        v: 'Žalúzie hore o 06:55',
        note: 'v spálni až po prvom pohybe, nie podľa hodín',
      },
      {
        Icon: ThermometerSun,
        k: 'Klíma',
        v: 'Kúpeľňa 23 °C',
        note: 'podlahové kúrenie nabieha už o 05:40',
      },
      {
        Icon: AudioLines,
        k: 'Audio',
        v: 'Správy v kuchyni',
        note: 'hlasitosť 22 %, hudba sa presúva za vami',
      },
    ],
  },
  {
    id: 'vecera',
    label: 'Večera',
    time: '19:30',
    Icon: Utensils,
    title: 'Svetlo sadá',
    flourish: 'nad stôl.',
    text: 'Nad jedálenským stolom zostane teplý kruh svetla, zvyšok domu klesne na štvrtinu. Žalúzie sa zatiahnu skôr, než sa v oknách začnete zrkadliť.',
    image:
      'https://images.unsplash.com/photo-1763616828225-95befdfddc0c?auto=format&fit=crop&w=2400&q=80',
    alt: 'Večerný interiér s kreslom a rozsvietenou stojanovou lampou',
    overlay: 'bg-gradient-to-t from-deep/90 via-deep/45 to-deep/55',
    light: {
      kelvin: 2700,
      blind: 1,
      daylight: 0.08,
      fixtures: { podhlad: 0.12, zaves: 0.45, police: 0.3, orient: 0 },
    },
    status: 'Večerná scéna · 2 700 K',
    readouts: [
      { k: 'Svetlá', v: 24, unit: '%', d: 0 },
      { k: 'Teplota svetla', v: 2700, unit: 'K', d: 0 },
      { k: 'Tienenie', v: 100, unit: '% dole', d: 0 },
      { k: 'Interiér', v: 21.5, unit: '°C', d: 1 },
    ],
    rows: [
      {
        Icon: Lightbulb,
        k: 'Svetlá',
        v: 'Nad stolom 45 %, okolo 12 %',
        note: 'teplá 2 700 K, žiadne stropné svetlo do očí',
      },
      {
        Icon: Blinds,
        k: 'Tienenie',
        v: 'Zatiahnuté po západe slnka',
        note: 'podľa kalendára, nie podľa fixného času',
      },
      {
        Icon: ThermometerSun,
        k: 'Klíma',
        v: 'Obývačka 21,5 °C',
        note: 'rekuperácia tichšie, kým ste pri stole',
      },
      {
        Icon: AudioLines,
        k: 'Audio',
        v: 'Jazz v jedálni',
        note: 'hlasitosť 18 %, aby ste sa počuli',
      },
    ],
  },
  {
    id: 'kino',
    label: 'Kino',
    time: '21:15',
    Icon: Film,
    title: 'Miestnosť sa',
    flourish: 'stiahne do tmy.',
    text: 'Jedným dotykom zhasnú svetlá okrem schodíkového pásu, tienenie ide dole a projektor sa prebúdza. Klíma prepne do tichého režimu.',
    image:
      'https://images.unsplash.com/photo-1663811397219-c572550dffc5?auto=format&fit=crop&w=2400&q=80',
    alt: 'Tmavá obývacia stena s televízorom a nasvietenou policou',
    overlay: 'bg-gradient-to-t from-deep/92 via-deep/60 to-deep/70',
    light: {
      kelvin: 2200,
      blind: 1,
      daylight: 0,
      fixtures: { podhlad: 0, zaves: 0, police: 0.06, orient: 0.08 },
    },
    status: 'Projekcia · tichý režim',
    readouts: [
      { k: 'Svetlá', v: 8, unit: '%', d: 0 },
      { k: 'Teplota svetla', v: 2200, unit: 'K', d: 0 },
      { k: 'Tienenie', v: 100, unit: '% dole', d: 0 },
      { k: 'Interiér', v: 21, unit: '°C', d: 0 },
    ],
    rows: [
      {
        Icon: Lightbulb,
        k: 'Svetlá',
        v: 'Len schodíkový pás 8 %',
        note: 'aby ste trafili do kuchyne a nikoho neoslepili',
      },
      {
        Icon: Blinds,
        k: 'Tienenie',
        v: 'Zatemnenie 100 %',
        note: 'rolety s bočným vedením, žiadne svetlo po okraji',
      },
      {
        Icon: ThermometerSun,
        k: 'Klíma',
        v: 'Tichý režim',
        note: 'ventilátory spomalia, aby nebolo počuť rekuperáciu',
      },
      {
        Icon: AudioLines,
        k: 'Audio',
        v: 'Domáce kino 5.1',
        note: 'zvyšok domu stíchne, hudba sa pozastaví',
      },
    ],
  },
  {
    id: 'noc',
    label: 'Noc',
    time: '23:50',
    Icon: Moon,
    title: 'Dom stráži,',
    flourish: 'kým spíte.',
    text: 'Všetko zhasne okrem orientačného svetla pri podlahe. Alarm sa zapne v obvode, kúrenie klesne o dva stupne a dvere sa samy zamknú.',
    image:
      'https://images.unsplash.com/photo-1779925587823-e8dd049da61d?auto=format&fit=crop&w=2400&q=80',
    alt: 'Tlmene osvetlená spálňa v noci',
    overlay: 'bg-gradient-to-t from-deep/92 via-deep/55 to-deep/65',
    light: {
      kelvin: 1800,
      blind: 1,
      daylight: 0,
      fixtures: { podhlad: 0, zaves: 0, police: 0, orient: 0.05 },
    },
    status: 'Nočný režim · alarm v obvode',
    readouts: [
      { k: 'Svetlá', v: 5, unit: '%', d: 0 },
      { k: 'Teplota svetla', v: 1800, unit: 'K', d: 0 },
      { k: 'Tienenie', v: 100, unit: '% dole', d: 0 },
      { k: 'Interiér', v: 19.5, unit: '°C', d: 1 },
    ],
    rows: [
      {
        Icon: Lightbulb,
        k: 'Svetlá',
        v: 'Orientačné 5 % pri podlahe',
        note: 'rozsvieti sa len pod nohami, keď vstanete',
      },
      {
        Icon: ScanFace,
        k: 'Bezpečnosť',
        v: 'Alarm v obvode, dvere zamknuté',
        note: 'pohyb vnútri domu alarm nespustí',
      },
      {
        Icon: ThermometerSun,
        k: 'Klíma',
        v: 'Útlm na 19,5 °C',
        note: 'ráno začne kúriť tak, aby ste to nepostrehli',
      },
      {
        Icon: AudioLines,
        k: 'Audio',
        v: 'Ticho',
        note: 'systém sa prepne do nočného, nerušivého režimu',
      },
    ],
  },
]

const SYSTEMS = [
  {
    icon: Lightbulb,
    title: 'Osvetlenie a scény',
    text: 'Svetelný návrh miestnosť po miestnosti, stmievanie bez blikania a scény, ktoré menia náladu jedným dotykom.',
  },
  {
    icon: Blinds,
    title: 'Tienenie a fasáda',
    text: 'Žalúzie, rolety a markízy reagujú na slnko, vietor aj na to, či ste doma. V lete nepustia teplo dnu.',
  },
  {
    icon: ThermometerSun,
    title: 'Klíma a kúrenie',
    text: 'Podlahové kúrenie, klimatizácia a rekuperácia v jednej logike. Každá miestnosť má vlastný režim.',
  },
  {
    icon: AudioLines,
    title: 'Multiroom audio a kino',
    text: 'Skryté reproduktory, hudba, ktorá vás nasleduje medzi miestnosťami, a domáce kino s vlastnou scénou.',
  },
  {
    icon: ScanFace,
    title: 'Bezpečnosť a prístup',
    text: 'Kamery, alarm, video vrátnik a vstup bez kľúčov. Počas dovolenky dom simuluje prítomnosť.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Správa a servis',
    text: 'Diaľková správa, aktualizácie a úpravy scén podľa toho, ako sa mení váš život — bez výjazdu k vám.',
  },
]

const RESIDENCES = [
  {
    tag: 'Vila · Záhorská Bystrica',
    title: 'Dom, kde vypínače takmer neexistujú',
    text: 'Dvestoosemdesiat metrov štvorcových, osemdesiatštyri svetelných okruhov a šesť scén. Klient používa jediný ovládač pri dverách — o zvyšok sa stará logika.',
    image:
      'https://images.unsplash.com/photo-1772112334845-86016056137b?auto=format&fit=crop&w=1400&q=80',
    alt: 'Minimalistická obývacia izba so svetelnými líniami',
    stats: [
      { k: 'Plocha', v: '280 m²' },
      { k: 'Okruhy', v: '84' },
      { k: 'Scény', v: '6' },
    ],
  },
  {
    tag: 'Byt · Staré Mesto',
    title: 'Rekonštrukcia bez sekania do hotových stien',
    text: 'Pôvodný byt v meštianskom dome. Zbernicu sme viedli existujúcimi trasami, svietidlá navrhli spolu s interiérovou dizajnérkou a všetko schovali za tieňovú škáru.',
    image:
      'https://images.unsplash.com/photo-1785529907915-f389194590ed?auto=format&fit=crop&w=1400&q=80',
    alt: 'Spálňa s dizajnovým lineárnym svietidlom na stene',
    stats: [
      { k: 'Plocha', v: '124 m²' },
      { k: 'Okruhy', v: '38' },
      { k: 'Realizácia', v: '9 týždňov' },
    ],
  },
]

const PHASES = [
  {
    num: '01',
    title: 'Návrh s architektom',
    text: 'Sadneme si nad pôdorysmi ešte pred murovaním. Určíme, kde budú ovládače, koľko okruhov potrebuje každá miestnosť a kadiaľ povedú trasy.',
    meta: 'pred hrubou stavbou',
  },
  {
    num: '02',
    title: 'Inštalácia a programovanie',
    text: 'Rozvádzač, zbernicu a ovládače osadíme počas hrubej stavby. Potom prichádza logika — scény a väzby medzi svetlom, tienením a klímou.',
    meta: '6 až 12 týždňov',
  },
  {
    num: '03',
    title: 'Ladenie po nasťahovaní',
    text: 'Po mesiaci bývania scény spolu doladíme podľa toho, ako dom naozaj používate. Väčšinu neskorších zmien vyriešime na diaľku.',
    meta: 'a potom stále',
  },
]

/* ================================================================
   Pomocne
================================================================ */
const fmt = (n, d = 0) =>
  new Intl.NumberFormat('sk-SK', { minimumFractionDigits: d, maximumFractionDigits: d }).format(n)

function useAnimatedNumber(value, duration = 700) {
  const [display, setDisplay] = useState(value)
  const fromRef = useRef(value)
  const rafRef = useRef(0)

  useEffect(() => {
    const from = fromRef.current
    const start = performance.now()
    cancelAnimationFrame(rafRef.current)
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(from + (value - from) * eased)
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
      else fromRef.current = value
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [value, duration])

  return display
}

function CountUp({ target, duration = 1800, decimals = 0 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now) => {
            const t = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - t, 3)
            setCount(target * eased)
            if (t < 1) requestAnimationFrame(tick)
            else setCount(target)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.35 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {fmt(count, decimals)}
    </span>
  )
}

/* ================================================================
   TopBar
================================================================ */
function TopBar({ scene }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[92rem] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex items-center justify-between h-16 sm:h-[4.5rem]">
            <a href="#domov" className="flex items-center gap-2.5 group">
              <span
                className={`h-2 w-2 rounded-full transition-colors duration-500 ${
                  scrolled ? 'bg-primary' : 'bg-primary-light'
                }`}
              />
              <span
                className={`font-display text-lg tracking-tight transition-colors duration-500 ${
                  scrolled ? 'text-ink' : 'text-white'
                }`}
              >
                Lumen Living
              </span>
            </a>

            <div className="flex items-center gap-5">
              <span
                className={`hidden sm:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 ${
                  scrolled ? 'text-muted' : 'text-white/60'
                }`}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-60" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                {scene.label} · {scene.time}
              </span>

              <a
                href={TEL_HREF}
                className={`hidden lg:block font-mono text-xs transition-colors duration-500 ${
                  scrolled ? 'text-ink/70 hover:text-primary' : 'text-white/70 hover:text-white'
                }`}
              >
                {TEL_DISPLAY}
              </a>

              <button
                onClick={() => setOpen(true)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full border transition-colors duration-500 ${
                  scrolled
                    ? 'border-divider text-ink hover:border-primary'
                    : 'border-white/25 text-white hover:border-white/60'
                }`}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Menu</span>
                <Menu className="h-4 w-4" strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Celoobrazovkove menu */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-deep" onClick={() => setOpen(false)} />
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

        <div className="relative h-full max-w-[92rem] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col">
          <div className="flex items-center justify-between h-16 sm:h-[4.5rem]">
            <span className="font-display text-lg text-background">Lumen Living</span>
            <button
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/25 text-background"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Zavrieť</span>
              <X className="h-4 w-4" strokeWidth={1.8} />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center gap-1 sm:gap-2">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-5 py-2.5 border-b border-white/10"
                style={{
                  transitionDelay: `${i * 40}ms`,
                }}
              >
                <span className="font-mono text-[10px] text-primary-light/70 w-6">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-3xl sm:text-5xl text-background font-light group-hover:text-primary-light transition-colors">
                  {link.label}
                </span>
                <ArrowUpRight className="h-5 w-5 text-white/20 group-hover:text-primary-light transition-colors ml-auto" />
              </a>
            ))}
          </nav>

          <div className="pb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <p className="font-serif italic text-white/50 text-xl max-w-xs">
              Najlepší systém je ten, ktorý si nevšimnete.
            </p>
            <div className="font-mono text-[11px] text-white/60 space-y-1.5">
              <p>{TEL_DISPLAY}</p>
              <p>{EMAIL}</p>
              <p className="text-white/35">Bratislava · Staré Mesto</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/* ================================================================
   Scenicka scena — hero riadeny prepinacom
================================================================ */
function SceneStage({ scene, sceneIdx, setSceneIdx, userPicked }) {
  const stageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stage-line-1', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.3 })
      gsap.from('.stage-line-2', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.45,
      })
      gsap.from('.stage-meta, .stage-rail', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.8,
        stagger: 0.12,
      })
    }, stageRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="domov" ref={stageRef} className="relative min-h-[100dvh] w-full overflow-hidden">
      {/* Fotky sa prelinaju podla scény */}
      <div className="absolute inset-0">
        {SCENES.map((s, i) => (
          <div
            key={s.id}
            className="absolute inset-0 transition-opacity duration-[1200ms] ease-out"
            style={{ opacity: i === sceneIdx ? 1 : 0 }}
          >
            <img
              src={s.image}
              alt={s.alt}
              className="w-full h-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            <div className={`absolute inset-0 ${s.overlay}`} />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-deep/75 via-transparent to-deep/30" />
      </div>

      {/* Plavajuce svetelne body */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[24%] right-[16%] h-1.5 w-1.5 rounded-full bg-primary-light/70 animate-float"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="absolute top-[46%] right-[8%] h-1 w-1 rounded-full bg-white/45 animate-float"
          style={{ animationDelay: '1.8s' }}
        />
        <div
          className="absolute top-[34%] right-[26%] h-2 w-2 rounded-full bg-primary/35 animate-float blur-[1px]"
          style={{ animationDelay: '3.3s' }}
        />
      </div>

      <div className="relative z-10 min-h-[100dvh] max-w-[92rem] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col justify-end pt-28 pb-8">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          {/* Text scény */}
          <div className="lg:col-span-7">
            <p className="stage-meta font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/55 mb-6">
              KNX · Loxone · Bratislava a západné Slovensko
            </p>

            <h1 className="font-display text-white leading-[0.98] tracking-tight">
              <span className="stage-line-1 block text-4xl sm:text-6xl lg:text-7xl font-light">
                <span key={scene.title} style={{ animation: 'scene-fade 0.7s ease-out' }}>
                  {scene.title}
                </span>
              </span>
              <span className="stage-line-2 block font-serif italic text-5xl sm:text-7xl lg:text-8xl text-primary-light mt-1">
                <span key={scene.flourish} style={{ animation: 'scene-fade 0.7s ease-out' }}>
                  {scene.flourish}
                </span>
              </span>
            </h1>

            <p
              key={scene.text}
              className="stage-meta mt-7 max-w-xl text-white/70 text-base sm:text-lg leading-relaxed font-light"
              style={{ animation: 'scene-fade 0.8s ease-out' }}
            >
              {scene.text}
            </p>

            <div className="stage-meta mt-9 flex flex-col sm:flex-row gap-3">
              <a
                href="#kontakt"
                className="magnetic-btn group inline-flex items-center justify-center gap-2 bg-primary text-white font-medium px-7 py-4 rounded-full"
              >
                Dohodnúť konzultáciu
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#sceny"
                className="lift-on-hover inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-7 py-4 rounded-full"
              >
                Čo sa deje v tejto scéne
              </a>
            </div>
          </div>

          {/* Živé hodnoty */}
          <div className="lg:col-span-5 stage-meta">
            <div className="grid grid-cols-2 gap-px bg-white/15 rounded-3xl overflow-hidden backdrop-blur-md">
              {scene.readouts.map((r) => (
                <Readout key={r.k} label={r.k} value={r.v} unit={r.unit} decimals={r.d} />
              ))}
            </div>
          </div>
        </div>

        {/* Prepínač scén */}
        <div className="stage-rail mt-10 sm:mt-12">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
              Deň v dome · vyberte scénu
            </span>
            {!userPicked && (
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 hidden sm:block">
                prehráva sa automaticky
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {SCENES.map((s, i) => {
              const Icon = s.Icon
              const active = i === sceneIdx
              return (
                <button
                  key={s.id}
                  onClick={() => setSceneIdx(i)}
                  className={`group relative overflow-hidden rounded-2xl border px-4 py-3.5 text-left transition-all duration-500 ${
                    active
                      ? 'bg-primary/90 border-primary text-white'
                      : 'bg-white/5 border-white/15 text-white/70 hover:bg-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Icon
                      className={`h-4 w-4 ${active ? 'text-white' : 'text-primary-light'}`}
                      strokeWidth={1.8}
                    />
                    <span className="font-mono text-[10px] tabular-nums opacity-70">{s.time}</span>
                  </div>
                  <p className="font-display text-lg mt-2 font-light">{s.label}</p>

                  {/* Ukazovatel automatickeho prehravania */}
                  {active && !userPicked && (
                    <span
                      className="absolute bottom-0 left-0 h-0.5 bg-white/70"
                      style={{ animation: 'scene-progress 7s linear forwards' }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scene-fade {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scene-progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  )
}

function Readout({ label, value, unit, decimals = 0 }) {
  const animated = useAnimatedNumber(value)
  return (
    <div className="bg-deep/50 px-5 py-4 sm:px-6 sm:py-5">
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">{label}</p>
      <p className="font-display text-2xl sm:text-3xl text-white mt-1.5 tabular-nums font-light">
        {fmt(animated, decimals)}
        <span className="text-sm text-primary-light ml-1.5">{unit}</span>
      </p>
    </div>
  )
}

/* ================================================================
   Signaturna vizualizacia — rez miestnostou, svietidla riadene scenou
   Kazde svietidlo ma vlastnu uroven jasu, farba = teplota chromatickosti
================================================================ */
const LIGHT_FIXTURES = [
  { id: 'podhlad', name: 'Podhľadové svetlá' },
  { id: 'zaves', name: 'Závesné nad stolom' },
  { id: 'police', name: 'LED pás v polici' },
  { id: 'orient', name: 'Orientačný pás' },
]

const KELVIN_MIN = 1800
const KELVIN_MAX = 5000

/* Planckova krivka — z teploty chromatickosti spravi farbu svetla */
function kelvinToCss(kelvin) {
  const t = Math.min(Math.max(kelvin, 1500), 8000) / 100
  const r = t <= 66 ? 255 : 329.6987 * Math.pow(t - 60, -0.1332048)
  const g = t <= 66 ? 99.4708 * Math.log(t) - 161.1196 : 288.1222 * Math.pow(t - 60, -0.0755148)
  const b = t >= 66 ? 255 : t <= 19 ? 0 : 138.5177 * Math.log(t - 10) - 305.0448
  const soften = (v) => Math.round(Math.min(255, Math.max(0, v)) * 0.82 + 255 * 0.18)
  return `rgb(${soften(r)}, ${soften(g)}, ${soften(b)})`
}

/* Oko vnima jas nelinearne — 5 % svetla nie je 5 % dojmu */
const perceived = (v) => (v <= 0 ? 0 : Math.pow(v, 0.6))

const DOWNLIGHTS = [58, 106, 154]

const DUST = [
  { x: 58, delay: '0s', dur: '8.4s' },
  { x: 106, delay: '3.1s', dur: '9.6s' },
  { x: 154, delay: '5.4s', dur: '8.8s' },
  { x: 226, delay: '1.6s', dur: '10.2s', low: true },
  { x: 244, delay: '6.2s', dur: '9.2s', low: true },
]

function LightRoom({ scene }) {
  const { kelvin, blind, daylight, fixtures } = scene.light
  const lamp = kelvinToCss(kelvin)
  const day = daylight * (1 - blind)

  /* Kolko svetla je v miestnosti celkovo — podla toho stmavne cela scena */
  const ambient = Math.min(
    1,
    0.12 +
      day * 0.75 +
      (fixtures.podhlad * 0.45 +
        fixtures.zaves * 0.3 +
        fixtures.police * 0.15 +
        fixtures.orient * 0.05) *
        1.4,
  )
  const shade = (1 - ambient) * 0.72
  /* Prach vidno len tam, kde je svetelny kuzel */
  const beamDust = Math.min(0.5, (fixtures.podhlad + fixtures.zaves) * 0.85)
  const kPos = ((kelvin - KELVIN_MIN) / (KELVIN_MAX - KELVIN_MIN)) * 100

  const ease = 'cubic-bezier(0.4, 0, 0.2, 1)'
  const fade = (value) => ({ opacity: value, transition: 'opacity 1.4s ease' })

  return (
    <div className="rounded-3xl border border-primary/15 bg-[#FBF8F3] p-4 sm:p-5 shadow-[0_24px_70px_-46px_rgba(27,25,21,0.6)]">
      {/* Hlavicka */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <Lightbulb className="h-4 w-4 text-primary-dark mt-px shrink-0" strokeWidth={1.7} />
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-dark">
              Svetlo v tejto scéne
            </p>
            <p className="text-[11px] text-muted font-light mt-1 leading-snug">
              Rez obývačkou — každé svietidlo sa stlmí alebo rozsvieti samo
            </p>
          </div>
        </div>
        <span
          key={scene.time}
          className="font-display text-sm text-ink tabular-nums shrink-0"
          style={{ animation: 'lr-fade 0.5s ease-out' }}
        >
          {scene.time}
        </span>
      </div>

      {/* Miestnost */}
      <div
        className="relative mt-4 rounded-2xl overflow-hidden border border-divider"
        style={{ background: 'linear-gradient(180deg,#FCF9F4 0%,#F3EADB 62%,#E9DCC5 100%)' }}
      >
        <svg
          viewBox="0 0 400 230"
          className="block w-full"
          role="img"
          aria-label={`Rez miestnosťou v scéne ${scene.label}: stropné svetlá na ${Math.round(
            fixtures.podhlad * 100,
          )} %, teplota svetla ${kelvin} K`}
        >
          <defs>
            <linearGradient id="lr-wall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            <linearGradient
              id="lr-fade-cone"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="24"
              x2="0"
              y2="200"
            >
              <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="0.55" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.04" />
            </linearGradient>
            <mask id="lr-m-cone">
              <rect x="0" y="0" width="400" height="230" fill="url(#lr-fade-cone)" />
            </mask>

            <linearGradient
              id="lr-fade-shelf"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="116"
              x2="0"
              y2="160"
            >
              <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
            <mask id="lr-m-shelf">
              <rect x="0" y="0" width="400" height="230" fill="url(#lr-fade-shelf)" />
            </mask>

            <linearGradient
              id="lr-fade-day"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="50"
              x2="0"
              y2="200"
            >
              <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.25" />
            </linearGradient>
            <mask id="lr-m-day">
              <rect x="0" y="0" width="400" height="230" fill="url(#lr-fade-day)" />
            </mask>

            <filter id="lr-soft" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
            <filter id="lr-soft-lg" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="9" />
            </filter>
          </defs>

          {/* --- Architektura miestnosti --- */}
          <rect x="0" y="0" width="400" height="196" fill="url(#lr-wall)" />
          <rect x="0" y="196" width="400" height="34" fill="#1B1915" fillOpacity="0.05" />
          <line
            x1="0"
            y1="196"
            x2="400"
            y2="196"
            stroke="#A87545"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="199.5"
            x2="400"
            y2="199.5"
            stroke="#A87545"
            strokeOpacity="0.14"
            strokeWidth="0.8"
          />

          {/* Strop */}
          <rect x="0" y="13" width="400" height="9" rx="3" fill="#1B1915" fillOpacity="0.15" />

          {/* Polica so zabudovanym LED pasom */}
          <rect x="18" y="110" width="104" height="5" rx="2" fill="#1B1915" fillOpacity="0.3" />
          <rect x="30" y="96" width="4" height="14" rx="1" fill="#1B1915" fillOpacity="0.2" />
          <rect x="37" y="92" width="3" height="18" rx="1" fill="#1B1915" fillOpacity="0.16" />
          <rect x="43" y="98" width="5" height="12" rx="1" fill="#1B1915" fillOpacity="0.2" />
          <ellipse cx="103" cy="105" rx="9" ry="5" fill="#1B1915" fillOpacity="0.16" />

          {/* Jedalensky stol */}
          <rect x="180" y="159" width="106" height="5" rx="2.5" fill="#1B1915" fillOpacity="0.32" />
          <rect x="191" y="164" width="4" height="32" rx="2" fill="#1B1915" fillOpacity="0.22" />
          <rect x="271" y="164" width="4" height="32" rx="2" fill="#1B1915" fillOpacity="0.22" />

          {/* Okno + tienenie */}
          <rect x="300" y="46" width="86" height="126" rx="4" fill="#FFFFFF" fillOpacity="0.45" />
          <rect
            x="300"
            y="46"
            width="86"
            height="126"
            rx="4"
            fill="#CCE1F0"
            style={{ opacity: day * 0.9, transition: 'opacity 1.4s ease' }}
          />
          <g
            style={{
              transform: `scaleY(${blind})`,
              transformOrigin: '343px 46px',
              transformBox: 'view-box',
              transition: `transform 1.3s ${ease}`,
            }}
          >
            <rect x="300" y="46" width="86" height="126" fill="#1B1915" fillOpacity="0.27" />
            {[64, 82, 100, 118, 136, 154].map((y) => (
              <line
                key={y}
                x1="300"
                y1={y}
                x2="386"
                y2={y}
                stroke="#FBF8F3"
                strokeOpacity="0.16"
                strokeWidth="1"
              />
            ))}
          </g>
          <g
            style={{
              transform: `translateY(${126 * blind}px)`,
              transition: `transform 1.3s ${ease}`,
            }}
          >
            <rect x="298" y="42" width="90" height="4.5" rx="2.25" fill="#1B1915" fillOpacity="0.5" />
          </g>
          <rect
            x="300"
            y="46"
            width="86"
            height="126"
            rx="4"
            fill="none"
            stroke="#1B1915"
            strokeOpacity="0.24"
            strokeWidth="1.5"
          />
          <line
            x1="343"
            y1="46"
            x2="343"
            y2="172"
            stroke="#1B1915"
            strokeOpacity="0.16"
            strokeWidth="1"
          />

          {/* --- Stmavenie miestnosti podla celkoveho jasu --- */}
          <rect
            x="0"
            y="0"
            width="400"
            height="230"
            fill="#14120E"
            style={{ opacity: shade, transition: 'opacity 1.6s ease' }}
          />

          {/* --- Denne svetlo z okna --- */}
          <g style={fade(day)}>
            <polygon
              points="300,58 386,58 332,196 190,196"
              fill="#B4D2E9"
              mask="url(#lr-m-day)"
              filter="url(#lr-soft)"
            />
            <ellipse cx="262" cy="196" rx="70" ry="7" fill="#C6DEF0" filter="url(#lr-soft)" />
          </g>

          {/* --- Svietidla: farba sleduje teplotu chromatickosti --- */}
          <g style={{ color: lamp, transition: 'color 1.6s ease' }}>
            <g style={{ animation: 'lr-breathe 7s ease-in-out infinite' }}>
              {/* Podhladove bodovky */}
              {DOWNLIGHTS.map((x) => (
                <g key={x}>
                  <polygon
                    points={`${x - 7},23 ${x + 7},23 ${x + 32},196 ${x - 32},196`}
                    fill="currentColor"
                    mask="url(#lr-m-cone)"
                    filter="url(#lr-soft)"
                    style={fade(perceived(fixtures.podhlad) * 0.5)}
                  />
                  <ellipse
                    cx={x}
                    cy="196"
                    rx="31"
                    ry="5"
                    fill="currentColor"
                    filter="url(#lr-soft)"
                    style={fade(perceived(fixtures.podhlad) * 0.62)}
                  />
                </g>
              ))}

              {/* Zavesne svietidlo nad stolom */}
              <polygon
                points="209,98 257,98 292,196 174,196"
                fill="currentColor"
                mask="url(#lr-m-cone)"
                filter="url(#lr-soft)"
                style={fade(perceived(fixtures.zaves) * 0.56)}
              />
              <ellipse
                cx="233"
                cy="159"
                rx="47"
                ry="4.5"
                fill="currentColor"
                filter="url(#lr-soft)"
                style={fade(perceived(fixtures.zaves) * 0.72)}
              />
              <ellipse
                cx="233"
                cy="196"
                rx="56"
                ry="7"
                fill="currentColor"
                filter="url(#lr-soft)"
                style={fade(perceived(fixtures.zaves) * 0.5)}
              />

              {/* LED pas v polici */}
              <rect
                x="18"
                y="116"
                width="104"
                height="44"
                fill="currentColor"
                mask="url(#lr-m-shelf)"
                filter="url(#lr-soft)"
                style={fade(perceived(fixtures.police) * 0.42)}
              />

              {/* Orientacny pas pri podlahe */}
              <ellipse
                cx="95"
                cy="195"
                rx="82"
                ry="7"
                fill="currentColor"
                filter="url(#lr-soft)"
                style={fade(Math.min(1, perceived(fixtures.orient) * 1.45))}
              />

              {/* Prach v svetelnom kuzeli — vidno ho len tam, kde svetlo naozaj svieti */}
              <g style={{ opacity: beamDust, transition: 'opacity 1.6s ease' }}>
                {DUST.map((d, i) => (
                  <circle
                    key={i}
                    cx={d.x}
                    cy="0"
                    r="1.5"
                    fill="currentColor"
                    style={{
                      animation: `${d.low ? 'lr-drift-low' : 'lr-drift'} ${d.dur} linear ${d.delay} infinite`,
                    }}
                  />
                ))}
              </g>
            </g>

            {/* Telesa svietidiel — kreslene nad zatmenim, aby boli citatelne vzdy */}
            {DOWNLIGHTS.map((x) => (
              <g key={`b-${x}`}>
                <rect x={x - 9} y="11" width="18" height="12" rx="3" fill="#1B1915" fillOpacity="0.45" />
                <ellipse
                  cx={x}
                  cy="23"
                  rx="6.5"
                  ry="2.6"
                  fill="currentColor"
                  style={fade(0.16 + perceived(fixtures.podhlad) * 0.84)}
                />
              </g>
            ))}

            <line x1="233" y1="18" x2="233" y2="74" stroke="#1B1915" strokeOpacity="0.42" strokeWidth="1.5" />
            <path d="M 217 74 L 249 74 L 258 96 L 208 96 Z" fill="#1B1915" fillOpacity="0.5" />
            <ellipse
              cx="233"
              cy="96"
              rx="25"
              ry="3.4"
              fill="currentColor"
              style={fade(0.16 + perceived(fixtures.zaves) * 0.84)}
            />

            <rect
              x="25"
              y="115.5"
              width="90"
              height="3"
              rx="1.5"
              fill="currentColor"
              style={fade(0.1 + perceived(fixtures.police) * 0.9)}
            />

            <rect
              x="20"
              y="189"
              width="150"
              height="2.5"
              rx="1.25"
              fill="currentColor"
              style={fade(0.08 + perceived(fixtures.orient) * 0.92)}
            />
          </g>
        </svg>
      </div>

      {/* Tienenie a denne svetlo */}
      <div className="mt-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
        <span className="tabular-nums">Žalúzie {Math.round(blind * 100)} % dole</span>
        <span className="tabular-nums">Denné svetlo {Math.round(day * 100)} %</span>
      </div>

      {/* Legenda svietidiel */}
      <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3.5">
        {LIGHT_FIXTURES.map((f) => {
          const level = fixtures[f.id]
          return (
            <div key={f.id}>
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted truncate">
                  {f.name}
                </span>
                {level === 0 ? (
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted/60 shrink-0">
                    vyp.
                  </span>
                ) : (
                  <span className="font-display text-[13px] text-ink tabular-nums leading-none shrink-0">
                    {Math.round(level * 100)}
                    <span className="text-[10px] text-muted ml-0.5">%</span>
                  </span>
                )}
              </div>
              <div className="mt-1.5 h-[3px] rounded-full bg-ink/10 overflow-hidden">
                <span
                  className="block h-full rounded-full"
                  style={{
                    width: `${level * 100}%`,
                    background: lamp,
                    boxShadow: level > 0 ? `0 0 6px ${lamp}` : 'none',
                    transition: `width 1.3s ${ease}, background-color 1.6s ease, box-shadow 1.6s ease`,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Teplota svetla */}
      <div className="mt-5 pt-4 border-t border-divider">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
            Teplota svetla
          </span>
          <span
            key={kelvin}
            className="font-display text-sm text-ink tabular-nums"
            style={{ animation: 'lr-fade 0.5s ease-out' }}
          >
            {kelvin.toLocaleString('sk-SK')} K
          </span>
        </div>
        <div
          className="relative mt-2.5 h-1.5 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${kelvinToCss(1800)}, ${kelvinToCss(
              2400,
            )}, ${kelvinToCss(3000)}, ${kelvinToCss(4000)}, ${kelvinToCss(5000)})`,
          }}
        >
          <span
            className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 -translate-x-1/2 rounded-full border-2 border-[#FBF8F3]"
            style={{
              left: `${kPos}%`,
              background: lamp,
              boxShadow: '0 1px 6px rgba(27,25,21,0.35)',
              transition: `left 1.3s ${ease}, background-color 1.6s ease`,
            }}
          />
        </div>
        <div className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-muted/80">
          <span>Teplá · večer</span>
          <span>Chladná · ráno</span>
        </div>
      </div>

      {/* Paticka */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
          <span
            key={scene.status}
            className="font-mono text-[10px] text-primary-dark truncate"
            style={{ animation: 'lr-fade 0.5s ease-out' }}
          >
            {scene.status}
          </span>
        </div>
        <div className="flex gap-1 shrink-0">
          {SCENES.map((s) => (
            <span
              key={s.id}
              className={`h-1 rounded-full transition-all duration-500 ${
                s.id === scene.id ? 'w-4 bg-primary' : 'w-1 bg-divider'
              }`}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes lr-drift {
          0%   { transform: translateY(26px); opacity: 0; }
          12%  { opacity: 1; }
          82%  { opacity: 1; }
          100% { transform: translateY(188px); opacity: 0; }
        }
        @keyframes lr-drift-low {
          0%   { transform: translateY(102px); opacity: 0; }
          14%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(190px); opacity: 0; }
        }
        @keyframes lr-breathe {
          0%, 100% { opacity: 0.93; }
          50%      { opacity: 1; }
        }
        @keyframes lr-fade {
          from { opacity: 0; transform: translateY(3px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

/* ================================================================
   Detail scény
================================================================ */
function SceneDetail({ scene }) {
  return (
    <section id="sceny" className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-14 scroll-mt-20">
      <div className="max-w-[92rem] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary-dark">
              Scéna · {scene.label}
            </span>
            <h2 className="font-display text-3xl sm:text-5xl text-ink mt-4 leading-[1.06] tracking-tight font-light">
              Jeden dotyk
              <span className="font-serif italic text-primary-dark"> a dom to urobí sám.</span>
            </h2>
          </div>
          <p className="text-muted text-sm max-w-sm leading-relaxed font-light">
            Scéna nespína len svetlá. Naraz rieši tienenie, teplotu aj zvuk — a spustí sa buď
            v naprogramovanom čase, alebo jedným tlačidlom pri dverách.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Riadky, co sa v scene deje */}
          <div className="lg:col-span-7">
            <div className="border-t border-divider">
              {scene.rows.map((row) => {
                const Icon = row.Icon
                return (
                  <div
                    key={row.k}
                    className="flex items-start gap-5 py-6 border-b border-divider"
                    style={{ animation: 'scene-fade 0.6s ease-out' }}
                  >
                    <span className="h-10 w-10 shrink-0 rounded-xl bg-primary/8 border border-primary/20 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-primary" strokeWidth={1.8} />
                    </span>

                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                        {row.k}
                      </p>
                      <p className="font-display text-xl text-ink mt-1.5 font-light leading-snug">
                        {row.v}
                      </p>
                      <p className="text-sm text-muted mt-1.5 font-light leading-relaxed">
                        {row.note}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Signaturna animacia riadena scenou */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <LightRoom scene={scene} />
              <p className="text-sm text-muted mt-5 leading-relaxed font-light">
                Teplota svetla sa počas dňa mení sama — ráno chladnejšia a jasná, večer teplá
                a stlmená. V noci zostane svietiť len orientačný pás pri podlahe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   Systemy — cislovany zoznam
================================================================ */
function SystemsLedger() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ledger-row', {
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="systemy"
      ref={ref}
      className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-14 bg-deep text-background rounded-t-6xl scroll-mt-20 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />

      <div className="relative max-w-[92rem] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary-light">
              Čo riadime
            </span>
            <h2 className="font-display text-3xl sm:text-5xl mt-4 leading-[1.05] tracking-tight font-light">
              Šesť systémov,
              <span className="font-serif italic text-primary-light"> jedna logika.</span>
            </h2>
          </div>
          <p className="text-white/45 max-w-sm text-sm leading-relaxed font-light">
            Nekupujete šesť aplikácií od šiestich značiek. Všetko beží na KNX alebo Loxone
            a rozpráva sa navzájom.
          </p>
        </div>

        <div className="border-t border-white/10">
          {SYSTEMS.map((s, i) => {
            const Icon = s.icon
            return (
              <div
                key={s.title}
                className="ledger-row group grid grid-cols-12 items-center gap-4 py-6 sm:py-7 border-b border-white/10 hover:bg-white/[0.03] transition-colors duration-500 px-2 -mx-2"
              >
                <span className="col-span-2 sm:col-span-1 font-mono text-[10px] text-primary-light/60">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="col-span-10 sm:col-span-4 flex items-center gap-3">
                  <Icon
                    className="h-5 w-5 text-primary-light/70 group-hover:text-primary-light transition-colors shrink-0"
                    strokeWidth={1.6}
                  />
                  <h3 className="font-display text-xl sm:text-2xl font-light">{s.title}</h3>
                </div>

                <p className="col-span-12 sm:col-span-6 text-white/45 text-sm leading-relaxed font-light pl-9 sm:pl-0">
                  {s.text}
                </p>

                <ArrowUpRight className="hidden sm:block col-span-1 h-5 w-5 text-white/20 group-hover:text-primary-light group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all justify-self-end" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   Cisla
================================================================ */
function StatsRow() {
  const stats = [
    { target: 12, suffix: '+', label: 'rokov na KNX', d: 0 },
    { target: 180, suffix: '+', label: 'odovzdaných domácností', d: 0 },
    { target: 24, suffix: ' h', label: 'reakcia na požiadavku', d: 0 },
  ]

  return (
    <section className="relative py-16 sm:py-20 px-6 sm:px-10 lg:px-14 bg-deep text-background">
      <div className="max-w-[92rem] mx-auto">
        <div className="grid sm:grid-cols-3 gap-10 sm:gap-6 pt-10 border-t border-white/10">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-5xl sm:text-6xl font-light tracking-tight leading-none">
                <CountUp target={s.target} decimals={s.d} />
                <span className="font-serif italic text-primary-light text-3xl sm:text-4xl">
                  {s.suffix}
                </span>
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mt-4">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   Rezidencie
================================================================ */
function Residences() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.res-row', {
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="rezidencie"
      ref={ref}
      className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-14 scroll-mt-20"
    >
      <div className="max-w-[92rem] mx-auto">
        <div className="max-w-2xl mb-14">
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary-dark">
            Rezidencie
          </span>
          <h2 className="font-display text-3xl sm:text-5xl text-ink mt-4 leading-[1.06] tracking-tight font-light">
            Domy, v ktorých
            <span className="font-serif italic text-primary-dark"> sa nič nehľadá.</span>
          </h2>
        </div>

        <div className="space-y-16 sm:space-y-24">
          {RESIDENCES.map((r, i) => (
            <article
              key={r.title}
              className={`res-row grid lg:grid-cols-2 gap-8 lg:gap-14 items-center ${
                i % 2 === 1 ? 'lg:[direction:rtl]' : ''
              }`}
            >
              <div className="relative overflow-hidden rounded-4xl bg-deep lg:[direction:ltr]">
                <img
                  src={r.image}
                  alt={r.alt}
                  loading="lazy"
                  className="w-full h-[19rem] sm:h-[25rem] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/35 to-transparent" />
                <span className="absolute top-5 left-5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink bg-background/90 backdrop-blur-sm rounded-full px-3 py-1.5">
                  {r.tag}
                </span>
              </div>

              <div className="lg:[direction:ltr]">
                <h3 className="font-display text-2xl sm:text-4xl text-ink leading-[1.1] tracking-tight font-light">
                  {r.title}
                </h3>
                <p className="text-muted mt-5 leading-relaxed font-light">{r.text}</p>

                <dl className="mt-8 grid grid-cols-3 gap-px bg-divider border border-divider rounded-2xl overflow-hidden">
                  {r.stats.map((s) => (
                    <div key={s.k} className="bg-background px-4 py-4">
                      <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                        {s.k}
                      </dt>
                      <dd className="font-display text-xl text-ink mt-1 font-light">{s.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   Spolupraca — tri fazy
================================================================ */
function Phases() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phase-col', {
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="proces"
      ref={ref}
      className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-14 scroll-mt-20"
    >
      <div className="max-w-[92rem] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary-dark">
              Spolupráca
            </span>
            <h2 className="font-display text-3xl sm:text-5xl text-ink mt-4 leading-[1.06] tracking-tight font-light">
              Tri fázy
              <span className="font-serif italic text-primary-dark"> od pôdorysu po večer doma.</span>
            </h2>
          </div>
          <p className="text-muted text-sm max-w-sm leading-relaxed font-light">
            Do projektu vstupujeme skôr, než sa začne murovať — vtedy vieme ušetriť najviac peňazí
            aj nervov.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-divider border-y border-divider">
          {PHASES.map((p) => (
            <div key={p.num} className="phase-col bg-background px-2 sm:px-8 py-10 first:pl-0 md:first:pl-8">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-5xl text-primary/25 font-light leading-none">
                  {p.num}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {p.meta}
                </span>
              </div>
              <h3 className="font-display text-2xl text-ink mt-8 font-light leading-snug">
                {p.title}
              </h3>
              <p className="text-muted text-sm mt-4 leading-relaxed font-light">{p.text}</p>
            </div>
          ))}
        </div>

        {/* Zaruky */}
        <div className="grid sm:grid-cols-3 gap-4 mt-14">
          {[
            {
              Icon: ShieldCheck,
              t: 'KNX Partner a Loxone',
              d: 'Otvorené štandardy — systém prevezme aj iná firma, ak by ste sa tak rozhodli.',
            },
            {
              Icon: DraftingCompass,
              t: 'Spolupráca s architektmi',
              d: 'Koordinujeme sa s architektom, interiérovou dizajnérkou aj elektrikárom na stavbe.',
            },
            {
              Icon: Headset,
              t: 'Servis a diaľková správa',
              d: 'Úpravy scén riešime bez výjazdu, na požiadavku reagujeme do 24 hodín.',
            },
          ].map(({ Icon, t, d }) => (
            <div key={t} className="rounded-3xl border border-divider bg-surface p-6">
              <Icon className="h-5 w-5 text-primary mb-4" strokeWidth={1.6} />
              <h3 className="font-display text-lg text-ink font-normal leading-snug">{t}</h3>
              <p className="text-sm text-muted mt-2 leading-relaxed font-light">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   Kontakt
================================================================ */
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', place: '', message: '' })
  const [files, setFiles] = useState([])
  const [status, setStatus] = useState('idle')
  const dropRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1200)
  }

  const handleFiles = (newFiles) => {
    setFiles((prev) => [...prev, ...Array.from(newFiles)].slice(0, 5))
  }

  return (
    <section id="kontakt" className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-14 scroll-mt-20">
      <div className="max-w-[92rem] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary-dark">
            Kontakt
          </span>
          <h2 className="font-display text-3xl sm:text-5xl text-ink mt-4 leading-[1.06] tracking-tight font-light">
            Povedzte nám
            <span className="block font-serif italic text-primary-dark">o svojom dome.</span>
          </h2>
          <p className="text-muted mt-6 leading-relaxed max-w-md font-light">
            Stačí pár viet o projekte a v akej fáze je. Ozveme sa do dvoch pracovných dní
            a dohodneme stretnutie v showroome alebo priamo na stavbe.
          </p>

          <div className="mt-10 space-y-4">
            {[
              { Icon: Phone, k: 'Zavolajte', v: TEL_DISPLAY, href: TEL_HREF },
              { Icon: Mail, k: 'Napíšte', v: EMAIL, href: `mailto:${EMAIL}` },
              { Icon: MapPin, k: 'Showroom', v: 'Bratislava · Staré Mesto' },
              { Icon: Clock, k: 'Otvorené', v: 'Po–Pia 9:00–18:00 · po dohode' },
            ].map(({ Icon, k, v, href }) => {
              const inner = (
                <>
                  <span className="h-11 w-11 rounded-xl bg-primary/8 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors shrink-0">
                    <Icon
                      className="h-4 w-4 text-primary group-hover:text-white transition-colors"
                      strokeWidth={1.8}
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                      {k}
                    </span>
                    <span className="font-display text-ink text-lg font-light">{v}</span>
                  </span>
                </>
              )
              return href ? (
                <a key={k} href={href} className="lift-on-hover flex items-center gap-4 group">
                  {inner}
                </a>
              ) : (
                <div key={k} className="flex items-center gap-4 group">
                  {inner}
                </div>
              )
            })}
          </div>

          <div className="mt-10 p-5 rounded-3xl bg-primary/5 border border-primary/15">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-dark mb-2">
              Diskrétnosť
            </p>
            <p className="text-sm text-muted leading-relaxed font-light">
              Pôdorysy ani fotky vášho domu nikde nezverejňujeme. Referencie ukazujeme len so
              súhlasom klienta a bez adresy.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="bg-surface border border-divider rounded-4xl p-7 sm:p-10 shadow-[0_40px_80px_-64px_rgba(27,25,21,0.7)]"
          >
            {status !== 'sent' ? (
              <>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field
                    label="Meno a priezvisko"
                    required
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                  />
                  <Field
                    label="E-mail"
                    type="email"
                    required
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                  />
                  <Field
                    label="Telefón"
                    type="tel"
                    value={form.phone}
                    onChange={(v) => setForm({ ...form, phone: v })}
                  />
                  <Field
                    label="Lokalita projektu"
                    value={form.place}
                    onChange={(v) => setForm({ ...form, place: v })}
                  />
                </div>

                <div className="mt-5">
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2 block">
                    O projekte *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    placeholder="Napríklad: novostavba vily 280 m², hrubá stavba hotová na jar, zaujíma nás osvetlenie, tienenie a audio."
                    className="w-full bg-background border border-divider rounded-2xl px-4 py-3.5 text-ink placeholder-muted/50 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition resize-none font-body text-sm"
                  />
                </div>

                <div
                  ref={dropRef}
                  onDragOver={(e) => {
                    e.preventDefault()
                    dropRef.current?.classList.add('!border-primary', '!bg-primary/5')
                  }}
                  onDragLeave={() => {
                    dropRef.current?.classList.remove('!border-primary', '!bg-primary/5')
                  }}
                  onDrop={(e) => {
                    e.preventDefault()
                    dropRef.current?.classList.remove('!border-primary', '!bg-primary/5')
                    handleFiles(e.dataTransfer.files)
                  }}
                  className="mt-5 border border-dashed border-divider rounded-3xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <input
                    type="file"
                    multiple
                    id="file-up"
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                    accept="image/*,.pdf"
                  />
                  <label htmlFor="file-up" className="cursor-pointer block">
                    <Upload className="h-6 w-6 mx-auto text-primary mb-2" strokeWidth={1.6} />
                    <p className="font-display text-ink text-sm">
                      Priložte pôdorysy alebo fotky priestoru
                    </p>
                    <p className="text-xs text-muted mt-1 font-light">
                      Kliknite alebo sem presuňte súbory (max. 5, PDF alebo obrázky)
                    </p>
                    {files.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2 justify-center">
                        {files.map((f, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 bg-primary/10 text-primary-dark text-xs px-3 py-1.5 rounded-full font-mono"
                          >
                            <CheckCircle2 className="h-3 w-3" />
                            {f.name.length > 22 ? f.name.slice(0, 22) + '…' : f.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </label>
                </div>

                <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="text-xs text-muted font-light">Polia označené * sú povinné.</p>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-medium px-7 py-3.5 rounded-full disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Odosielam…' : 'Odoslať'}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-14">
                <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-8 w-8 text-primary" strokeWidth={1.6} />
                </div>
                <h3 className="font-display text-2xl text-ink mb-3 font-normal">
                  Ďakujeme za správu
                </h3>
                <p className="text-muted max-w-md mx-auto font-light">
                  Ozveme sa do dvoch pracovných dní a dohodneme stretnutie. Ak to súri, zavolajte
                  na {TEL_DISPLAY}.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

function Field({ label, type = 'text', required, value, onChange }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2 block">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background border border-divider rounded-2xl px-4 py-3.5 text-ink placeholder-muted/50 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition font-body text-sm"
      />
    </div>
  )
}

/* ================================================================
   Footer
================================================================ */
function Footer({ scene }) {
  return (
    <footer className="relative bg-deep text-background rounded-t-6xl overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[40rem] rounded-full bg-primary/15 blur-3xl" />

      <div className="relative px-6 sm:px-10 lg:px-14 pt-20 pb-10 max-w-[92rem] mx-auto">
        <div className="border-b border-white/10 pb-12 mb-12">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight font-light">
            Dom, ktorý vie,
            <span className="font-serif italic text-primary-light block">kedy stlmiť svetlo.</span>
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-8 gap-6">
            <p className="text-white/45 max-w-md font-light">
              Lumen Living — inteligentné domácnosti KNX a Loxone pre prémiové byty a vily
              v Bratislave a na západnom Slovensku.
            </p>
            <a
              href="#kontakt"
              className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-medium px-7 py-3.5 rounded-full self-start sm:self-auto"
            >
              Dohodnúť konzultáciu
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="h-2 w-2 rounded-full bg-primary-light" />
              <span className="font-display text-xl">Lumen Living</span>
            </div>
            <p className="font-serif italic text-white/55 text-lg max-w-xs">
              Najlepší systém je ten, ktorý si nevšimnete.
            </p>
            <div className="flex items-center gap-2.5 mt-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-primary-light animate-ping opacity-70" />
                <span className="relative h-2 w-2 rounded-full bg-primary-light" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                Práve beží scéna {scene.label} · {scene.time}
              </span>
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-light mb-4">
              Navigácia
            </p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-white/55 hover:text-primary-light transition text-sm font-light"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-light mb-4">
              Kontakt
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={TEL_HREF}
                  className="text-white/55 hover:text-primary-light transition text-sm font-light"
                >
                  {TEL_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-white/55 hover:text-primary-light transition text-sm font-light"
                >
                  {EMAIL}
                </a>
              </li>
              <li className="text-white/55 text-sm font-light">Bratislava, SK</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <p className="font-mono text-[10px] text-white/40">© 2026 Lumen Living</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] text-white/40">
            <Link to="/ochrana-osobnych-udajov" className="hover:text-primary-light transition">
              Ochrana osobných údajov
            </Link>
            <Link to="/obchodne-podmienky" className="hover:text-primary-light transition">
              Obchodné podmienky
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ================================================================
   App
================================================================ */
export default function App() {
  const [sceneIdx, setSceneIdx] = useState(0)
  const [userPicked, setUserPicked] = useState(false)

  // Automaticke prehravanie scen, kym do toho navstevnik nezasiahne
  useEffect(() => {
    if (userPicked) return
    const id = setInterval(() => setSceneIdx((i) => (i + 1) % SCENES.length), 7000)
    return () => clearInterval(id)
  }, [userPicked])

  useEffect(() => {
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 200)
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 1000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  const pickScene = (i) => {
    setUserPicked(true)
    setSceneIdx(i)
  }

  const scene = SCENES[sceneIdx]

  return (
    <div className="relative">
      <div className="noise-overlay" />
      <TopBar scene={scene} />
      <main>
        <SceneStage
          scene={scene}
          sceneIdx={sceneIdx}
          setSceneIdx={pickScene}
          userPicked={userPicked}
        />
        <SceneDetail scene={scene} />
        <SystemsLedger />
        <StatsRow />
        <Residences />
        <Phases />
        <ContactForm />
      </main>
      <Footer scene={scene} />
    </div>
  )
}
