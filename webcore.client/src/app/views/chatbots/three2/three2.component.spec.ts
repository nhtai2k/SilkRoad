import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Three2Component } from './three2.component';

describe('Three2Component', () => {
  let component: Three2Component;
  let fixture: ComponentFixture<Three2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Three2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Three2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
