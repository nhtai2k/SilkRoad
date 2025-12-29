import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BomConfigurationComponent } from './bom-configuration.component';

describe('BomConfigurationComponent', () => {
  let component: BomConfigurationComponent;
  let fixture: ComponentFixture<BomConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BomConfigurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BomConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
