import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataTablesResponse } from '../models/dataTablesResponce';
import { DataTablesParameters } from '../models/dataTablesParameters';

@Injectable({
  providedIn: 'root',
})
export class CoinGeckoService {
  constructor(private http: HttpClient) {}

  getCurrentPrice(ids: string[], vs_currencies: string[]) {
    return this.http.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: ids,
        vs_currencies: vs_currencies,
      },
    });
  }

  getTrending() {
    return this.http.get('https://api.coingecko.com/api/v3/search/trending');
  }

  getCoinData(id: string) {
    return this.http.get('https://api.coingecko.com/api/v3/coins/' + id);
  }
  getMarketData(params: DataTablesParameters, { curr = 'usd' }) {
    return this.http.get('https://api.coingecko.com/api/v3/coins/markets/', {
      params: {
        vs_currency: curr,
        order:
          params.columns[params.order[0]?.column].data +
            '_' +
            params.order[0].dir || 'market_cap_desc',
        per_page: params.length.toString() || '25',
        page: (params.start / params.length + 1).toString() || '1',
        sparkline: 'true',
        price_change_percentage: '24h',
      },
    });
  }

  getGlobal() {
    return this.http.get('https://api.coingecko.com/api/v3/global');
  }
}
