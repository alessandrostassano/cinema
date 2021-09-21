import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/User';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  constructor(private api:ApiService){

  }

  ngOnInit(): void{
    
  }

  async handleSubmit(user:User){
    
    await this.api.addUser(user);
    
    
  }
}
