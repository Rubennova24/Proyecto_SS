import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompatibilidadComponent } from './compatibilidad.component';

describe('CompatibilidadComponent', () => {
  let component: CompatibilidadComponent;
  let fixture: ComponentFixture<CompatibilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompatibilidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompatibilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
