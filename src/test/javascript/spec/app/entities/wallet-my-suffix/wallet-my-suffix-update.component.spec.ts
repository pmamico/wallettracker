import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { WallethistoryTestModule } from '../../../test.module';
import { WalletMySuffixUpdateComponent } from 'app/entities/wallet-my-suffix/wallet-my-suffix-update.component';
import { WalletMySuffixService } from 'app/entities/wallet-my-suffix/wallet-my-suffix.service';
import { WalletMySuffix } from 'app/shared/model/wallet-my-suffix.model';

describe('Component Tests', () => {
  describe('WalletMySuffix Management Update Component', () => {
    let comp: WalletMySuffixUpdateComponent;
    let fixture: ComponentFixture<WalletMySuffixUpdateComponent>;
    let service: WalletMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WallethistoryTestModule],
        declarations: [WalletMySuffixUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(WalletMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WalletMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WalletMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new WalletMySuffix(123);
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
        const entity = new WalletMySuffix();
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
