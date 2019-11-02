import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGuideComponent } from './create-guide.component';

describe('CreateGuideComponent', () => {
  let component: CreateGuideComponent;
  let fixture: ComponentFixture<CreateGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
