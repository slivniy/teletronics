import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TickerHeaderSelectorComponent } from './ticker-header-selector.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { TickerService } from '../../core/services/ticker-service/ticker.service';
import { of } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog/dialog-ref';

describe('TickerHeaderSelectorComponent', () => {
  let component: TickerHeaderSelectorComponent;
  let fixture: ComponentFixture<TickerHeaderSelectorComponent>;
  let dialog: MatDialog;
  let tickerService: TickerService;
  let button: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TickerHeaderSelectorComponent ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerHeaderSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialog = TestBed.inject(MatDialog);
    tickerService = TestBed.inject(TickerService);
    button = fixture.debugElement.query(By.css(`button`)).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open assets modal on Add button click', () => {
    const spy = spyOn(dialog, 'open').and.stub();
    button.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should call TickerService if modal closed with selected assets', () => {
    const selectedIds = ['id', 'id2']
    const spyTicker = spyOn(tickerService, 'addAssetsToSelected').and.stub();
    const fakeDialog = {
      afterClosed: () => of(selectedIds)
    } as MatDialogRef<unknown, unknown>;
    spyOn(dialog, 'open').and.returnValue(fakeDialog);
    button.click();
    expect(spyTicker).toHaveBeenCalledWith(selectedIds);
  });

  it('should not call TickerService if modal closed without select asset', () => {
    const spyTicker = spyOn(tickerService, 'addAssetsToSelected').and.stub();
    const fakeDialog = {
      afterClosed: () => of(undefined)
    } as MatDialogRef<unknown, unknown>;
    spyOn(dialog, 'open').and.returnValue(fakeDialog);
    button.click();
    expect(spyTicker).not.toHaveBeenCalled();
  });
});
