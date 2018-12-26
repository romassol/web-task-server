import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-admin-request-payment',
  templateUrl: './admin-request-payment.component.html',
  styleUrls: ['./admin-request-payment.component.css']
})
export class AdminRequestPaymentComponent implements OnInit {
  requestedPayments = null;
  valueToSql = {'default': '', 'byAmountAscending': '?sort=asc&field=amount', 'byAmountDescending': '?sort=desc&field=amount',
    'byNotSafeAscending': '?sort=asc&field=not_safe', 'byNotSafeDescending': '?sort=desc&field=not_safe'};

  constructor(private readonly http: HttpClient) { }

  ngOnInit() {
    this.getPayment();
  }

  public filter(event) {
    event.preventDefault();
    console.log(event);
    let value = event.target['0'].value;
    this.http.get(`http://localhost:5000/request-payment?filter=${value}&field=account_number`).subscribe(response => {
        console.log('start filter');
        console.log(response);
        this.requestedPayments = response;
        console.log('end filter');
      }
    );
  }

  public sort(value) {
    let sql = this.valueToSql[value];
    this.http.get(`http://localhost:5000/request-payment${sql}`).subscribe(response => {
        console.log('start sort');
        console.log(response);
        this.requestedPayments = response;
        console.log('end sort');
      }
    );
  }

  public getPayment() {
    this.http.get('http://localhost:5000/request-payment').subscribe(response => {
        console.log('start');
        console.log(response);
        this.requestedPayments = response;
        console.log('end');
      }
    );
  }
}
