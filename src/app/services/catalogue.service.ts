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
  apiURL = 'https://ms-oh-trivia-api.herokuapp.com'
  apiKey = 'hezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge'
  userId: string|number = ''; 
  constructor(public readonly http: HttpClient){
  }

//---update user pokemon list
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
                console.log("you allready have pokemon")
            //---if not add choice to local list
            }else{
                pokelist.push(pokemonAdd)  
            }
            
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
        
        //---update session storage with user pokemons
        sessionStorage.setItem("user-pokelist",JSON.stringify(pokelist))    
    }) 
}
    //---fetch user pokelist
    public getUserPokeList(username: string){
    let pokelist: string[] =[];

    this.http.get(`${this.apiURL}/trainers?username=${username}`)
    .subscribe(
    (results: any )=> {

        for(let p of results[0].pokemon) {
            pokelist.push(p)
        }
        //---update session storage with user pokemons
        sessionStorage.setItem("user-pokelist",JSON.stringify(pokelist))

        for(let i=0; i<results[0].pokemon.length; i++) {
            pokelist.pop()
        }        
    })   
    }   
}