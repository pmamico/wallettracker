import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { WallethistoryTestModule } from '../../../test.module';
import { WalletHistoryMySuffixUpdateComponent } from 'app/entities/wallet-history-my-suffix/wallet-history-my-suffix-update.component';
import { WalletHistoryMySuffixService } from 'app/entities/wallet-history-my-suffix/wallet-history-my-suffix.service';
import { WalletHistoryMySuffix } from 'app/shared/model/wallet-history-my-suffix.model';

describe('Component Tests', () => {
  describe('WalletHistoryMySuffix Management Update Component', () => {
    let comp: WalletHistoryMySuffixUpdateComponent;
    let fixture: ComponentFixture<WalletHistoryMySuffixUpdateComponent>;
    let service: WalletHistoryMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WallethistoryTestModule],
        declarations: [WalletHistoryMySuffixUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(WalletHistoryMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WalletHistoryMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WalletHistoryMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new WalletHistoryMySuffix(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new WalletHistoryMySuffix();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
