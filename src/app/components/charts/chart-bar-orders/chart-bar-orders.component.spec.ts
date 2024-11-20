import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBarOrdersComponent } from './chart-bar-orders.component';

describe('ChartBarOrdersComponent', () => {
  let component: ChartBarOrdersComponent;
  let fixture: ComponentFixture<ChartBarOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartBarOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartBarOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
