import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { CardComponent } from '../../shared/card/card.component';

@Component({
  selector: 'app-corporate-dashboard',
  templateUrl: './corporate-dashboard.html',
  imports: [Button, CardComponent]
})
export class CorporateDashboard {

}
