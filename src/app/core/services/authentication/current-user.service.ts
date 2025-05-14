import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { IAuthUser } from '../../model/user.model';
import { filter, Observable, retry, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private readonly _currentUser: WritableSignal<IAuthUser | undefined> = signal<IAuthUser | undefined>(undefined);
  private readonly http: HttpClient = inject(HttpClient);

  get currentUser(): IAuthUser | undefined {
    return this._currentUser();
  }

  public loadCurrentUser(): Observable<IAuthUser> {
    return this.http.get<IAuthUser>(`${API_URL}users/current`).pipe(
      take(1),
      retry({ count: 2, delay: 2000 }),
      filter(user => !!user),
      tap(user => this._currentUser.set(user)));
  }
}
