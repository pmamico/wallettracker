import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WallethistoryTestModule } from '../../../test.module';
import { WalletMySuffixDetailComponent } from 'app/entities/wallet-my-suffix/wallet-my-suffix-detail.component';
import { WalletMySuffix } from 'app/shared/model/wallet-my-suffix.model';

describe('Component Tests', () => {
  describe('WalletMySuffix Management Detail Component', () => {
    let comp: WalletMySuffixDetailComponent;
    let fixture: ComponentFixture<WalletMySuffixDetailComponent>;
    const route = ({ data: of({ wallet: new WalletMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WallethistoryTestModule],
        declarations: [WalletMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(WalletMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WalletMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load wallet on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.wallet).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
