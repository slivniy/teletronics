import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TickerHeaderSelectorComponent } from './ticker-header-selector.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('TickerHeaderSelectorComponent', () => {
  let component: TickerHeaderSelectorComponent;
  let fixture: ComponentFixture<TickerHeaderSelectorComponent>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
