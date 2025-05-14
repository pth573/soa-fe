// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-customer',
//   imports: [],
//   templateUrl: './customer.component.html',
//   styleUrl: './customer.component.css'
// })
// export class CustomerComponent {

// }


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from '../product/product.component';

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
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductComponent],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  products: Product[] = [];
  searchSerialId: string = '';
  searchResult: WarrantyCondition | null = null;
  errorMessage: string = '';
  selectedProduct: Product | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Product[]>('http://localhost:8080/api/products')
      .subscribe({
        next: (data) => {
          this.products = data;
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

    let found = false;
    for (const product of this.products) {
      const condition = product.warrantyConditions.find(w => w.serialId === this.searchSerialId);
      if (condition) {
        this.searchResult = condition;
        this.selectedProduct = product;
        this.errorMessage = '';
        found = true;
        break;
      }
    }

    if (!found) {
      this.errorMessage = "Serial ID not found.";
      this.searchResult = null;
      this.selectedProduct = null;
    }
  }
}
