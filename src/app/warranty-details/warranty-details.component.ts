// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-warranty-details',
//   standalone: true,
//   imports: [],
//   templateUrl: './warranty-details.component.html',
//   styleUrls: ['./warranty-details.component.css']
// })
// export class WarrantyDetailsComponent implements OnInit {
//   warrantyRequestId!: number;

//   constructor(private route: ActivatedRoute) {}

//   ngOnInit(): void {
//     this.warrantyRequestId = Number(this.route.snapshot.paramMap.get('id'));
//     console.log("Received Warranty Request ID:", this.warrantyRequestId);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-warranty-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './warranty-details.component.html',
  styleUrls: ['./warranty-details.component.css']
})
export class WarrantyDetailsComponent implements OnInit {
  warrantyRequestId!: number;
  warrantyStatus: any;
  errorMessage: string = '';
  private apiUrl = 'http://localhost:8080/api/v1/warranty-processing';
  private apiNextStepUrl = 'http://localhost:8080/api/v1/repair-tracking';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.warrantyRequestId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchWarrantyDetails();
  }

  // Gọi API lấy thông tin bảo hành
  fetchWarrantyDetails(): void {
    this.http.get(`${this.apiUrl}/${this.warrantyRequestId}`).subscribe({
      next: (response) => {
        this.warrantyStatus = response;
      },
      error: (error) => {
        console.error('Error fetching warranty status:', error);
        this.errorMessage = 'Không thể lấy thông tin bảo hành.';
      }
    });
  }

  // Nút cập nhật - gọi lại API
  onUpdate(): void {
    this.fetchWarrantyDetails();
  }

  // Gọi API Next Step
  onNextStep(): void {
    this.http.post(`${this.apiNextStepUrl}/${this.warrantyRequestId}/next`, {}).subscribe({
      next: (response) => {
        alert('Cập nhật trạng thái thành công!');
        this.onUpdate(); 
      },
      error: (error) => {
        console.error('Error during next step:', error);
        alert('Cập nhật trạng thái thất bại.');
      }
    });
  }
}
