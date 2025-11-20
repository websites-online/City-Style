import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  protected mobileMenuOpen = false;
  protected scrolled = false;

  // Wir navigieren immer zur Startseite ("/") und benutzen Fragmente
  protected readonly links = [
    { label: 'Start',       path: '/', fragment: 'start' },
    { label: 'Über uns',    path: '/', fragment: 'ueber-uns' },
    { label: 'Preise',      path: '/', fragment: 'preise' },
    { label: 'Galerie',     path: '/', fragment: 'galerie' },
    { label: 'Kontakt',     path: '/', fragment: 'kontakt' }
  ];

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 20;
  }
}
