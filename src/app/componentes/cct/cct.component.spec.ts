import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CctComponent } from './cct.component';

describe('CctComponent', () => {
  let component: CctComponent;
  let fixture: ComponentFixture<CctComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CctComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
