import { Injectable } from '@angular/core';
import { Biglietto } from 'src/app/model/Biglietto';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data_biglietti:Biglietto[] = []
  current_data = this.data_biglietti

  constructor() { }


  getData(){
    return this.data_biglietti;
  }

  saveData(biglietti:Biglietto[]){
    this.data_biglietti = biglietti;
  }
}
