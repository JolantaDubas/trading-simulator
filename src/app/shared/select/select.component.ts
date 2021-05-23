import { Component, Input, OnInit } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() label?: string;
  @Input() control: FormControl;
  @Input() options: string[];
  @Input() isDisable = false;
  @Input() placeholder?: string;
  filteredOptions: Observable<string[]>;

  ngOnInit(): void {
    if (this.isDisable) {
      this.control.disable();
    }
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options
      .filter((option) => option.toLowerCase().includes(filterValue))
      .slice(0, 40);
  }

  compareFunction(o1: string, o2: string): boolean {
    if (!o1 || !o2) return false;
    return o1 === o2;
  }
}
