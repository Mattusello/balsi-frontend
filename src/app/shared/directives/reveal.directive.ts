import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  inject,
} from '@angular/core';

/**
 * Reveal-on-scroll. L'elemento porta già la classe `.reveal` (o `.reveal-mask`)
 * nel template e resta pienamente leggibile senza JS; questa directive si limita
 * ad aggiungere `.is-visible` quando entra nel viewport.
 *
 * Uso:  <div class="reveal" appReveal>            // delay 0
 *       <div class="reveal" [appReveal]="120">    // delay 120ms (stagger)
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit {
  /** Ritardo in ms — utile per lo stagger di una lista (es. $index * 90). */
  @Input('appReveal') delay: number | string = 0;

  private el = inject(ElementRef<HTMLElement>);

  ngOnInit(): void {
    const node = this.el.nativeElement as HTMLElement;
    const ms = Number(this.delay) || 0;
    if (ms) node.style.setProperty('--reveal-delay', `${ms}ms`);

    const reduce =
      typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Senza IntersectionObserver o con reduced-motion: mostra subito.
    if (reduce || typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add('is-visible');
            io.unobserve(node);
          }
        }
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(node);
  }
}
