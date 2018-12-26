import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-pay-from-your-online-bank',
  templateUrl: './pay-from-your-online-bank.component.html',
  styleUrls: ['./pay-from-your-online-bank.component.css']
})
export class PayFromYourOnlineBankComponent implements OnInit {
  @Input() public internetBankFile = new InternetBankFile();

  constructor(private readonly http: HttpClient) { }

  ngOnInit() {
  }

  getFile() {
    this.http.post('http://localhost:5000/get-file', this.internetBankFile).subscribe(function(response) {
      if (response['success']) {
        console.log('success');
      }
      else {
        console.log('error');
      }
    });
  }
}

export class InternetBankFile {
  itn: string;
  bik: string;
  accountNumber: string;
  forWhat: string;
  howMuch: string;
}
