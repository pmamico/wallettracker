import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { WalletHistoryMySuffixService } from 'app/entities/wallet-history-my-suffix/wallet-history-my-suffix.service';
import { IWalletHistoryMySuffix, WalletHistoryMySuffix } from 'app/shared/model/wallet-history-my-suffix.model';

describe('Service Tests', () => {
  describe('WalletHistoryMySuffix Service', () => {
    let injector: TestBed;
    let service: WalletHistoryMySuffixService;
    let httpMock: HttpTestingController;
    let elemDefault: IWalletHistoryMySuffix;
    let expectedResult: IWalletHistoryMySuffix | IWalletHistoryMySuffix[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(WalletHistoryMySuffixService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new WalletHistoryMySuffix(0, 0, currentDate, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            timestamp: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a WalletHistoryMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            timestamp: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            timestamp: currentDate,
          },
          returnedFromService
        );

        service.create(new WalletHistoryMySuffix()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a WalletHistoryMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            walletId: 1,
            timestamp: currentDate.format(DATE_TIME_FORMAT),
            value: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            timestamp: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of WalletHistoryMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            walletId: 1,
            timestamp: currentDate.format(DATE_TIME_FORMAT),
            value: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            timestamp: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a WalletHistoryMySuffix', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
