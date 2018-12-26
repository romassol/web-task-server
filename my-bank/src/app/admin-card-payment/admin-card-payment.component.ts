import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-admin-card-payment',
  templateUrl: './admin-card-payment.component.html',
  styleUrls: ['./admin-card-payment.component.css']
})
export class AdminCardPaymentComponent implements OnInit {
  cardPayments = null;
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
    this.http.get(`http://localhost:5000/card-payment?filter=${value}&field=comment`).subscribe(response => {
        console.log('start filter');
        console.log(response);
        this.cardPayments = response;
        console.log('end filter');
      }
    );
  }

  public sort(value) {
    let sql = this.valueToSql[value];
    this.http.get(`http://localhost:5000/card-payment${sql}`).subscribe(response => {
        console.log('start');
        console.log(response);
        this.cardPayments = response;
        console.log('end');
      }
    );
  }

  public getPayment() {
    this.http.get('http://localhost:5000/card-payment').subscribe(response => {
        console.log('start');
        console.log(response);
        this.cardPayments = response;
        console.log('end');
      }
    );
  }

  public setNotSafe(cardPaymentId, value) {
    this.http.post('http://localhost:5000/set-field-not-safe',
      {id: cardPaymentId, value: value}).subscribe(response =>{
      if (response['success']) {
        console.log('success');
      }
      else {
        console.log('error');
      }
      this.getPayment();
    });
  }
}
