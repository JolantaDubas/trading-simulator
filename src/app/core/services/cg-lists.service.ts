import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CgListsService {
  constructor(private http: HttpClient) {}
  getVsCurrencies() {
    return this.http.get(
      'https://api.coingecko.com/api/v3/simple/supported_vs_currencies'
    );
  }

  getCoinsList() {
    return this.http.get('https://api.coingecko.com/api/v3/coins/list');
  }
}
