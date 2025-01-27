import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ExampleDisplayPageComponent } from "./example-display-page.component";

describe("ExampleDisplayPageComponent", () => {
  let component: ExampleDisplayPageComponent;
  let fixture: ComponentFixture<ExampleDisplayPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleDisplayPageComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExampleDisplayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
