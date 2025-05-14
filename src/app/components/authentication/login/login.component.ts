import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Password } from 'primeng/password';
import { IftaLabel } from 'primeng/iftalabel';
import { isControlTouched } from '../../../core/utilities/utils';
import { InputText } from 'primeng/inputtext';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBuildingOffice2Solid, heroUserSolid } from '@ng-icons/heroicons/solid';

type TLoginType = 'CUSTOMER' | 'CORPORATE';

type TLoginNav = {
  label: string;
  type: TLoginType;
  icon: string;
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, Password, IftaLabel, InputText, NgIcon],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [provideIcons({ heroUserSolid, heroBuildingOffice2Solid })]
})
export class LoginComponent implements OnInit {

  loginType: TLoginType = 'CUSTOMER';

  readonly loginOptions: TLoginNav[] = [
    { label: 'Client', type: 'CUSTOMER', icon: 'heroUserSolid' },
    { label: 'Corporate', type: 'CORPORATE', icon: 'heroBuildingOffice2Solid' }
  ];
  protected readonly isControlTouched = isControlTouched;
  protected readonly form = inject(NonNullableFormBuilder).group({
    login: ['', [Validators.required, Validators.email]],
    secret: ['', [Validators.required]]
  });

  private readonly authService: AuthenticationService = inject(AuthenticationService);

  get f() {
    return this.form.controls;
  }

  public ngOnInit(): void {
    this.switchLogin(localStorage.getItem('__login_type__') as TLoginType || 'CUSTOMER');
  }

  customerLogin(): void {
    this.authService.oidcLogin();
  }

  corporateLogin(): void {
  }

  switchLogin(type: TLoginType): void {
    localStorage.setItem('__login_type__', type);
    this.form.reset();
    this.form.markAsUntouched();
    this.loginType = type;
  }

}
