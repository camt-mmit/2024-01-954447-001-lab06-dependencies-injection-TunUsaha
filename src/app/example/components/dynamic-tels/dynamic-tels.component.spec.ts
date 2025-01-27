import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DynamicTelsComponent } from "./dynamic-tels.component";

describe("DynamicTelsComponent", () => {
  let component: DynamicTelsComponent;
  let fixture: ComponentFixture<DynamicTelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicTelsComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DynamicTelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
