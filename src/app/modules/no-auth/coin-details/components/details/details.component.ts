import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @Input() data: any;
  @Input() currency: string;

  percentATH;
  constructor() {}

  ngOnInit(): void {
    this.percentATH = 100 + this.data.ath_change_percentage[this.currency];
  }
  checkIfNull(value): string | number {
    if (value) return value;
    else return '-';
  }
}
