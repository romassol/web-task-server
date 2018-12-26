import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sum',
  templateUrl: './sum.component.html',
  styleUrls: ['./sum.component.css']
})
export class SumComponent implements OnInit {
  @Input() public sum: Sum;
  constructor() { }

  ngOnInit() {
  }

}

export class Sum {
  amount: string;
  comment: string;
  email: string;
}
