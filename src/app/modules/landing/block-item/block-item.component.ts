import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-block-item',
  templateUrl: './block-item.component.html',
  styleUrls: ['./block-item.component.scss'],
})
export class BlockItemComponent implements OnInit {
  @Input() title: string;
  constructor() {}

  ngOnInit(): void {}
}
