import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PriceItem {
  name: string;
  description: string;
  price: string;
}

interface PriceCategory {
  title: string;
  items: PriceItem[];
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css'
})
export class PricingComponent {
  protected readonly categories: PriceCategory[] = [
    {
      title: 'Signature Cuts',
      items: [
        {
          name: 'City Classic',
          description: 'Beratung, Schnitt & Styling – für jeden Haartyp.',
          price: 'ab 69 €'
        },
        {
          name: 'Detail Cut',
          description: 'Präzisionsschnitt für Kurzhaarschnitte inkl. Styling.',
          price: 'ab 54 €'
        },
        {
          name: 'Grooming Experience',
          description: 'Maschinenschnitt + Bart-Design mit Heiße-Tuch-Ritual.',
          price: 'ab 49 €'
        }
      ]
    },
    {
      title: 'Color Couture',
      items: [
        {
          name: 'Balayage Deluxe',
          description: 'Freihandtechniken, Glossing & Pflegeboost.',
          price: 'ab 189 €'
        },
        {
          name: 'Color Refresh',
          description: 'Ansatzfarbe inkl. Gloss und Styling-Finish.',
          price: 'ab 94 €'
        },
        {
          name: 'Creative Color',
          description: 'Fashion Shades, Color Blocking oder Pastelltöne.',
          price: 'ab 129 €'
        }
      ]
    },
    {
      title: 'Add-ons & Treatments',
      items: [
        {
          name: 'Olaplex Rebuild',
          description: 'Intensive Bond-Reparatur für stark beanspruchtes Haar.',
          price: '39 €'
        },
        {
          name: 'Scalp Detox Ritual',
          description: 'Detox-Peeling, Serum & Massage für die Kopfhaut.',
          price: '29 €'
        },
        {
          name: 'Runway Finish',
          description: 'Luxuriöses Styling mit Tools & Glossing-Produkten.',
          price: '24 €'
        }
      ]
    }
  ];
}
