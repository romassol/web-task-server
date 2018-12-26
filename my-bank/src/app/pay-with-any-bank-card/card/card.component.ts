import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() public card: Card;
  constructor() { }

  ngOnInit() {
  }

}

export class Card {
  public number: string;
  public date: string;
  public cvc: string;
}
