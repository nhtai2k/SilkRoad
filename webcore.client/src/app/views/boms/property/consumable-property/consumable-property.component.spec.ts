import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumablePropertyComponent } from './consumable-property.component';

describe('ConsumablePropertyComponent', () => {
  let component: ConsumablePropertyComponent;
  let fixture: ComponentFixture<ConsumablePropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumablePropertyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumablePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
