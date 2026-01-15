import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Three4Component } from './three4.component';

describe('Three4Component', () => {
  let component: Three4Component;
  let fixture: ComponentFixture<Three4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Three4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Three4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
