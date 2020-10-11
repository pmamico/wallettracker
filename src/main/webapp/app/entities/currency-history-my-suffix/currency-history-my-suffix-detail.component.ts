import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICurrencyHistoryMySuffix } from 'app/shared/model/currency-history-my-suffix.model';

@Component({
  selector: 'jhi-currency-history-my-suffix-detail',
  templateUrl: './currency-history-my-suffix-detail.component.html',
})
export class CurrencyHistoryMySuffixDetailComponent implements OnInit {
  currencyHistory: ICurrencyHistoryMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ currencyHistory }) => (this.currencyHistory = currencyHistory));
  }

  previousState(): void {
    window.history.back();
  }
}
