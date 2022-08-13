import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TickerListComponent } from './ticker-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WebsocketService } from '../../core/services/websocket-service/websocket.service';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { TickerService } from '../../core/services/ticker-service/ticker.service';
import { By } from '@angular/platform-browser';

describe('TickerListComponent', () => {
  let component: TickerListComponent;
  let fixture: ComponentFixture<TickerListComponent>;
  let websocketService: WebsocketService;
  let tickerService: TickerService;
  const assetId = 'id1';
  const asset1 = { id: assetId, name: 'Bitcoin', priceUsd: '1', symbol: 'BTC' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TickerListComponent ],
      imports: [
        HttpClientTestingModule,
        MatCardModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerListComponent);
    component = fixture.componentInstance;
    websocketService = TestBed.inject(WebsocketService);
    tickerService = TestBed.inject(TickerService);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should not rerender DOM, if same list emited', () => {
    spyOnProperty(websocketService, 'assetsListStream').and.returnValue(of([asset1]))
    const spy = spyOn(component, 'trackBy').and.callThrough();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should call remove asset method of TickerService', () => {
    spyOnProperty(websocketService, 'assetsListStream').and.returnValue(of([asset1]))
    const spy = spyOn(tickerService, 'removeAssetFromSelected').and.stub();
    fixture.detectChanges();

    fixture.debugElement.query(By.css(`button`)).nativeElement.click();

    expect(spy).toHaveBeenCalledWith(assetId);
  });
});
