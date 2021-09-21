import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Biglietto } from 'src/app/model/Biglietto';
import { Film } from 'src/app/model/Film';
import { User } from 'src/app/model/User';
import { ApiService } from 'src/app/service/api/api.service';
import { DataService } from 'src/app/service/data/data.service';

@Component({
  selector: 'app-prenotazione-page',
  templateUrl: './prenotazione-page.component.html',
  styleUrls: ['./prenotazione-page.component.css']
})
export class PrenotazionePageComponent implements OnInit {

  film:Film[]=[];
  biglietti:Biglietto[]=[];

  constructor(private api:ApiService,private toastr:ToastrService,private data:DataService,private router:Router) { }

  async ngOnInit() {
    this.film = await this.api.fetchFilm();
  }


  async handleSubmit(biglietto:Biglietto){
    this.toastr.success('Prenotazione eseguita con successo!', 'Success');
    this.api.addBiglietto(biglietto);
  }

  async handleSubmitUser(user:User){
    (await this.api.fetchBiglietti(user)).subscribe(
      (result:any)=>{
        if(!!result){
          console.log("result: " ,result);
          //sessionStorage.setItem('localBiglietti', JSON.stringify(result));
          //this.data.saveData(result);
          this.biglietti = result;
          //console.log("SAVE:  ",this.data.getData())
          this.router.navigate(['/visualizza'], {state:{data:this.biglietti}})

        }
      }
    );
  }

}
