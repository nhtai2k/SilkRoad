import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTypeComponent } from './material-group.component';

describe('MaterialTypeComponent', () => {
  let component: MaterialTypeComponent;
  let fixture: ComponentFixture<MaterialTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
