import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Biglietto } from 'src/app/model/Biglietto';
import { Cinema } from 'src/app/model/Cinema';
import { Film } from 'src/app/model/Film';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-form-prenotazione',
  templateUrl: './form-prenotazione.component.html',
  styleUrls: ['./form-prenotazione.component.css']
})
export class FormPrenotazioneComponent implements OnInit {

  formBiglietto:FormGroup;
  biglietto!:Biglietto;
  user:User;
  selectedFilm!:Film;

  @Input() film!:Film[]
  @Output() onSubmit: EventEmitter<Biglietto> = new EventEmitter<Biglietto>();
  @Output() onSubmitUser: EventEmitter<User> = new EventEmitter<User>();

  constructor(private formBuilder:FormBuilder) {
    this.formBiglietto = this.formBuilder.group({
      film: ['',Validators.required],
      data: ['',Validators.required],
      ora: ['15',Validators.required],
      pagamento: ['',Validators.required],
      quantita: ['1',Validators.required],
      data_inizio:[''],
      data_fine:['']
      

    }
    ,{validator:this.checkData('data','data_inizio','data_fine')}
    );

    this.user = JSON.parse(sessionStorage.getItem('localUser') || '{}') as User;
    
    


    

   }

  ngOnInit(): void {
  }


  handleSubmitPrenotazione(){
    let film = new Film;
    //let user = new User;

    this.biglietto = new Biglietto();
    this.biglietto.cod_operazione = this.generateCode();
    this.biglietto.data = this.formBiglietto.get('data')?.value;
    this.biglietto.ora_proiezione = this.formBiglietto.get('ora')?.value;
    this.biglietto.quantita = this.formBiglietto.get('quantita')?.value;
    this.biglietto.tipo_pagamento = this.formBiglietto.get('pagamento')?.value;

    //user = JSON.parse(sessionStorage.getItem('localUser') || '{}') as User;
    this.biglietto.cod_visitatore = this.user;

    film.cod_film = this.formBiglietto.get('film')?.value;
    this.biglietto.cod_film = film;

    this.formBiglietto.reset();
    this.onSubmit.emit(this.biglietto);

  } 

  handleSubmitBiglietti(){
    this.onSubmitUser.emit(this.user);
  }

  generateCode() {
    return Math.random() * (9999 - 1000) + 1000;
  }

  onSelection(){
    let film = new Film;
    let today = new Date().toISOString().slice(0, 10);
    film.cod_film = this.formBiglietto.get('film')?.value;
    for(let i=0; i<this.film.length; i++){
      if(film.cod_film.match(this.film[i].cod_film)){
        film = this.film[i];
      }
    }
    this.selectedFilm = film;
    console.log("FILM: ",this.selectedFilm)
    console.log("FORM: ",this.formBiglietto)
    this.formBiglietto.setValue({
      film:this.formBiglietto.get('film')?.value,
      //data:this.formBiglietto.get('data')?.value,
      data:today,
      ora:this.formBiglietto.get('ora')?.value,
      pagamento:this.formBiglietto.get('pagamento')?.value,
      quantita:this.formBiglietto.get('quantita')?.value,
      data_inizio:film.data_inizio,
      data_fine:film.data_fine
    })
    //this.checkData(this.formBiglietto.get('data')?.value)
  }

  checkData(data:string, data_inizio:string, data_fine:string){
    return (group: FormGroup): {[key: string]: any} => {
      let data_attiva = group.controls[data];
      let d_inizio = group.controls[data_inizio];
      let d_fine = group.controls[data_fine];
      if (data_attiva.value > d_fine.value) {
        return {
          dates: "NON IN PROGRAMMA PER QUESTA DATA"
        };
      }
      else if(data_attiva.value<d_inizio.value){
        return {
          dates: "NON IN PROGRAMMA PER QUESTA DATA"
        };
      }
      
      return {};
    }
  }

}
