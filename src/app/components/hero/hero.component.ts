import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  protected readonly highlights = [
    'Signature-Stylings inspiriert von den Modemetropolen',
    'Premium-Produkte & maßgeschneiderte Beratung',
    'Late-Night-Services für After-Work-Termine'
  ];
}
