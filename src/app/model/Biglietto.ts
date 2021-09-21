import { Film } from "./Film";
import { User } from "./User";

export class Biglietto{

    cod_operazione!:number;
    cod_visitatore!:User;

    ora_proiezione!:number;
    data!:string;
    tipo_pagamento!:string;
    quantita!:number;

    cod_film!:Film;

}
