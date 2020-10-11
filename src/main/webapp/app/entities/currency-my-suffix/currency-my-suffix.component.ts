import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICurrencyMySuffix } from 'app/shared/model/currency-my-suffix.model';
import { CurrencyMySuffixService } from './currency-my-suffix.service';
import { CurrencyMySuffixDeleteDialogComponent } from './currency-my-suffix-delete-dialog.component';

@Component({
  selector: 'jhi-currency-my-suffix',
  templateUrl: './currency-my-suffix.component.html',
})
export class CurrencyMySuffixComponent implements OnInit, OnDestroy {
  currencies?: ICurrencyMySuffix[];
  eventSubscriber?: Subscription;

  constructor(
    protected currencyService: CurrencyMySuffixService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.currencyService.query().subscribe((res: HttpResponse<ICurrencyMySuffix[]>) => (this.currencies = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCurrencies();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICurrencyMySuffix): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCurrencies(): void {
    this.eventSubscriber = this.eventManager.subscribe('currencyListModification', () => this.loadAll());
  }

  delete(currency: ICurrencyMySuffix): void {
    const modalRef = this.modalService.open(CurrencyMySuffixDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.currency = currency;
  }
}
