import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WallethistoryTestModule } from '../../../test.module';
import { CurrencyMySuffixComponent } from 'app/entities/currency-my-suffix/currency-my-suffix.component';
import { CurrencyMySuffixService } from 'app/entities/currency-my-suffix/currency-my-suffix.service';
import { CurrencyMySuffix } from 'app/shared/model/currency-my-suffix.model';

describe('Component Tests', () => {
  describe('CurrencyMySuffix Management Component', () => {
    let comp: CurrencyMySuffixComponent;
    let fixture: ComponentFixture<CurrencyMySuffixComponent>;
    let service: CurrencyMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WallethistoryTestModule],
        declarations: [CurrencyMySuffixComponent],
      })
        .overrideTemplate(CurrencyMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CurrencyMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CurrencyMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CurrencyMySuffix(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.currencies && comp.currencies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
