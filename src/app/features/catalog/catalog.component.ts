import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from '../../core/services/catalog.service';
import { Collezione, Glass } from '../../core/mocks/glasses.mock';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';

const COLLEZIONI: Record<Collezione, string> = {
  uomo: 'Collezione Uomo',
  donna: 'Collezione Donna',
  kids: 'Collezione Kids',
};

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink, RevealDirective, TiltDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './catalog.component.html',
})
export class CatalogComponent implements OnInit {
  glasses = signal<Glass[]>([]);
  loading = signal(true);
  collezione = signal<Collezione | null>(null);
  title = signal('Tutti i modelli');

  constructor(private catalog: CatalogService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const raw = params.get('collezione');
      const collezione = (['uomo', 'donna', 'kids'] as const).includes(raw as Collezione)
        ? (raw as Collezione)
        : null;

      this.collezione.set(collezione);
      this.title.set(collezione ? COLLEZIONI[collezione] : 'Tutti i modelli');
      this.loading.set(true);

      this.catalog.getByCollezione(collezione).subscribe(data => {
        this.glasses.set(data);
        this.loading.set(false);
      });
    });
  }
}
