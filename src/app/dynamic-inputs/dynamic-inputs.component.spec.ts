import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicInputsComponent } from './dynamic-inputs.component';

describe('DynamicInputsComponent', () => {
  let component: DynamicInputsComponent;
  let fixture: ComponentFixture<DynamicInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicInputsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
