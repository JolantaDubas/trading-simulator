import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-price-change',
  templateUrl: './price-change.component.html',
})
export class PriceChangeComponent implements OnInit {
  @Input() valueChange: number;
  constructor() {}

  ngOnInit(): void {
    console.log('valueChangePrize', this.valueChange);
  }
}
