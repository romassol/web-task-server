import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-admin-pay-from-your-online-bank',
  templateUrl: './admin-pay-from-your-online-bank.component.html',
  styleUrls: ['./admin-pay-from-your-online-bank.component.css']
})
export class AdminPayFromYourOnlineBankComponent implements OnInit {

  internetBankPayments = null;
  valueToSql = {'default': '', 'byAmountAscending': '?sort=asc&field=howMuch', 'byAmountDescending': '?sort=desc&field=howMuch',
    'byAccountNumberAscending': '?sort=asc&field=accountNumber', 'byAccountNumberDescending': '?sort=desc&field=accountNumber'};

  constructor(private readonly http: HttpClient) { }

  ngOnInit() {
    this.getPayment();
  }

  public getPayment() {
    this.http.get('http://localhost:5000/internet-bank-payment').subscribe(response => {
        console.log('start');
        console.log(response);
        this.internetBankPayments = response;
        console.log('end');
      }
    );
  }

  public filter(event) {
    event.preventDefault();
    console.log(event);
    let value = event.target['0'].value;
    this.http.get(`http://localhost:5000/card-payment?filter=${value}&field=account_number`).subscribe(response => {
        console.log('start filter');
        console.log(response);
        this.internetBankPayments = response;
        console.log('end filter');
      }
    );
  }

  public sort(value) {
    let sql = this.valueToSql[value];
    this.http.get(`http://localhost:5000/card-payment${sql}`).subscribe(response => {
        console.log('start');
        console.log(response);
        this.internetBankPayments = response;
        console.log('end');
      }
    );
  }
}
