import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

interface WarrantyRequest {
  customerId: number;
  warrantyId: number;
  serialId: string;
  hasInvoice: boolean;
  isPhysicalDamage: boolean;
  isWaterDamage: boolean;
  isFireDamage: boolean;
  isPixelError: boolean;
  isKeyboardIssue: boolean;
  isSpeakerIssue: boolean;
  isMainboardIssue: boolean;
  isRamOrHddIssue: boolean;
  isBatterySwollen: boolean;
  isBatteryDead: boolean;
}

@Component({
  selector: 'app-warranty-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './warranty-form.component.html',
  styleUrls: ['./warranty-form.component.css']
})
export class WarrantyFormComponent implements OnInit {
  customerData: Customer | null = null;
  warrantyData: WarrantyRequest = {
    customerId: 1,
    warrantyId: 1,
    serialId: '',
    hasInvoice: false,
    isPhysicalDamage: false,
    isWaterDamage: false,
    isFireDamage: false,
    isPixelError: false,
    isKeyboardIssue: false,
    isSpeakerIssue: false,
    isMainboardIssue: false,
    isRamOrHddIssue: false,
    isBatterySwollen: false,
    isBatteryDead: false,
  };

  // Danh sách các trường checkbox
  warrantyFields: string[] = [
    'hasInvoice',
    'isPhysicalDamage',
    'isWaterDamage',
    'isFireDamage',
    'isPixelError',
    'isKeyboardIssue',
    'isSpeakerIssue',
    'isMainboardIssue',
    'isRamOrHddIssue',
    'isBatterySwollen',
    'isBatteryDead'
  ];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.warrantyData.serialId = this.route.snapshot.paramMap.get('serialId') ?? '';
    const customerData = localStorage.getItem('customer_info');
    if (customerData) {
      this.customerData = JSON.parse(customerData);
      this.warrantyData.customerId = this.customerData?.id ?? 0;
    }
  }

    submitWarranty() {
      const url = `http://localhost:8080/api/v1/warranty-processing/request/${this.warrantyData.serialId}`;

      console.log("Data before POST:", this.warrantyData);

      this.http.post<any>(url, this.warrantyData)
        .subscribe({
          next: (response) => {
            alert(response.message);
            console.log("Response from server:", response);
            console.log("Warranty Request ID:", response.warrantyRequestId);

            // ✅ Chuyển hướng sang component khác với ID vừa nhận được
            this.router.navigate(['/warranty-details', response.warrantyRequestId]);
          },
          error: (err) => {
            if (err.error && err.error.error) {
              alert(`Failed to submit warranty request: ${err.error.error}`);
            } else {
              alert("Failed to submit warranty request.");
            }
            console.error("Error occurred:", err);
          }
        });
    }



  getFieldValue(field: string): boolean {
    const value = this.warrantyData[field as keyof WarrantyRequest];
    return typeof value === 'boolean' ? value : false;
  }

  updateFieldValue(field: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (typeof this.warrantyData[field as keyof WarrantyRequest] === 'boolean') {
      this.warrantyData[field as keyof WarrantyRequest] = isChecked as never;
    }
  }

}
