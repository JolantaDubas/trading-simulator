import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { password } from 'src/app/core/validators';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() id: string;
  @Input() control: FormControl;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @ViewChild('fieldName') fieldName;

  hide = false;

  constructor() {}

  ngOnInit(): void {
    this.control.valueChanges.subscribe((value) => {});
    if (this.type === 'password') this.hide = true;
  }
}
