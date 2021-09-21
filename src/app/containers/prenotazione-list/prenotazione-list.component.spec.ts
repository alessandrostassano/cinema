import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenotazioneListComponent } from './prenotazione-list.component';

describe('PrenotazioneListComponent', () => {
  let component: PrenotazioneListComponent;
  let fixture: ComponentFixture<PrenotazioneListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrenotazioneListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrenotazioneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
