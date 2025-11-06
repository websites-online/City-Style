import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GalleryItem {
  image: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  private readonly baseItems: GalleryItem[] = [
    { image: 'assets/city2.webp' },
    { image: 'assets/city4.webp' },
    { image: 'assets/city5.webp' },
    { image: 'assets/city6.webp' },
    { image: 'assets/city8.webp' },
    { image: 'assets/city9.webp' }
  ];

  protected readonly marqueeItems = [...this.baseItems, ...this.baseItems];
  protected readonly itemCount = this.baseItems.length;
}
