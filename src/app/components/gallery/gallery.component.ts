import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
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
export class GalleryComponent implements OnInit {
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

  protected readonly currentIndex = signal(0);
  private readonly destroyRef = inject(DestroyRef);
  private slideTimer: ReturnType<typeof setInterval> | null = null;
  private readonly intervalMs = 6000;

  constructor() {
    this.destroyRef.onDestroy(() => this.clearTimer());
  }

  ngOnInit(): void {
    this.startAutoSlide();
  }

  protected nextSlide(): void {
    this.currentIndex.update(idx => (idx + 1) % this.galleryItems.length);
  }

  protected previousSlide(): void {
    this.currentIndex.update(idx => (idx - 1 + this.galleryItems.length) % this.galleryItems.length);
  }

  protected goToSlide(index: number): void {
    if (index === this.currentIndex()) {
      return;
    }
    this.currentIndex.set(index);
    this.restartAutoSlide();
  }

  protected pauseAutoSlide(): void {
    this.clearTimer();
  }

  protected resumeAutoSlide(): void {
    this.startAutoSlide();
  }

  private startAutoSlide(): void {
    this.clearTimer();
    this.slideTimer = setInterval(() => this.nextSlide(), this.intervalMs);
  }

  private restartAutoSlide(): void {
    this.startAutoSlide();
  }

  private clearTimer(): void {
    if (this.slideTimer) {
      clearInterval(this.slideTimer);
      this.slideTimer = null;
    }
  }
}
