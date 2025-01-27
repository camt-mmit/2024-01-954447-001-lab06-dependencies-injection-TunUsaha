import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ExampleUpdatePageComponent } from "./example-update-page.component";

describe("ExampleUpdatePageComponent", () => {
  let component: ExampleUpdatePageComponent;
  let fixture: ComponentFixture<ExampleUpdatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleUpdatePageComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExampleUpdatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
