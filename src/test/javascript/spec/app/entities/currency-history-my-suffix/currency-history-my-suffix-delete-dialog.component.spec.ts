import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WallethistoryTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { CurrencyHistoryMySuffixDeleteDialogComponent } from 'app/entities/currency-history-my-suffix/currency-history-my-suffix-delete-dialog.component';
import { CurrencyHistoryMySuffixService } from 'app/entities/currency-history-my-suffix/currency-history-my-suffix.service';

describe('Component Tests', () => {
  describe('CurrencyHistoryMySuffix Management Delete Component', () => {
    let comp: CurrencyHistoryMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<CurrencyHistoryMySuffixDeleteDialogComponent>;
    let service: CurrencyHistoryMySuffixService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WallethistoryTestModule],
        declarations: [CurrencyHistoryMySuffixDeleteDialogComponent],
      })
        .overrideTemplate(CurrencyHistoryMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CurrencyHistoryMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CurrencyHistoryMySuffixService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
