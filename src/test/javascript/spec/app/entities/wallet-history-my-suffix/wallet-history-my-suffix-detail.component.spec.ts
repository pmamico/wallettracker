import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WallethistoryTestModule } from '../../../test.module';
import { WalletHistoryMySuffixDetailComponent } from 'app/entities/wallet-history-my-suffix/wallet-history-my-suffix-detail.component';
import { WalletHistoryMySuffix } from 'app/shared/model/wallet-history-my-suffix.model';

describe('Component Tests', () => {
  describe('WalletHistoryMySuffix Management Detail Component', () => {
    let comp: WalletHistoryMySuffixDetailComponent;
    let fixture: ComponentFixture<WalletHistoryMySuffixDetailComponent>;
    const route = ({ data: of({ walletHistory: new WalletHistoryMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WallethistoryTestModule],
        declarations: [WalletHistoryMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(WalletHistoryMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WalletHistoryMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load walletHistory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.walletHistory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
