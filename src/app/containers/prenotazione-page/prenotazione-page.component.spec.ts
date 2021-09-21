import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenotazionePageComponent } from './prenotazione-page.component';

describe('PrenotazionePageComponent', () => {
  let component: PrenotazionePageComponent;
  let fixture: ComponentFixture<PrenotazionePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrenotazionePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrenotazionePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
