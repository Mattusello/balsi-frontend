import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../../core/services/catalog.service';
import { Glass } from '../../core/mocks/glasses.mock';

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

  constructor(private catalog: CatalogService) {}

  ngOnInit() {
    this.catalog.getBestsellers().subscribe(data => {
      this.bestsellers.set(data);
      this.loading.set(false);
    });
  }
}
