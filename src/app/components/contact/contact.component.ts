import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  protected readonly socials = [
    { label: 'Instagram', url: 'https://www.instagram.com/', handle: '@citystyle.salon' },
    { label: 'TikTok', url: 'https://www.tiktok.com/', handle: '@citystyle.styling' },
    { label: 'Pinterest', url: 'https://www.pinterest.de/', handle: 'City-Style Hair' }
  ];
}
