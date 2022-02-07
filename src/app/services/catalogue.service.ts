import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Login} from '../models/login.model'


export interface Pokemon {
    name: string,
}

@Injectable({
providedIn: 'root'
})

export class CatalogueService{

  public users: Login[] | undefined;
  apiURL = "https://noroff-trivia-api.herokuapp.com";
  apiKey = "1b23229d-18ca-48ec-bdeb-9c7445384f23";
  userId: string|number = ''; 
  constructor(public readonly http: HttpClient){
  }


public userAPIUpdate(username: string, userID: number|string, pokemonAdd: string) {
    
    //---empty pokelist
    let pokelist: string[] =[];
    for (let i=0; i<pokelist.length; i++){
        pokelist.pop()
    }

    //---get the pokemon list of user
    this.http.get(`${this.apiURL}/trainers?username=${username}`)
    .subscribe(
    (results: any )=> {
        
        //this.userId = results[0].id
        console.log("user id")
        console.log(this.userId)
        //---if doesnt exist ad user choise to list
        if(results[0].pokemon.length == 0){
            pokelist.push(pokemonAdd)

        }else{
            //---else add userlist to local list
            for(let p of results[0].pokemon) {
                pokelist.push(p)
            }

            //---check if userlist already has choise
            if (pokelist.includes(pokemonAdd)){
                console.log("allready have pokemon")
            //---if not add choice to local list
            }else{
                pokelist.push(pokemonAdd)  
            }
            console.log("Pased to API")
            console.log(pokelist) 
        }      
        //---replace user API list with local list
        const url = `${this.apiURL}/trainers/${userID}`;
        const headers = {
                    'X-API-Key': this.apiKey,
                    'Content-Type': 'application/json'
        }
        const body = {
	        pokemon: pokelist
        }
        this.http.patch(url, body, {headers} )
	    .subscribe((response) => console.log("response:", response))        
        
        // fetch(`${this.apiURL}/trainers/${userID}`, {
        //         method: 'PATCH', // NB: Set method to PATCH
        //         headers: {
        //             'X-API-Key': this.apiKey,
        //           'Content-Type': 'application/json'
        //         },  
        //         body: JSON.stringify({
        //             pokemon: pokelist
        //         }) 
        // })
        //---update session storage with user pokemons
        sessionStorage.setItem("user-pokelist",JSON.stringify(pokelist))    
    })     
}
}