import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  protected readonly socials = [
    { label: 'Instagram', url: 'https://www.instagram.com/city0style/', handle: '@citystyle.salon' },
    { label: 'Facebook', url: 'https://www.facebook.com/City0Style/', handle: '/citystyle.salon' }
  ];

  protected readonly hours = [
    { day: 'Mo · Sa', time: '09:00 – 20:00' },
    { day: 'So', time: 'Geschlossen' },

  ];
}
