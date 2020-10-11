import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { WallethistoryTestModule } from '../../../test.module';
import { CurrencyHistoryMySuffixUpdateComponent } from 'app/entities/currency-history-my-suffix/currency-history-my-suffix-update.component';
import { CurrencyHistoryMySuffixService } from 'app/entities/currency-history-my-suffix/currency-history-my-suffix.service';
import { CurrencyHistoryMySuffix } from 'app/shared/model/currency-history-my-suffix.model';

describe('Component Tests', () => {
  describe('CurrencyHistoryMySuffix Management Update Component', () => {
    let comp: CurrencyHistoryMySuffixUpdateComponent;
    let fixture: ComponentFixture<CurrencyHistoryMySuffixUpdateComponent>;
    let service: CurrencyHistoryMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WallethistoryTestModule],
        declarations: [CurrencyHistoryMySuffixUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CurrencyHistoryMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CurrencyHistoryMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CurrencyHistoryMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CurrencyHistoryMySuffix(123);
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
        const entity = new CurrencyHistoryMySuffix();
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
