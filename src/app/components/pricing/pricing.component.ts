import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PriceEntry {
  name: string;
  price: string;
  note?: string;
}

interface PriceCategory {
  title: string;
  items: PriceEntry[];
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
      title: 'Herren',
      items: [
        { name: 'Schneiden/Föhnen', price: '18 €' },
        { name: 'Waschen/Schneiden/Föhnen', price: '18 €' },
        { name: 'Nassrasur', price: '10 €' },
        { name: 'Schneiden/Formen mit Schere', price: '10 €' },
        { name: 'Bart stutzen', price: '10 €' },
        { name: 'Bart formen', price: '7 €' },
        { name: 'Augenbrauen zupfen mit Faden', price: '15 €' },
        { name: 'Wachs Gesicht komplett', price: 'ab 25 €' },
        { name: 'Augenbrauen mit Messer', price: 'ab 40 €' },
        { name: 'Farbe/Strähnen', price: 'ab 50 €' },
        { name: 'Dauerwelle', price: 'ab 40 €' },
        { name: 'Haare Glättung', price: 'ab 50 €' },
        { name: 'Haare Waschen', price: '3 €' }
      ]
    },
    {
      title: 'Damen',
      items: [
        { name: 'Waschen/Schneiden (kurz)', price: '22 €' },
        { name: 'Waschen/Schneiden (lang)', price: '25 €' },
        { name: 'Waschen/Schneiden/Föhnen', price: '35 €' },
        { name: 'Haarmaske', price: '6 €' },
        { name: 'Pony schneiden', price: '7 €' },
        { name: 'Ansätze färben', price: 'ab 25 €' },
        { name: 'Komplett färben', price: 'ab 30 €' },
        { name: 'Strähnen am Oberkopf', price: 'ab 40 €' },
        { name: 'Strähnen komplett', price: 'ab 80 €' },
        { name: 'Föhnen', price: 'ab 45 €' },
        { name: 'Dauerwelle', price: 'ab 65 €' },
        { name: 'Haare Glättung', price: 'ab 150 €' },
        { name: 'Augenbrauen zupfen (mit Fadentechnik)', price: '13 €' },
        { name: 'Augenbrauen färben', price: '20 €' },
        { name: 'Wimpern färben', price: '18 €' },
        { name: 'Balayage', price: '220 - 300 €' }
      ]
    },
    {
      title: 'Kinder',
      items: [
        { name: 'Jungs bis 7 Jahre', price: '13 €' },
        { name: 'Mädchen bis 7 Jahre', price: '20 €' }
      ]
    }
  ];
}
