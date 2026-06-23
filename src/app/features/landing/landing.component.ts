import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../../core/services/catalog.service';
import { Glass } from '../../core/mocks/glasses.mock';

interface Collection {
  slug: 'uomo' | 'donna' | 'kids';
  label: string;
  tagline: string;
  image: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './landing.component.html',
})
export class LandingComponent implements OnInit {
  bestsellers = signal<Glass[]>([]);
  loading = signal(true);

  readonly collections: Collection[] = [
    {
      slug: 'uomo',
      label: 'Collezione Uomo',
      tagline: 'Carattere e precisione',
      image: 'https://images.unsplash.com/photo-1492288991661-058aa541ff43?w=900&q=80',
    },
    {
      slug: 'donna',
      label: 'Collezione Donna',
      tagline: 'Eleganza senza tempo',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80',
    },
    {
      slug: 'kids',
      label: 'Collezione Kids',
      tagline: 'Colore e leggerezza',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&q=80',
    },
  ];

  constructor(private catalog: CatalogService) {}

  ngOnInit() {
    this.catalog.getBestsellers().subscribe(data => {
      this.bestsellers.set(data);
      this.loading.set(false);
    });
  }
}
