import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OffersService {

  private readonly http = inject(HttpClient);

  getOffers(): Observable<any[]> {
    return this.http.get<any[]>(this.buildUrl());
  }

  getOffer(id: string): Observable<any> {
    return this.http.get<any>(this.buildUrl(id));
  }

  createOffer(offer: any): Observable<any> {
    return this.http.post<any>(this.buildUrl(), offer);
  }

  updateOffer(id: string, offer: any): Observable<any> {
    return this.http.put<any>(this.buildUrl(id), offer);
  }

  deleteOffer(id: string): Observable<void> {
    return this.http.delete<void>(this.buildUrl(id));
  }

  private buildUrl(id: string | undefined = undefined): string {
    if (id) return `${API_URL}/offers/${id}`;
    return `${API_URL}/offers`;
  }
}
