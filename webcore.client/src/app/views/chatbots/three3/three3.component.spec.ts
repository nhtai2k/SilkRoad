import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Three3Component } from './three3.component';

describe('Three3Component', () => {
  let component: Three3Component;
  let fixture: ComponentFixture<Three3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Three3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Three3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
