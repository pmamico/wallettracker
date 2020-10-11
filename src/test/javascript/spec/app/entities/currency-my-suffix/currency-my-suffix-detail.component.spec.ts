import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WallethistoryTestModule } from '../../../test.module';
import { CurrencyMySuffixDetailComponent } from 'app/entities/currency-my-suffix/currency-my-suffix-detail.component';
import { CurrencyMySuffix } from 'app/shared/model/currency-my-suffix.model';

describe('Component Tests', () => {
  describe('CurrencyMySuffix Management Detail Component', () => {
    let comp: CurrencyMySuffixDetailComponent;
    let fixture: ComponentFixture<CurrencyMySuffixDetailComponent>;
    const route = ({ data: of({ currency: new CurrencyMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WallethistoryTestModule],
        declarations: [CurrencyMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CurrencyMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CurrencyMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load currency on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.currency).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
