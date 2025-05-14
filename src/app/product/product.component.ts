// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-product',
//   imports: [],
//   templateUrl: './product.component.html',
//   styleUrl: './product.component.css'
// })
// export class ProductComponent {

// }


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Lấy danh sách sản phẩm từ API
    this.http.get<Product[]>('http://localhost:8080/api/products')
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

  // Hàm tìm kiếm serialId
  searchBySerialId() {
    if (!this.searchSerialId) {
      this.errorMessage = "Please enter a Serial ID to search.";
      this.searchResult = null;
      return;
    }

    this.http.get<WarrantyCondition>(`http://localhost:8080/api/products/${this.searchSerialId}`)
      .subscribe({
        next: (data) => {
          this.searchResult = data;
          this.errorMessage = '';
        },
        error: (err) => {
          console.error("Error fetching warranty info:", err);
          this.errorMessage = "Serial ID not found.";
          this.searchResult = null;
        }
      });
  }
}
