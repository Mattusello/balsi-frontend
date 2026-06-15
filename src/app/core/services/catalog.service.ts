import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Glass, GLASSES_MOCK } from '../mocks/glasses.mock';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  getAll(): Observable<Glass[]> {
    return of(GLASSES_MOCK).pipe(delay(600));
  }

  getBestsellers(): Observable<Glass[]> {
    return of(GLASSES_MOCK.slice(0, 3)).pipe(delay(600));
  }
}
