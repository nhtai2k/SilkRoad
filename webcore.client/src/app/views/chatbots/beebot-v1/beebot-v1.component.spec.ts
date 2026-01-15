import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeebotV1Component } from './beebot-v1.component';

describe('BeebotV1Component', () => {
  let component: BeebotV1Component;
  let fixture: ComponentFixture<BeebotV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeebotV1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeebotV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
