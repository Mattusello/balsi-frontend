import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/landing.component').then(m => m.LandingComponent),
  },
  {
    path: 'onboarding',
    loadComponent: () =>
      import('./features/onboarding/onboarding.component').then(m => m.OnboardingComponent),
  },
  {
    path: 'catalogo',
    loadComponent: () =>
      import('./features/catalog/catalog.component').then(m => m.CatalogComponent),
  },
  {
    path: 'catalogo/:id',
    loadComponent: () =>
      import('./features/catalog/product-detail.component').then(m => m.ProductDetailComponent),
  },
  {
    path: 'contatti',
    loadComponent: () =>
      import('./features/contact/contact.component').then(m => m.ContactComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
