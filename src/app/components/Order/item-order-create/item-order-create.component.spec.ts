import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOrderCreateComponent } from './item-order-create.component';

describe('ItemOrderCreateComponent', () => {
  let component: ItemOrderCreateComponent;
  let fixture: ComponentFixture<ItemOrderCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemOrderCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemOrderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
