import { Component, OnInit } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { CustomerComponent } from '../customer/customer.component';
import { TechnicalComponent } from '../technical/technical.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CustomerComponent, TechnicalComponent],
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
