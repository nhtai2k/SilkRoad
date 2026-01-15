import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Three5Component } from './three5.component';

describe('Three5Component', () => {
  let component: Three5Component;
  let fixture: ComponentFixture<Three5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Three5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Three5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
