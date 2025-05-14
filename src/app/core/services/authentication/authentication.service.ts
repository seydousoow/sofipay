import { DestroyRef, inject, Injectable } from '@angular/core';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AUTH_ROUTES } from '../../utilities/constant';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly oAuthService: OAuthService = inject(OAuthService);

  get accessToken(): string {
    return this.oAuthService.getAccessToken();
  }

  initialize(): void {
    const config = {
      clientId: 'sEVLOSx4rAgzHdjSk05mBhstX26gqekZ',
      redirectUri: this.buildSelfUrl(AUTH_ROUTES.redirect),
      responseType: 'id_token token',

      useSilentRefresh: true,
      skipIssuerCheck: false,
      showDebugInformation: false,
      clearHashAfterLogin: false,
      silentRefreshRedirectUri: this.buildSelfUrl(AUTH_ROUTES.redirect),

      issuer: OAUTH_ISSUER,
      loginUrl: `${OAUTH_ISSUER}authorize`,
      logoutUrl: this.buildSelfUrl(AUTH_ROUTES.login),
      userinfoEndpoint: `${OAUTH_ISSUER}userinfo`,
      tokenEndpoint: `${OAUTH_ISSUER}oauth/token`,
      customQueryParams: { audience: `${OAUTH_ISSUER}api/v2/` },

      scope: 'openid profile email'
    };
    this.oAuthService.configure(config);

    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.events.pipe(
      takeUntilDestroyed(this.destroyRef),
      filter(e => e.type === 'token_expires' || e.type === 'session_terminated')
    ).subscribe(_ => {
      if (!this.oAuthService.hasValidAccessToken()) {
        this.oidcLogout();
      }
    });
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  oidcLogin(): void {
    this.oAuthService.initLoginFlow();
  }

  validateToken(): Promise<boolean> {
    return this.oAuthService.tryLogin();
  }

  oidcLogout(redirect = false): void {
    this.oAuthService.logOut(redirect);
  }

  private buildSelfUrl(path: string | undefined = undefined): string {
    if (!path) return window.location.origin;
    return window.location.origin + '/' + path;
  }
}
