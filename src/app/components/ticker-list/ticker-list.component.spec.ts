import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TickerListComponent } from './ticker-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TickerListComponent', () => {
  let component: TickerListComponent;
  let fixture: ComponentFixture<TickerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TickerListComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
