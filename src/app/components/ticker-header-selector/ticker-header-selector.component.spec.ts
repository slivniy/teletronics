import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerHeaderSelectorComponent } from './ticker-header-selector.component';

describe('TickerHeaderSelectorComponent', () => {
  let component: TickerHeaderSelectorComponent;
  let fixture: ComponentFixture<TickerHeaderSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TickerHeaderSelectorComponent ]
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
