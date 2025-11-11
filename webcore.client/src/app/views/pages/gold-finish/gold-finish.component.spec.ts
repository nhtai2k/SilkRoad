import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldFinishComponent } from './gold-finish.component';

describe('GoldFinishComponent', () => {
  let component: GoldFinishComponent;
  let fixture: ComponentFixture<GoldFinishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoldFinishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoldFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
