import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = ''; // Thay vì loginData, chỉ cần email

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    if (!this.email) {
      this.errorMessage = "Vui lòng nhập email.";
      return;
    }

    this.http.get(`http://localhost:8080/api/v1/customers?${this.email}`)
      .subscribe({
        next: (customer: any) => {
          console.log('Customer Info:', customer);

          // Xác định vai trò
          if (customer.email === 'hoanganhvu271103@gmail.com') {
            localStorage.setItem('role', 'customer');
          } else {
            localStorage.setItem('role', 'technician');
          }
          localStorage.setItem('user_id', customer[0].id.toString());
          localStorage.setItem('customer_info', JSON.stringify(customer[0]));

          this.successMessage = "Đăng nhập thành công!";
          this.errorMessage = null;
          this.router.navigate(['/home']); 
        },
        error: (err) => {
          this.errorMessage = 'Không tìm thấy người dùng với email này.';
          this.successMessage = null;
          console.error('Failed to get customer info', err);
        }
      });
  }
}
