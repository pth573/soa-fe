// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-tabbar',
//   imports: [],
//   templateUrl: './tabbar.component.html',
//   styleUrl: './tabbar.component.css'
// })
// export class TabbarComponent {

// }


import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabbar',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule],
  templateUrl: './tabbar.component.html',
  styleUrl: './tabbar.component.css'
})
export class TabbarComponent {
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  get role(): string | null {
    return localStorage.getItem('role');
  }

  constructor(private router: Router, private http: HttpClient) {}

  logout(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.http.post('http://127.0.0.1:8000/user-service/logout/', {}, {
        headers: { Authorization: `Token ${token}` }
      }).subscribe({
        next: () => {
          localStorage.clear();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Logout failed:', err);
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      });
    } else {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}
