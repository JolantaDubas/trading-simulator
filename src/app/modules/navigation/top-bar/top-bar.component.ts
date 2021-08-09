import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CgListsService } from 'src/app/core/services/cg-lists.service';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  vsCurrencies: string[];
  coins: string[];
  fullCoins: any[];
  coinControl = new FormControl('');

  vsCurrencyControl = new FormControl(localStorage.getItem('vs_currency'));
  constructor(private cgListsService: CgListsService, private router: Router) {}

  ngOnInit(): void {
    if (!this.vsCurrencyControl.value) {
      this.vsCurrencyControl.setValue('EUR');
      localStorage.setItem('vs_currency', this.vsCurrencyControl.value);
      window.location.reload();
    }
    this.cgListsService.getVsCurrencies().subscribe((res: string[]) => {
      this.vsCurrencies = res.map((item) => item.toUpperCase());
    });
    this.cgListsService.getCoinsList().subscribe((res: any[]) => {
      this.fullCoins = res;
      this.coins = res.map(
        (item) => `${item.name} (${item.symbol.toUpperCase()})`
      );
      localStorage.setItem('activeCurrencies', this.coins.length.toString());
    });

    this.vsCurrencyControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((data) => {
        if (this.vsCurrencies.includes(data)) {
          localStorage.setItem('vs_currency', this.vsCurrencyControl.value);
          window.location.reload();
        }
      });

    this.coinControl.valueChanges.pipe(debounceTime(500)).subscribe((data) => {
      const findIndex = this.coins.findIndex((item) => item === data);
      if (findIndex != -1) {
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() =>
            this.router.navigate(['/coin/', this.fullCoins[findIndex]?.id])
          );
      }
    });
  }
}
