import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RevealDirective } from '../../shared/directives/reveal.directive';

interface Store {
  name: string;
  address: string;
  phone: string;
  phoneRaw: string;
  flagship?: boolean;
  mapUrl: SafeResourceUrl;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  stores: Store[];

  constructor(sanitizer: DomSanitizer) {
    const map = (query: string): SafeResourceUrl =>
      sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`,
      );

    this.stores = [
      {
        name: 'Battaglia Terme',
        address: 'Via Colli Euganei, 96 — 35041 Battaglia Terme (PD)',
        phone: '+39 049 525625',
        phoneRaw: '+39049525625',
        flagship: true,
        mapUrl: map('Via Colli Euganei 96, 35041 Battaglia Terme PD'),
      },
      {
        name: 'Padova',
        address: 'Piazzale Santa Croce, 4',
        phone: '+39 049 8802877',
        phoneRaw: '+390498802877',
        mapUrl: map('Piazzale Santa Croce 4, Padova'),
      },
      {
        name: 'Pianiga (VE)',
        address: 'Via Roma, 109',
        phone: '+39 041 469248',
        phoneRaw: '+39041469248',
        mapUrl: map('Via Roma 109, Pianiga VE'),
      },
      {
        name: 'Mestre - Venezia',
        address: 'Piazza XXVII Ottobre, 52',
        phone: '+39 041 986709',
        phoneRaw: '+39041986709',
        mapUrl: map('Piazza XXVII Ottobre 52, Mestre Venezia'),
      },
    ];
  }
}
