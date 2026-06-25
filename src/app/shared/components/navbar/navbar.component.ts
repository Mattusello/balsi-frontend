import {
  Component,
  HostListener,
  signal,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  NavigationEnd,
} from '@angular/router';
import { filter } from 'rxjs/operators';

interface NavItem {
  label: string;
  link: string;
  exact?: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './navbar.component.html',
  styles: [`
    .nav-overlay {
      animation: overlay-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    .nav-overlay-item {
      animation: item-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
      animation-delay: var(--reveal-delay, 0ms);
    }
    @keyframes overlay-in {
      from { opacity: 0; transform: scale(1.03); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes item-in {
      from { opacity: 0; transform: translateX(-18px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @media (prefers-reduced-motion: reduce) {
      .nav-overlay, .nav-overlay-item { animation: none; }
    }
  `],
})
export class NavbarComponent {
  scrolled = signal(false);
  mobileOpen = signal(false);
  /** True solo sulla home, dove la navbar fluttua sopra l'hero scuro. */
  onHome = signal(true);

  readonly items: NavItem[] = [
    { label: 'Home', link: '/', exact: true },
    { label: 'Collezioni', link: '/catalogo' },
    { label: 'Trova la montatura', link: '/onboarding' },
    { label: 'Contatti', link: '/contatti' },
  ];

  private router = inject(Router);

  constructor() {
    this.onHome.set(this.router.url === '/' || this.router.url.startsWith('/?'));
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.onHome.set(e.urlAfterRedirects === '/' || e.urlAfterRedirects.startsWith('/?'));
        this.mobileOpen.set(false);
      });
  }

  /** Trasparente solo in cima alla home; altrove (o dopo lo scroll) è solida. */
  get transparent(): boolean {
    return this.onHome() && !this.scrolled();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 24);
  }

  toggleMobile() {
    this.mobileOpen.update((v) => !v);
    document.body.style.overflow = this.mobileOpen() ? 'hidden' : '';
  }

  closeMobile() {
    this.mobileOpen.set(false);
    document.body.style.overflow = '';
  }
}
