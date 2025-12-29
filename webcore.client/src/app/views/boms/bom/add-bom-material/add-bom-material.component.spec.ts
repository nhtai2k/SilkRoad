import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBomMaterialComponent } from './add-bom-material.component';

describe('AddBomMaterialComponent', () => {
  let component: AddBomMaterialComponent;
  let fixture: ComponentFixture<AddBomMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBomMaterialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBomMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
