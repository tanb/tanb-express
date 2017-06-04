import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TanbComponent } from './tanb.component';

describe('TanbComponent', () => {
  let component: TanbComponent;
  let fixture: ComponentFixture<TanbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TanbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TanbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
