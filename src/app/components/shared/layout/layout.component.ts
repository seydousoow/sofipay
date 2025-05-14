import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrentUserService } from '../../../core/services/authentication/current-user.service';
import { Avatar } from 'primeng/avatar';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [RouterOutlet, Avatar, NgOptimizedImage]
})
export class LayoutComponent {
  readonly navCollapsed = signal(true);

  private readonly scheme = signal<'light' | 'dark'>(this.isDarkPrefers ? 'dark' : 'light');
  private readonly currentUserService = inject(CurrentUserService);
  readonly currentUser = this.currentUserService.currentUser;

  constructor() {
    effect(() => {
      localStorage.setItem(THEME_KEY, this.scheme());
      document.documentElement.classList.toggle('dark', this.isDarkPrefers);
    });
  }

  get isDarkPrefers(): boolean {
    return localStorage.getItem(THEME_KEY) === 'dark' ||
      (!(THEME_KEY in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  public toggleScheme() {
    this.scheme.update(current => current === 'dark' ? 'light' : 'dark');
  }

  public toggleSidebar() {
    this.navCollapsed.update(old => !old);
  }

  public handleKeyDown(keyboardEvent: KeyboardEvent): void {
    if (keyboardEvent.key.toUpperCase() === 'ESCAPE' && this.navCollapsed()) {
      this.toggleSidebar();
    }
  }

  public closeMenu() {
  }
}
