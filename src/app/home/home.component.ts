import { Component, OnInit } from '@angular/core';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-home',
  imports: [ProductComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  customerInfo: any;

  ngOnInit() {
    const customerData = localStorage.getItem('customer_info');
    if (customerData) {
      this.customerInfo = JSON.parse(customerData);
    }
  }
}
