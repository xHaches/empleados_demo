import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmMessageComponent } from './dialog-confirm-message.component';

describe('DialogConfirmMessageComponent', () => {
  let component: DialogConfirmMessageComponent;
  let fixture: ComponentFixture<DialogConfirmMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfirmMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogConfirmMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
