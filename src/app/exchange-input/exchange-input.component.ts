import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ExchangeRateData } from '../models/exchange-rate.model';

@Component({
  selector: 'app-exchange-input',
  templateUrl: './exchange-input.component.html',
  styleUrls: ['./exchange-input.component.css']
})
export class ExchangeInputComponent implements OnChanges {
  @Input('valueToConvert') valueToConvert = 0;
  @Input('rates') rates: ExchangeRateData[] = [];
  @Input('defaultCurrency') defaultCurrency: string = ''
  @Output('onChange') onChangeEventEmitter = new EventEmitter<number>();

  rateInput: number = -1;
  amountInput: number = 1;

  isEmittingOnRateChange: boolean = false;

  constructor() { }

  ngOnChanges() {
    this.isEmittingOnRateChange = false;

    if (this.rateInput === -1 && this.rates.length) {
      this.rateInput = this.rates.find(r => r.currency === this.defaultCurrency)?.rate || -1;
    }

    this.updateAmountFromInput();
  }

  onRateChange(rateInput: number): void {
    this.rateInput = rateInput;

    if (!this.isEmittingOnRateChange) {
      this.updateAmountFromInput();
      return;
    };

    this.onChangeEventEmitter.emit(this.amountInput * this.rateInput);
  }

  onAmountChange(amountInput: number) {
    this.isEmittingOnRateChange = true;

    this.amountInput = amountInput;

    this.onChangeEventEmitter.emit(this.amountInput * this.rateInput);
  }

  updateAmountFromInput() {
    this.amountInput = +(this.valueToConvert / this.rateInput).toFixed(2);
  }

}
