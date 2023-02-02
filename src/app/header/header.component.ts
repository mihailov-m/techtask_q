import { Component, Input, OnChanges } from '@angular/core';
import { ExchangeRateData } from '../models/exchange-rate.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnChanges {
  @Input('rates') rates: ExchangeRateData[] = [];

  data: string = '';

  ngOnChanges() {
    if (!this.rates.length) return;
    
    this.data = ['USD', 'EUR'].map(c => this.getExchangeRateStr(c)).join(', ');
  }

  private getExchangeRateStr(currency: string): string {
    let exchangeData = this.rates.find(i => i.currency == currency);
    return exchangeData?`${currency}: ${exchangeData.rate}`:''
  }
}
