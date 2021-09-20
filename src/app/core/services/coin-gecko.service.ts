import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataTablesResponse } from '../models/dataTablesResponce';
import { DataTablesParameters } from '../models/dataTablesParameters';

@Injectable({
  providedIn: 'root',
})
export class CoinGeckoService {
  constructor(private http: HttpClient) {}

  getCurrentPrice(ids: string | string[], vs_currencies: string) {
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

  getCoinData(id: string, params?) {
    return this.http.get('https://api.coingecko.com/api/v3/coins/' + id, {
      params,
    });
  }

  getMarketData(curr = 'usd', params?: DataTablesParameters) {
    return this.http.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: curr,
        order:
          params?.columns[params?.order[0]?.column].data +
            '_' +
            params?.order[0].dir || 'market_cap_desc',
        per_page: params?.length > 0 ? params?.length.toString() : '7',
        page: (params?.start / params?.length + 1).toString() || '1',
        sparkline: 'true',
        price_change_percentage: '24h',
      },
    });
  }

  getGlobal() {
    return this.http.get('https://api.coingecko.com/api/v3/global');
  }
}
