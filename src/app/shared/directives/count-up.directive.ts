import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  inject,
} from '@angular/core';

/**
 * Conta da 0 al valore target quando l'elemento entra nel viewport.
 * Il suffisso (+, %, …) resta nel template accanto alla cifra.
 *
 * Uso:  <span [appCountUp]="500"></span>
 */
@Directive({
  selector: '[appCountUp]',
  standalone: true,
})
export class CountUpDirective implements OnInit {
  @Input('appCountUp') target = 0;
  /** Durata animazione in ms. */
  @Input() countDuration = 1600;

  private el = inject(ElementRef<HTMLElement>);

  ngOnInit(): void {
    const node = this.el.nativeElement as HTMLElement;
    const end = Number(this.target) || 0;

    const reduce =
      typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;

    node.textContent = '0';

    if (reduce || typeof IntersectionObserver === 'undefined') {
      node.textContent = String(end);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            io.unobserve(node);
            this.run(node, end);
          }
        }
      },
      { threshold: 0.5 },
    );
    io.observe(node);
  }

  private run(node: HTMLElement, end: number): void {
    const duration = this.countDuration;
    let start: number | null = null;
    const ease = (t: number) => 1 - Math.pow(1 - t, 4); // ease-out-quart

    const step = (now: number) => {
      if (start === null) start = now;
      const p = Math.min((now - start) / duration, 1);
      node.textContent = String(Math.round(ease(p) * end));
      if (p < 1) requestAnimationFrame(step);
      else node.textContent = String(end);
    };
    requestAnimationFrame(step);
  }
}
