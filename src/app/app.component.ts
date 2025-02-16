import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from 'primeng/button';
// @ts-ignore
import imagePath from '@svg/arrival.svg' with { loader: 'text' };
import { Select } from 'primeng/select';
import { DomSanitizer } from '@angular/platform-browser';
import { CardComponent } from './components/shared/card/card.component';

type TScheme = 'light' | 'dark';
const THEME_KEY = 'theme';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button, Select, CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected readonly API_URL = API_URL;
  protected readonly imagePath = inject(DomSanitizer).bypassSecurityTrustHtml(imagePath);

  private readonly scheme: WritableSignal<TScheme> = signal<TScheme>(this.isDarkPrefers ? 'dark' : 'light');

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
}
