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
    { label: 'Instagram', url: 'https://www.instagram.com/', handle: '@citystyle.salon' },
    { label: 'TikTok', url: 'https://www.tiktok.com/', handle: '@citystyle.styling' },
    { label: 'Pinterest', url: 'https://www.pinterest.de/', handle: 'City-Style Hair' }
  ];

  protected readonly hours = [
    { day: 'Mo · Di', time: '09:00 – 19:00' },
    { day: 'Mi · Do', time: '09:00 – 21:00' },
    { day: 'Fr', time: '08:00 – 21:00' },
    { day: 'Sa', time: '09:00 – 16:00' }
  ];
}
