import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectAssetDialogComponent } from './select-asset-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FilterAssetListPipe } from '../../core/pipes/filter-asset-list.pipe';
import { By } from '@angular/platform-browser';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TickerService } from '../../core/services/ticker-service/ticker.service';

describe('SelectAssetDialogComponent', () => {
  let component: SelectAssetDialogComponent;
  let fixture: ComponentFixture<SelectAssetDialogComponent>;
  let dialogRef: MatDialogRef<SelectAssetDialogComponent>;
  let loader: HarnessLoader;
  let tickerService: TickerService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SelectAssetDialogComponent,
        FilterAssetListPipe
      ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => { return; } } }
      ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(SelectAssetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogRef = TestBed.inject(MatDialogRef);
    tickerService = TestBed.inject(TickerService);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selected list on click Save', () => {
    component.selectedAssets.add('id');
    const spy = spyOn(dialogRef, 'close').and.stub();
    fixture.debugElement.query(By.css(`button[color="primary"]`)).nativeElement.click();
    expect(spy).toHaveBeenCalledWith(['id']);
  });

});
