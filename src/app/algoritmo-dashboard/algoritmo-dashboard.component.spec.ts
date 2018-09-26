import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoritmoDashboardComponent } from './algoritmo-dashboard.component';

describe('AlgoritmoDashboardComponent', () => {
  let component: AlgoritmoDashboardComponent;
  let fixture: ComponentFixture<AlgoritmoDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgoritmoDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoritmoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
