import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EjecucionComponent } from './ejecucion.component';

describe('EjecucionComponent', () => {
  let component: EjecucionComponent;
  let fixture: ComponentFixture<EjecucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EjecucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EjecucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
