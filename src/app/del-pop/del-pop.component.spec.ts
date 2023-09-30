import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelPopComponent } from './del-pop.component';

describe('DelPopComponent', () => {
  let component: DelPopComponent;
  let fixture: ComponentFixture<DelPopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DelPopComponent]
    });
    fixture = TestBed.createComponent(DelPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
