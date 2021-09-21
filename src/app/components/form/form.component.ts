import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form:FormGroup;
  user!:User;

  @Output() onSubmit: EventEmitter<User> = new EventEmitter<User>();

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nome: ['',Validators.required],
      cognome: ['',Validators.required],
      telefono: ['',Validators.required],
      email: ['',Validators.required],
      login: ['',Validators.required],
      psw: ['',Validators.required]

    });
   }

  ngOnInit(): void {
  }


  handleSubmit(){

    

    this.user = new User();
    this.user.cod_visitatore = this.generateCod();
    this.user.nome = (this.form.get('nome')?.value);
    this.user.cognome = (this.form.get('cognome')?.value);
    this.user.telefono = (this.form.get('telefono')?.value);
    this.user.email = (this.form.get('email')?.value);
    this.user.login = (this.form.get('login')?.value);
    this.user.psw = (this.form.get('psw')?.value);

    this.form.reset();
    this.onSubmit.emit(this.user);

    console.log(this.user);

  
   
  }

  generateCod(){
    let cod:string='';
    let sChrs = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    for (var i = 0; i < 4; i++) {
      var randomPoz = Math.floor(Math.random() * sChrs.length);
      cod += sChrs.substring(randomPoz, randomPoz + 1);
    }
    return cod;
  }

}
