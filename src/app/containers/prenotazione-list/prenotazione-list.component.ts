import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Biglietto } from 'src/app/model/Biglietto';
import { Film } from 'src/app/model/Film';
import { User } from 'src/app/model/User';
import { ApiService } from 'src/app/service/api/api.service';
import { DataService } from 'src/app/service/data/data.service';

@Component({
  selector: 'app-prenotazione-list',
  templateUrl: './prenotazione-list.component.html',
  styleUrls: ['./prenotazione-list.component.css']
})
export class PrenotazioneListComponent implements OnInit {

  biglietti:Biglietto[]=[];
  film:Film[]=[];


  constructor(private api:ApiService,private toastr:ToastrService) {
    //console.log("PO: ",this.data.getData())
    

   }

   displayedColumns: string[] = ['position', 'cod_film', 'data', 'ora', 'quantita','tipo_pagamento','totale'];
   dataSource : any
   
   
   

  async ngOnInit() {
    this.biglietti = history.state.data;
    this.dataSource = this.generateData(this.biglietti);
    this.film = await this.api.fetchFilm();
    
    //this.biglietti = JSON.parse(sessionStorage.getItem('localBiglietto') || '{}' ) as Biglietto[];
    console.log("DIO: ",this.biglietti);

  }

  generateData(biglietti:Biglietto[]){
    const data:Data[]=[];
    console.log("BIGLIETTO:  ",biglietti)
    for(let i=0; i<biglietti.length; i++){
      data.push(
        {position:i+1, cod_film:biglietti[i].cod_film.titolo, data:this.dataIta(biglietti[i].data), ora:biglietti[i].ora_proiezione, quantita:biglietti[i].quantita, tipo_pagamento:biglietti[i].tipo_pagamento, totale:this.calcoloTot(biglietti[i].quantita,biglietti[i].cod_film.prezzo)}
        )
    }
    console.log("DATA:  ",data)
    return data;
  }


    dataIta(data:string){
      
      if(data.includes("-")){

        let data_split=[];
        data_split = data.split("-");
        console.log("data: ",data_split)
        let data_ita = data_split[2]+"/"+data_split[1]+"/"+data_split[0];
        return data_ita;
      
      }

      else{
        return data;
      }
      
  }


  calcoloTot(qta:number,prezzo:number){
    let tot:number
    tot = qta*prezzo
    return (Math.round(tot*100)/100).toPrecision(4);
  }

}
