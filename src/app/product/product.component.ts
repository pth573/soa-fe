import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface WarrantyCondition {
  serialId: string;
  purchaseDate: string;
  warrantyMonths: number;
  fixable: string;
  replacement: string;
  productId: number;
}

interface Product {
  id: number;
  name: string;
  image: string;
  warrantyConditions: WarrantyCondition[];
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  searchSerialId: string = '';
  searchResult: WarrantyCondition | null = null;
  errorMessage: string = '';
  selectedProduct: Product | null = null;

    constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Lấy danh sách sản phẩm từ API
    this.http.get<Product[]>('http://localhost:4200/api/products')
      .subscribe({
        next: (data) => {
          this.products = data;
          console.log("Products fetched successfully:", this.products);
        },
        error: (err) => {
          console.error("Error fetching products:", err);
        }
      });
  }

  searchBySerialId() {
    if (!this.searchSerialId) {
      this.errorMessage = "Please enter a Serial ID to search.";
      this.searchResult = null;
      return;
    }

    // Tìm kiếm trong danh sách sản phẩm đã tải về
    let found = false;
    for (const product of this.products) {
      // Kiểm tra điều kiện tồn tại của warrantyConditions trước khi gọi .find
      if (product.warrantyConditions && product.warrantyConditions.length > 0) {
        const condition = product.warrantyConditions.find(w => w.serialId === this.searchSerialId);
        if (condition) {
          this.searchResult = condition;
          this.selectedProduct = product;
          this.errorMessage = '';
          found = true;
          break;
        }
      }
    }

    if (!found) {
      this.errorMessage = "Serial ID not found.";
      this.searchResult = null;
      this.selectedProduct = null;
    }
  }

openWarrantyForm(warranty: WarrantyCondition) {
  if (warranty && warranty.serialId) {
    // Điều hướng đến trang bảo hành, truyền Serial ID làm tham số
    this.router.navigate(['/warranty-form', warranty.serialId]).then(success => {
      if (success) {
        console.log("Navigated to warranty form with Serial ID:", warranty.serialId);
      } else {
        console.error("Navigation to warranty form failed.");
      }
    }).catch(err => {
      console.error("Error during navigation:", err);
    });
  } else {
    console.error("Invalid warranty information.");
  }
}

}
