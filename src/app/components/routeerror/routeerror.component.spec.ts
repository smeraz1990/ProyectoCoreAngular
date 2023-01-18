import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteerrorComponent } from './routeerror.component';

describe('RouteerrorComponent', () => {
  let component: RouteerrorComponent;
  let fixture: ComponentFixture<RouteerrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteerrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteerrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
