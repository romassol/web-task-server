import {Component, Input, OnInit} from '@angular/core';
import {Client, FullName} from '../client/client.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-request-payment',
  templateUrl: './request-payment.component.html',
  styleUrls: ['./request-payment.component.css']
})
export class RequestPaymentComponent implements OnInit {
  public client: Client;
  @Input() public requestedPayment = new RequestedPayment();

  constructor(private readonly http: HttpClient) { }

  ngOnInit() {
    this.client = new Client();
    this.client.fullName = new FullName('Шевцова', 'Мария', 'Валерьевна');
  }

  createPayment() {
    this.http.post('http://localhost:5000/create-payment', this.requestedPayment).subscribe(function(response) {
      if (response['success']) {
        console.log('success');
      }
      else {
        console.log('error');
      }
    });
  }
}

export class RequestedPayment {
  itn: string;
  bik: string;
  accountNumber: string;
  forWhat: string;
  howMuch: string;
  phone: string;
  email: string;
}
