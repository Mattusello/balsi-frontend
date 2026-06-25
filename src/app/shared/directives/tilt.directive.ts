import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  inject,
} from '@angular/core';

/**
 * Tilt 3D pointer-driven — parallax leggero sul prodotto / card.
 * Disattivata in reduced-motion e su dispositivi coarse (touch).
 *
 * Uso:  <div appTilt>            // ±8°
 *       <div appTilt [tiltMax]="6" [tiltScale]="1.03">
 */
@Directive({
  selector: '[appTilt]',
  standalone: true,
})
export class TiltDirective implements OnInit {
  @Input() tiltMax = 8;
  @Input() tiltScale = 1.02;

  private el = inject(ElementRef<HTMLElement>);
  private enabled = true;
  private frame = 0;

  ngOnInit(): void {
    const reduce =
      typeof matchMedia !== 'undefined' &&
      (matchMedia('(prefers-reduced-motion: reduce)').matches ||
        matchMedia('(pointer: coarse)').matches);
    this.enabled = !reduce;

    const node = this.el.nativeElement as HTMLElement;
    node.style.transition =
      'transform 0.5s var(--ease-out-expo), box-shadow 0.5s var(--ease-out-expo)';
    node.style.transformStyle = 'preserve-3d';
    node.style.willChange = 'transform';
  }

  @HostListener('pointermove', ['$event'])
  onMove(ev: PointerEvent): void {
    if (!this.enabled || ev.pointerType === 'touch') return;
    const node = this.el.nativeElement as HTMLElement;
    const rect = node.getBoundingClientRect();
    const px = (ev.clientX - rect.left) / rect.width - 0.5;
    const py = (ev.clientY - rect.top) / rect.height - 0.5;

    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      node.style.transition =
        'transform 0.12s linear, box-shadow 0.5s var(--ease-out-expo)';
      node.style.transform =
        `perspective(1000px) rotateX(${(-py * this.tiltMax).toFixed(2)}deg) ` +
        `rotateY(${(px * this.tiltMax).toFixed(2)}deg) scale(${this.tiltScale})`;
    });
  }

  @HostListener('pointerleave')
  onLeave(): void {
    if (!this.enabled) return;
    const node = this.el.nativeElement as HTMLElement;
    cancelAnimationFrame(this.frame);
    node.style.transition = 'transform 0.6s var(--ease-out-expo)';
    node.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  }
}
