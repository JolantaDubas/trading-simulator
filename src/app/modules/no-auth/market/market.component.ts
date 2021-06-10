import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})
export class MarketComponent implements OnInit {
  currency: string;

  constructor() {
    this.currency = localStorage.getItem('vs_currency');
  }

  ngOnInit(): void {}
}
