import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  name: string;
  description: string;
  duration: string;
  image: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  protected readonly services: Service[] = [
    {
      name: 'Signature Haircuts',
      description: 'Präzise, typgerechte Schnitte inspiriert von Paris, Mailand & New York.',
      duration: '45-60 Min',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80'
    },
    {
      name: 'Color Couture',
      description: 'Balayage, Glossing & multidimensionale Farbtechniken mit Olaplex-Schutz.',
      duration: '120-180 Min',
      image: 'https://images.unsplash.com/photo-1520626332474-4981d66aa193?auto=format&fit=crop&w=900&q=80'
    },
    {
      name: 'Runway Styling',
      description: 'Event-Frisuren, Brautstylings und Catwalk-ready Looks inkl. Make-up Touch-up.',
      duration: '60-120 Min',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80'
    },
    {
      name: 'Grooming Deluxe',
      description: 'Moderne Barber-Services, Bart-Design & Signature-Finishes für Ihn.',
      duration: '35-55 Min',
      image: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d0?auto=format&fit=crop&w=900&q=80'
    }
  ];
}
