import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Collezione, Glass, GLASSES_MOCK } from '../mocks/glasses.mock';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  getAll(): Observable<Glass[]> {
    return of(GLASSES_MOCK).pipe(delay(600));
  }

  getBestsellers(): Observable<Glass[]> {
    const ids = ['phantom-noir', 'velocity-sport', 'aviator-legend', 'riviera-donna'];
    const list = ids
      .map(id => GLASSES_MOCK.find(g => g.id === id))
      .filter((g): g is Glass => !!g);
    return of(list).pipe(delay(600));
  }

  getByCollezione(collezione?: Collezione | null): Observable<Glass[]> {
    const list = collezione
      ? GLASSES_MOCK.filter(g => g.collezione === collezione)
      : GLASSES_MOCK;
    return of(list).pipe(delay(400));
  }

  getById(id: string): Observable<Glass | undefined> {
    return of(GLASSES_MOCK.find(g => g.id === id)).pipe(delay(400));
  }
}
