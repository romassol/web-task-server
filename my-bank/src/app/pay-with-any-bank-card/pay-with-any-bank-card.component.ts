import { Component, OnInit } from '@angular/core';
import {Card} from './card/card.component';
import {Sum} from './sum/sum.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-pay-with-any-bank-card',
  templateUrl: './pay-with-any-bank-card.component.html',
  styleUrls: ['./pay-with-any-bank-card.component.css']
})
export class PayWithAnyBankCardComponent implements OnInit {
  card = new Card();
  sum = new Sum();
  constructor(private readonly http: HttpClient) {
    this.card.number = '';
    this.card.date = '';
    this.card.cvc = '';
    this.sum.amount = '';
    this.sum.email = '';
    this.sum.comment = '';
    this.http = http;
  }

  ngOnInit() {
  }

  pay() {
    const data = {card: {number: this.card.number, cvc: this.card.cvc, date: this.card.date},
      sum: {amount: this.sum.amount, comment: this.sum.comment, email: this.sum.email}};
    console.log('set data');
    console.log(data);
    this.http.post('http://localhost:5000/pay', data).subscribe(function(response) {
        if (response['success']) {
          console.log('success');
        }
        else {
          console.log('error');
        }
      });
  }
}
