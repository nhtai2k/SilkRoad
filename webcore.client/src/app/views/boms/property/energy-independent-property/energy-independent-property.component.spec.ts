import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyIndependentPropertyComponent } from './energy-independent-property.component';

describe('EnergyIndependentPropertyComponent', () => {
  let component: EnergyIndependentPropertyComponent;
  let fixture: ComponentFixture<EnergyIndependentPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnergyIndependentPropertyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergyIndependentPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
