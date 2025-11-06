import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
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
export class GalleryComponent implements OnInit {
  protected readonly galleryItems: GalleryItem[] = [
    {
      image: 'assets/city5.webp'
    },
    {
      image: 'assets/city6.webp'
    },
    {
      image: 'assets/city8.webp'
    },
    {
      image: 'assets/city9.webp'
    }
  ];

  protected readonly currentIndex = signal(0);
  private readonly destroyRef = inject(DestroyRef);
  private slideTimer: ReturnType<typeof setInterval> | null = null;
  private readonly intervalMs = 2500;

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
