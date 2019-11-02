import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGuideComponent } from './view-guide.component';

describe('GuideComponent', () => {
  let component: ViewGuideComponent;
  let fixture: ComponentFixture<ViewGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
