import { TestBed } from '@angular/core/testing';
import { TickerService } from './ticker.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { WebsocketService } from '../websocket-service/websocket.service';
import { StorageEnum } from '../../enums/storage.enum';

describe('TickerService', () => {
  let service: TickerService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let websocketService: WebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(TickerService);
    websocketService = TestBed.inject(WebsocketService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should get saved assets list on getAllAssetsList call', () => {

    service.getAllAssetsList();

    const storage = JSON.stringify(['id','d']);
    const spy = spyOn(window.localStorage, 'getItem').and.returnValue(storage);
    const resp = {data: [{id: 'id', name: 'name', symbol: 'symbol', priceUsd: 'priceUsd'}]}
    const req = httpTestingController.expectOne(`${environment.coinCapApi}/assets?limit=2000`);
    expect(req.request.method).toEqual('GET');
    req.flush(resp);
    httpTestingController.verify();

    expect(spy).toHaveBeenCalled();
  });

  it('should save correct list in localStorage', () => {

    service.getAllAssetsList();

    const storage = JSON.stringify(['id','d']);
    spyOn(window.localStorage, 'getItem').and.returnValue(storage);
    const spy = spyOn(window.localStorage, 'setItem').and.stub();
    const resp = {data: [{id: 'id', name: 'name', symbol: 'symbol', priceUsd: 'priceUsd'}]}
    const req = httpTestingController.expectOne(`${environment.coinCapApi}/assets?limit=2000`);
    req.flush(resp);
    httpTestingController.verify();

    expect(spy).toHaveBeenCalledWith(StorageEnum.selectedAssets, JSON.stringify(['id']));
  });

  it('should close socket connection if no selected assets and emit empty array', () => {
    const resp = {data: [{id: 'id', name: 'name', symbol: 'symbol', priceUsd: 'priceUsd'}]}

    service.getAllAssetsList();

    const storage = JSON.stringify([]);
    spyOn(window.localStorage, 'getItem').and.returnValue(storage);

    const spySocketEmit = spyOn(websocketService, 'emitListUpdateWithLatestData').and.stub();
    const spySocketClose = spyOn(websocketService, 'closeSocketConnection').and.stub();

    const req = httpTestingController.expectOne(`${environment.coinCapApi}/assets?limit=2000`);
    req.flush(resp);
    httpTestingController.verify();

    expect(spySocketEmit).toHaveBeenCalledWith([]);
    expect(spySocketClose).toHaveBeenCalled();
  });

  it('should reconnect socket on asset add', () => {

    const spyConnectionClose = spyOn(websocketService, 'closeSocketConnection').and.stub();
    const spySetConnection = spyOn(websocketService, 'setSocketConnection').and.callThrough();

    expect(spyConnectionClose).not.toHaveBeenCalled();
    expect(spySetConnection).not.toHaveBeenCalled();

    service.addAssetsToSelected(['id']);

    expect(spyConnectionClose).toHaveBeenCalled();
    expect(spySetConnection).toHaveBeenCalled();
  });

  it('should close socket on last asset remove', () => {

    const spyConnectionClose = spyOn(websocketService, 'closeSocketConnection').and.stub();
    const spySetConnection = spyOn(websocketService, 'setSocketConnection').and.callThrough();

    expect(spyConnectionClose).not.toHaveBeenCalled();
    expect(spySetConnection).not.toHaveBeenCalled();

    const resp = {data: [{id: 'id', name: 'name', symbol: 'symbol', priceUsd: 'priceUsd'}]}

    service.getAllAssetsList();

    const req = httpTestingController.expectOne(`${environment.coinCapApi}/assets?limit=2000`);
    req.flush(resp);
    httpTestingController.verify();

    service.removeAssetFromSelected('id');

    // service method will be called twice - on init and when no items left
    expect(spyConnectionClose).toHaveBeenCalledTimes(2);
  });
});
