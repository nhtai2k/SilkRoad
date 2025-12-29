import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBomPropertyComponent } from './add-bom-property.component';

describe('AddBomPropertyComponent', () => {
  let component: AddBomPropertyComponent;
  let fixture: ComponentFixture<AddBomPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBomPropertyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBomPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
