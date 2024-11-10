import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonEnvioEsComponent } from './button-envio-es.component';

describe('ButtonEnvioEsComponent', () => {
  let component: ButtonEnvioEsComponent;
  let fixture: ComponentFixture<ButtonEnvioEsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonEnvioEsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonEnvioEsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
