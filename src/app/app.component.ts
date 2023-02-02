import { Component, OnInit } from '@angular/core';
import { ExchangeRateData } from './models/exchange-rate.model';
import { ExchangeRateService } from './services/exchange-rates.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  valueToConvertA = 0;
  valueToConvertB = 0;
  rateList: ExchangeRateData[] = [];

  constructor(private exchangeRateService: ExchangeRateService) { }

  ngOnInit(): void {
    this.exchangeRateService.getExchangeRates$().subscribe(rates => this.rateList = rates)
  }
}
