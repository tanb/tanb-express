import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HujsonEditorComponent } from './hujson-editor.component';

describe('HujsonEditorComponent', () => {
  let component: HujsonEditorComponent;
  let fixture: ComponentFixture<HujsonEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HujsonEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HujsonEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
