import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalComponent } from './technical.component';

describe('TechnicalComponent', () => {
  let component: TechnicalComponent;
  let fixture: ComponentFixture<TechnicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
