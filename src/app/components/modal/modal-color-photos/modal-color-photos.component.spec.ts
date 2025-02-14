import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalColorPhotosComponent } from './modal-color-photos.component';

describe('ModalColorPhotosComponent', () => {
  let component: ModalColorPhotosComponent;
  let fixture: ComponentFixture<ModalColorPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalColorPhotosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalColorPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
