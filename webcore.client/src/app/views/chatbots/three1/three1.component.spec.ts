import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Three1Component } from './three1.component';

describe('Three1Component', () => {
  let component: Three1Component;
  let fixture: ComponentFixture<Three1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Three1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Three1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
