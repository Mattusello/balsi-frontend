import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CatalogService } from '../../core/services/catalog.service';
import { Glass } from '../../core/mocks/glasses.mock';
import { TiltDirective } from '../../shared/directives/tilt.directive';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, DecimalPipe, TiltDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  glass = signal<Glass | null>(null);
  loading = signal(true);

  /** Immagine attualmente mostrata nel visualizzatore principale */
  activeImage = signal('');
  /** Indice del colore selezionato */
  activeColor = signal(0);
  /** Flag di feedback "aggiunto al carrello" */
  added = signal(false);

  constructor(private catalog: CatalogService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')!;
      this.loading.set(true);
      this.added.set(false);
      this.catalog.getById(id).subscribe(glass => {
        this.glass.set(glass ?? null);
        this.activeColor.set(0);
        this.activeImage.set(glass?.image_url ?? '');
        this.loading.set(false);
      });
    });
  }

  selectColor(index: number) {
    const g = this.glass();
    if (!g) return;
    this.activeColor.set(index);
    this.activeImage.set(g.colors[index].image);
  }

  selectImage(src: string) {
    this.activeImage.set(src);
  }

  addToCart() {
    this.added.set(true);
  }
}
