import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishGroupComponent } from './dish-group.component';

describe('DishGroupComponent', () => {
  let component: DishGroupComponent;
  let fixture: ComponentFixture<DishGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
