import {
  Component,
  ChangeDetectionStrategy,
  HostListener,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('mainEl') mainEl?: ElementRef<HTMLElement>;

  private host = inject(ElementRef<HTMLElement>);
  private router = inject(Router);

  constructor() {
    // Transizione di pagina in CSS puro: ad ogni navigazione riproduce
    // l'animazione `page-enter` sul contenitore <main>.
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        const el = this.mainEl?.nativeElement;
        if (!el) return;
        el.classList.remove('page-enter');
        void el.offsetWidth; // forza il reflow per riavviare l'animazione
        el.classList.add('page-enter');
      });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const ratio = max > 0 ? doc.scrollTop / max : 0;
    this.host.nativeElement.style.setProperty('--scroll', String(ratio));
  }
}
