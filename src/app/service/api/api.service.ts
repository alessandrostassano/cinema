import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../model/User';
import { Cinema } from '../../model/Cinema';
import { Film } from '../../model/Film';
import { Biglietto } from '../../model/Biglietto';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http: HttpClient) { }


  async fetchCinema(){
    const response = await fetch('http://localhost:8081/cinema');
    return response.json();
  }

  async fetchFilm(){
    const response = await fetch('http://localhost:8081/film');
    return response.json();
  }

  async fetchBiglietti(user:User){
    const url = 'http://localhost:8081/biglietto/visualizza'
    const body =  JSON.stringify(user);
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.post( url, body, {headers: headers, responseType: 'json'})
      .pipe(
        // map (data => data) da inserire gestione errori
      );
  }


  async addUser(user:User){
    console.log("add: "+user);
    
    return fetch('http://localhost:8081/cliente/add',{
    method : 'POST',
    headers:{
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body: JSON.stringify(user)
    });
  }



  async addCinema(cinema:Cinema){
    return fetch('http://localhost:8081/cinema',{
    method : 'POST',
    headers:{
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body: JSON.stringify(cinema)
    });
  }


  async addFilm(film:Film){
    return fetch('http://localhost:8081/film/add',{
    method : 'POST',
    headers:{
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body: JSON.stringify(film)
    });
  }


  async addBiglietto(biglietto:Biglietto){
    console.log("add: "+biglietto);
    
    return fetch('http://localhost:8081/biglietto/add',{
    method : 'POST',
    headers:{
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body: JSON.stringify(biglietto)
    });
  }

}
