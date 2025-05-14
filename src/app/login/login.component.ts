import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  id!: number;  // Thay đổi từ 'email' sang 'id'
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    // Gọi API để lấy thông tin khách hàng theo ID
    this.http.get(`http://localhost:8080/api/v1/customers/${this.id}`).subscribe({
      next: (customer: any) => {
        console.log('Customer Info:', customer);

        // Xác định vai trò dựa vào email (ví dụ: email đặc biệt sẽ là customer)
        if (customer.email === 'hoanganhvu271103@gmail.com') {
          localStorage.setItem('role', 'customer');
        } else {
          localStorage.setItem('role', 'technician');
        }
        
        // Lưu thông tin vào localStorage
        localStorage.setItem('user_id', customer.id.toString());
        localStorage.setItem('customer_info', JSON.stringify(customer));

        // Hiển thị thông báo đăng nhập thành công
        this.successMessage = "Đăng nhập thành công!";
        this.errorMessage = null;

        // Điều hướng người dùng tới trang home
        this.router.navigate(['/home']);
      },
      error: (err) => {
        // Hiển thị thông báo lỗi nếu không tìm thấy người dùng
        this.errorMessage = 'Không tìm thấy người dùng với ID này.';
        this.successMessage = null;
        console.error('Failed to get customer info', err);
      }
    });
  }
}