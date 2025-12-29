import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyConsumablePropertyComponent } from './energy-consumable-property.component';

describe('EnergyConsumablePropertyComponent', () => {
  let component: EnergyConsumablePropertyComponent;
  let fixture: ComponentFixture<EnergyConsumablePropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnergyConsumablePropertyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergyConsumablePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
