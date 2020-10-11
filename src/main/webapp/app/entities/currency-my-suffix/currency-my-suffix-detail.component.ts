import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICurrencyMySuffix } from 'app/shared/model/currency-my-suffix.model';

@Component({
  selector: 'jhi-currency-my-suffix-detail',
  templateUrl: './currency-my-suffix-detail.component.html',
})
export class CurrencyMySuffixDetailComponent implements OnInit {
  currency: ICurrencyMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ currency }) => (this.currency = currency));
  }

  previousState(): void {
    window.history.back();
  }
}
