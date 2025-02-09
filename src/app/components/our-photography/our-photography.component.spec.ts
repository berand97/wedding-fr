import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurPhotographyComponent } from './our-photography.component';

describe('OurPhotographyComponent', () => {
  let component: OurPhotographyComponent;
  let fixture: ComponentFixture<OurPhotographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurPhotographyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurPhotographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
