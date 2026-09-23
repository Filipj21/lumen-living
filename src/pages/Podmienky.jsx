import { useEffect } from 'react'
import LegalLayout, { Section } from './LegalLayout.jsx'

export default function Podmienky() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <LegalLayout title="Obchodné podmienky" updated="19. septembra 2026">
      <Section heading="Úvodné ustanovenia">
        <p>
          Podmienky upravujú vzťah medzi zhotoviteľom Lumen Living a objednávateľom pri návrhu,
          dodávke, montáži a programovaní systémov inteligentnej domácnosti na platformách KNX
          a Loxone.
        </p>
      </Section>

      <Section heading="Návrh a cenová ponuka">
        <p>
          Prvá konzultácia je nezáväzná a bezplatná. Následný návrh systému vrátane rozpisu okruhov
          a zariadení je samostatnou službou, ktorú pri realizácii započítavame do ceny diela.
          Cenová ponuka platí 30 dní od vystavenia.
        </p>
      </Section>

      <Section heading="Koordinácia so stavbou">
        <p>
          Termíny prác nadväzujú na harmonogram stavby. Objednávateľ zabezpečí prístup na stavbu,
          pripravenosť elektroinštalácie a súčinnosť ostatných profesií. Posun stavebných prác,
          ktorý nespôsobíme, nezakladá nárok na sankcie voči zhotoviteľovi.
        </p>
      </Section>

      <Section heading="Zmeny počas realizácie">
        <p>
          Zmeny v rozsahu, ktoré vzniknú po odsúhlasení návrhu, riešime písomným dodatkom. Zmeny
          požadované po naprogramovaní systému môžu znamenať dodatočné náklady na prácu
          programátora.
        </p>
      </Section>

      <Section heading="Platobné podmienky">
        <p>
          Štandardne účtujeme zálohu 50 % pri objednávke zariadení, 30 % po montáži a doplatok po
          odovzdaní a zaškolení, so splatnosťou 14 dní.
        </p>
      </Section>

      <Section heading="Odovzdanie a zaškolenie">
        <p>
          Dielo odovzdávame protokolom spolu s dokumentáciou, schémami a zálohou konfigurácie
          systému. Súčasťou je zaškolenie a jedno bezplatné doladenie scén do troch mesiacov od
          odovzdania.
        </p>
      </Section>

      <Section heading="Záruka a servis">
        <p>
          Na montáž a programovanie poskytujeme záruku 24 mesiacov, na zariadenia platí záruka
          výrobcu. Na servisné požiadavky reagujeme do 24 hodín v pracovných dňoch. Záruka sa
          nevzťahuje na zásahy do konfigurácie vykonané treťou osobou.
        </p>
      </Section>
    </LegalLayout>
  )
}
