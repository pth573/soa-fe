import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabbarComponent } from './tabbar/tabbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TabbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'soa-fe';
}
