import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GalleryItem {
  image: string;
  title: string;
  category: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  protected readonly galleryItems: GalleryItem[] = [
    {
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
      title: 'Urban Blonde',
      category: 'Color Couture'
    },
    {
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
      title: 'Soft Waves',
      category: 'Runway Styling'
    },
    {
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
      title: 'The Gentle Fade',
      category: 'Grooming Deluxe'
    },
    {
      image: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d0?auto=format&fit=crop&w=900&q=80',
      title: 'Classic Gentleman',
      category: 'Signature Cuts'
    },
    {
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
      title: 'Editorial Texture',
      category: 'Runway Styling'
    },
    {
      image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80',
      title: 'Copper Glow',
      category: 'Color Couture'
    }
  ];
}
