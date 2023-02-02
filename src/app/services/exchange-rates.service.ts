import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { NBUData } from '../models/nbu.model';
import { ExchangeRateData } from '../models/exchange-rate.model';

@Injectable({providedIn: 'root'})
export class ExchangeRateService {
    private readonly NBU_RATES_EP = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json';

    constructor(private httpClient: HttpClient) {}
    
    public getExchangeRates$(): Observable<ExchangeRateData[]> {
        return this.httpClient.get<NBUData[]>(this.NBU_RATES_EP)
            .pipe(
                map(response => response
                    .map(element => ({
                        currency: element.cc,
                        rate: element.rate
                    }))
                    .concat({
                        currency: 'UAH',
                        rate: 1
                    })
                    .sort((a, b) => {
                        return a.currency > b.currency ? 1 : -1
                    })
            )
        )
    }
}