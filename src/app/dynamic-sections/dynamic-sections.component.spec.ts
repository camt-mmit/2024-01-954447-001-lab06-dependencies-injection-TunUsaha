import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicSectionsComponent } from './dynamic-sections.component';

describe('DynamicSectionsComponent', () => {
  let component: DynamicSectionsComponent;
  let fixture: ComponentFixture<DynamicSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicSectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
