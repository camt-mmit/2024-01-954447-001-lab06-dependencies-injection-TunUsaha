import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DynamicContactsComponent } from "./dynamic-contacts.component";

describe("DynamicContactsComponent", () => {
  let component: DynamicContactsComponent;
  let fixture: ComponentFixture<DynamicContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicContactsComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DynamicContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
