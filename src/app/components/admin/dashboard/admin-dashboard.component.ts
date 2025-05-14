import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { CardComponent } from '../../shared/card/card.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  imports: [Button, CardComponent]
})
export class AdminDashboardComponent {

}
