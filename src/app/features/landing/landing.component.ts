import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../../core/services/catalog.service';
import { Glass, MAISONS } from '../../core/mocks/glasses.mock';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { CountUpDirective } from '../../shared/directives/count-up.directive';

interface Collection {
  slug: 'uomo' | 'donna' | 'kids';
  label: string;
  tagline: string;
  image: string;
}

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

interface Step {
  n: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, RevealDirective, TiltDirective, CountUpDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './landing.component.html',
})
export class LandingComponent implements OnInit {
  bestsellers = signal<Glass[]>([]);
  loading = signal(true);

  /** Lista raddoppiata per il marquee senza interruzioni. */
  readonly maisons = [...MAISONS, ...MAISONS];

  readonly stats: Stat[] = [
    { value: 35, suffix: '+', label: 'Anni di laboratorio' },
    { value: 500, suffix: '+', label: 'Modelli selezionati' },
    { value: 25, suffix: '+', label: 'Maison premium' },
    { value: 4, suffix: '', label: 'Negozi nel territorio' },
  ];

  readonly collections: Collection[] = [
    {
      slug: 'uomo',
      label: 'Uomo',
      tagline: 'Carattere e precisione',
      image: 'https://images.unsplash.com/photo-1492288991661-058aa541ff43?w=1000&q=80',
    },
    {
      slug: 'donna',
      label: 'Donna',
      tagline: 'Eleganza senza tempo',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&q=80',
    },
    {
      slug: 'kids',
      label: 'Kids',
      tagline: 'Colore e leggerezza',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1000&q=80',
    },
  ];

  readonly steps: Step[] = [
    {
      n: '01',
      title: 'Esame della vista',
      text: 'Optometristi qualificati e strumentazione moderna. Test gratuito e senza impegno per individuare miopia, astigmatismo o ipermetropia.',
    },
    {
      n: '02',
      title: 'Scelta della montatura',
      text: 'Ti accompagniamo tra centinaia di modelli verso la forma giusta per i tuoi tratti, il tuo stile e la tua giornata.',
    },
    {
      n: '03',
      title: 'Lavorazione su misura',
      text: 'Lenti tagliate e montate nel nostro laboratorio interno. Personalizziamo materiale, colore e trattamenti — spesso in giornata.',
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
