import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CoinGeckoService {
  constructor(private http: HttpClient) {}

  getCurrentPrice(ids: string[], vs_currencies: string[]) {
    return this.http
      .get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: ids,
          vs_currencies: vs_currencies,
        },
      })
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => console.log(err)
      );
  }

  getTrending() {
    return this.http.get('https://api.coingecko.com/api/v3/search/trending');
  }

  getCoinData(id: string) {
    return this.http.get('https://api.coingecko.com/api/v3/coins/' + id);
  }
  getMarketData(
    params,
    { curr = 'usd', order = 'name', per_page = '20', page = '1' }
  ) {
    return this.http.get('https://api.coingecko.com/api/v3/coins/markets/', {
      params: {
        vs_currency: curr,
        order:
          params.columns[params.order[0]?.column].data +
            '_' +
            params.order[0].dir || order,
        per_page: params.length || per_page,
        page: params.draw || page,
        sparkline: 'false',
        price_change_percentage: '1h,24h,7d,30d,1y',
      },
    });
  }

  getGlobal() {
    return this.http.get('https://api.coingecko.com/api/v3/global');
  }
}
