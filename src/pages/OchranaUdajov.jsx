import { useEffect } from 'react'
import LegalLayout, { Section } from './LegalLayout.jsx'

export default function OchranaUdajov() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <LegalLayout title="Ochrana osobných údajov" updated="19. septembra 2026">
      <Section heading="Kto spracúva vaše údaje">
        <p>
          Prevádzkovateľom je Lumen Living so sídlom v Bratislave. Kontaktovať nás môžete na
          studio@lumenliving.sk alebo na čísle +421 918 402 660.
        </p>
      </Section>

      <Section heading="Aké údaje zbierame">
        <p>
          Cez kontaktný formulár spracúvame meno a priezvisko, e-mail, telefónne číslo, lokalitu
          projektu a text vašej správy. Ak priložíte pôdorysy alebo fotografie priestoru,
          spracúvame aj ich.
        </p>
      </Section>

      <Section heading="Na aký účel">
        <p>
          Údaje používame na posúdenie projektu, prípravu cenovej ponuky a komunikáciu o zákazke.
          Právnym základom je vykonanie opatrení pred uzatvorením zmluvy na vašu žiadosť, neskôr
          plnenie zmluvy a zákonné povinnosti.
        </p>
      </Section>

      <Section heading="Dokumentácia k domu">
        <p>
          Pôdorysy, projektovú dokumentáciu a fotografie interiéru považujeme za citlivé. Sprístupňujeme
          ich len členom realizačného tímu, nezverejňujeme ich a nepoužívame v marketingu bez vášho
          písomného súhlasu. Referencie publikujeme bez adresy a bez identifikácie klienta.
        </p>
      </Section>

      <Section heading="Ako dlho ich uchovávame">
        <p>
          Nezrealizované dopyty mažeme po 12 mesiacoch od poslednej komunikácie. Dokumentáciu
          k zrealizovaným projektom uchovávame po dobu záruky a po dobu vyžadovanú účtovnými
          predpismi, spravidla 10 rokov.
        </p>
      </Section>

      <Section heading="Vaše práva">
        <p>
          Máte právo na prístup k údajom, ich opravu alebo vymazanie, na obmedzenie spracúvania,
          na prenosnosť a právo namietať. Napíšte na studio@lumenliving.sk. So sťažnosťou sa môžete
          obrátiť na Úrad na ochranu osobných údajov SR.
        </p>
      </Section>

      <Section heading="Cookies">
        <p>
          Web používa len technicky nevyhnutné súbory potrebné na jeho fungovanie. Nepoužívame
          reklamné ani profilovacie cookies tretích strán.
        </p>
      </Section>
    </LegalLayout>
  )
}
