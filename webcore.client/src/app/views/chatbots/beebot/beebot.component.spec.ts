import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeebotComponent } from './beebot.component';

describe('BeebotComponent', () => {
  let component: BeebotComponent;
  let fixture: ComponentFixture<BeebotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeebotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeebotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
