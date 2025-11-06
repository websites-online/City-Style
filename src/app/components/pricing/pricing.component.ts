import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PriceItem {
  name: string;
  description: string;
  price: string;
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css'
})
export class PricingComponent {
  protected readonly categories: PriceItem[] = [
    {
      name: 'Damenhaarschnitt & Styling',
      description: 'Waschen, Schnitt und Finish – auf Deinen Stil abgestimmt.',
      price: 'ab 64 €'
    },
    {
      name: 'Herrenhaarschnitt',
      description: 'Präziser Schnitt inkl. Styling und Nackenpflege.',
      price: 'ab 39 €'
    },
    {
      name: 'Kinderhaarschnitt (bis 12 Jahre)',
      description: 'Sanfter Schnitt inkl. kindgerechtem Styling.',
      price: 'ab 28 €'
    },
    {
      name: 'Balayage / Strähnen',
      description: 'Freihand oder Folie inkl. Glossing & Pflege.',
      price: 'ab 149 €'
    },
    {
      name: 'Ansatzfarbe',
      description: 'Farbauffrischung am Ansatz inkl. Pflegefinish.',
      price: 'ab 69 €'
    },
    {
      name: 'Intensivtönung / Gloss',
      description: 'Farbfresh-up oder seidiger Glanz für jede Haarstruktur.',
      price: 'ab 54 €'
    },
    {
      name: 'Keratin Treatment',
      description: 'Glättet und stärkt das Haar langfristig.',
      price: 'ab 189 €'
    },
    {
      name: 'Pflegekur & Kopfhautmassage',
      description: 'Regenerierendes Treatment mit entspannender Massage.',
      price: '29 €'
    },
    {
      name: 'Event- / Brautstyling',
      description: 'Beratung, Probetermin und Styling am Eventtag.',
      price: 'ab 189 €'
    }
  ];
}
