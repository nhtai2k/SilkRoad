import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeebotV2Component } from './beebot-v2.component';

describe('BeebotV2Component', () => {
  let component: BeebotV2Component;
  let fixture: ComponentFixture<BeebotV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeebotV2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeebotV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
