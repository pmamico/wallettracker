import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { WallethistoryTestModule } from '../../../test.module';
import { CurrencyMySuffixUpdateComponent } from 'app/entities/currency-my-suffix/currency-my-suffix-update.component';
import { CurrencyMySuffixService } from 'app/entities/currency-my-suffix/currency-my-suffix.service';
import { CurrencyMySuffix } from 'app/shared/model/currency-my-suffix.model';

describe('Component Tests', () => {
  describe('CurrencyMySuffix Management Update Component', () => {
    let comp: CurrencyMySuffixUpdateComponent;
    let fixture: ComponentFixture<CurrencyMySuffixUpdateComponent>;
    let service: CurrencyMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WallethistoryTestModule],
        declarations: [CurrencyMySuffixUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CurrencyMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CurrencyMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CurrencyMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CurrencyMySuffix(123);
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
        const entity = new CurrencyMySuffix();
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
