import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WallethistoryTestModule } from '../../../test.module';
import { CurrencyHistoryMySuffixDetailComponent } from 'app/entities/currency-history-my-suffix/currency-history-my-suffix-detail.component';
import { CurrencyHistoryMySuffix } from 'app/shared/model/currency-history-my-suffix.model';

describe('Component Tests', () => {
  describe('CurrencyHistoryMySuffix Management Detail Component', () => {
    let comp: CurrencyHistoryMySuffixDetailComponent;
    let fixture: ComponentFixture<CurrencyHistoryMySuffixDetailComponent>;
    const route = ({ data: of({ currencyHistory: new CurrencyHistoryMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WallethistoryTestModule],
        declarations: [CurrencyHistoryMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CurrencyHistoryMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CurrencyHistoryMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load currencyHistory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.currencyHistory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
