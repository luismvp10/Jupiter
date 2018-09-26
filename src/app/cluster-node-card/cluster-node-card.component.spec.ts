import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterNodeCardComponent } from './cluster-node-card.component';

describe('ClusterNodeCardComponent', () => {
  let component: ClusterNodeCardComponent;
  let fixture: ComponentFixture<ClusterNodeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterNodeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterNodeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
