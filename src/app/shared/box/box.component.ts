import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
})
export class BoxComponent implements OnInit {
  @Input() title?: string;
  @Input() icon?: string;
  @Input() showBtn: boolean = false;
  @Input() link?: string;
  constructor() {}

  ngOnInit(): void {
    console.log('link', this.link);
    console.log('showBtn', this.showBtn);
  }
}
