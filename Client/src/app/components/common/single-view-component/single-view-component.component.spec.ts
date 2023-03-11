import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleViewComponentComponent } from './single-view-component.component';

describe('SingleViewComponentComponent', () => {
  let component: SingleViewComponentComponent;
  let fixture: ComponentFixture<SingleViewComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleViewComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleViewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
