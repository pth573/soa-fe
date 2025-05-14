import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Thêm HttpClient để gọi API
import { CommonModule } from '@angular/common'; // Bắt buộc nếu dùng standalone components
import { FormsModule } from '@angular/forms';    // Bắt buộc nếu dùng [(ngModel)]

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  phone: string;
  role?: string; 
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData: RegisterRequest = {
    username: '',
    password: '',
    email: '',
    phone: ''
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  register() {
    this.http.post('http://127.0.0.1:8000/user-service/register/', this.registerData)
      .subscribe({
        next: (res) => {
          this.successMessage = 'Đăng ký thành công!';
          this.errorMessage = null; // Xóa thông báo lỗi (nếu có)
        },
        error: (err) => {
          this.errorMessage = 'Đăng ký thất bại. Vui lòng thử lại.';
          this.successMessage = null; // Xóa thông báo thành công (nếu có)
        }
      });
  }
}
