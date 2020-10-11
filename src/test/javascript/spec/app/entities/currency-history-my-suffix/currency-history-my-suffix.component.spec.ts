import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { WallethistoryTestModule } from '../../../test.module';
import { CurrencyHistoryMySuffixComponent } from 'app/entities/currency-history-my-suffix/currency-history-my-suffix.component';
import { CurrencyHistoryMySuffixService } from 'app/entities/currency-history-my-suffix/currency-history-my-suffix.service';
import { CurrencyHistoryMySuffix } from 'app/shared/model/currency-history-my-suffix.model';

describe('Component Tests', () => {
  describe('CurrencyHistoryMySuffix Management Component', () => {
    let comp: CurrencyHistoryMySuffixComponent;
    let fixture: ComponentFixture<CurrencyHistoryMySuffixComponent>;
    let service: CurrencyHistoryMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WallethistoryTestModule],
        declarations: [CurrencyHistoryMySuffixComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: of({
                defaultSort: 'id,asc',
              }),
              queryParamMap: of(
                convertToParamMap({
                  page: '1',
                  size: '1',
                  sort: 'id,desc',
                })
              ),
            },
          },
        ],
      })
        .overrideTemplate(CurrencyHistoryMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CurrencyHistoryMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CurrencyHistoryMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CurrencyHistoryMySuffix(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.currencyHistories && comp.currencyHistories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CurrencyHistoryMySuffix(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.currencyHistories && comp.currencyHistories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
