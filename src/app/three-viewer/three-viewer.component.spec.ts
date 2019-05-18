import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeViewerComponent } from './three-viewer.component';

describe('ThreeViewerComponent', () => {
  let component: ThreeViewerComponent;
  let fixture: ComponentFixture<ThreeViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
