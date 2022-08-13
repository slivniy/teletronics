import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectAssetDialogComponent } from './select-asset-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FilterAssetListPipe } from '../../core/pipes/filter-asset-list.pipe';
import { By } from '@angular/platform-browser';
import { TickerService } from '../../core/services/ticker-service/ticker.service';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

describe('SelectAssetDialogComponent', () => {
  let component: SelectAssetDialogComponent;
  let fixture: ComponentFixture<SelectAssetDialogComponent>;
  let dialogRef: MatDialogRef<SelectAssetDialogComponent>;
  let tickerService: TickerService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SelectAssetDialogComponent,
        FilterAssetListPipe
      ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        FormsModule,
        MatCheckboxModule
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
    dialogRef = TestBed.inject(MatDialogRef);
    tickerService = TestBed.inject(TickerService);
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

  it('should add/remove asset on selecting asset\' checkbox', () => {
    const checkBoxId = 'id'
    const fakeAssets = [{ id: checkBoxId, name: 'name', priceUsd: '1', symbol: 's' }]
    spyOnProperty(tickerService, 'availableFilteredAssets').and.returnValue(of(fakeAssets));
    fixture.detectChanges();
    const checkBox = fixture.debugElement.query(By.css(`input[type=checkbox]`)).nativeElement;
    checkBox.click();
    fixture.detectChanges();

    expect(component.selectedAssets.has(checkBoxId)).toBeTrue();
    checkBox.click();
    expect(component.selectedAssets.has(checkBoxId)).toBeFalse();
  });

});
