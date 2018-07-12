import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConectividadComponent } from './conectividad.component';

describe('ConectividadComponent', () => {
  let component: ConectividadComponent;
  let fixture: ComponentFixture<ConectividadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConectividadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConectividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
