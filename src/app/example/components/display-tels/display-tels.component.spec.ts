import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DisplayTelsComponent } from "./display-tels.component";

describe("DisplayTelsComponent", () => {
  let component: DisplayTelsComponent;
  let fixture: ComponentFixture<DisplayTelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayTelsComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DisplayTelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
