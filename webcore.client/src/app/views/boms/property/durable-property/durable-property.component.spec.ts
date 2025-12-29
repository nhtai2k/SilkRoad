import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DurablePropertyComponent } from './durable-property.component';

describe('DurablePropertyComponent', () => {
  let component: DurablePropertyComponent;
  let fixture: ComponentFixture<DurablePropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DurablePropertyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DurablePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
