import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon?limit=1118'

export interface Pokemon {
  name: string,
  url: string,
}

interface PokeAPIResponse {
  count: number,
  next: string,
  previous: string,
  results: Array<Pokemon>
}

@Injectable({providedIn: 'root'})
export class PokeAPIService {
  private pokemons: Array<Pokemon> = []
  apiURL = 'https://ms-oh-trivia-api.herokuapp.com'
  apiKey = 'hezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge'

  constructor(private http: HttpClient) {
  }

  //---get list of pokemons, each has name and url
  public getListOfPokemons(): Observable<Array<Pokemon>> {

    return this.http.get<any>(POKEAPI_URL)
      .pipe(
        map((response: PokeAPIResponse) => 
        response.results
        )
      );
  }
  //---used to gererate Aavatar image url
  public getAvatars(index: string){
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`

  }
  //---remove pokemon from API
  public removeAPIUpdate(username: string, userID: number|string, pokemonRemove: string) {
    
    //---fetch user list
    let user_pokemons = JSON.parse(sessionStorage.getItem("user-pokelist") || '{}')
    
    //---remove pokemon from list
    let index = user_pokemons.indexOf(pokemonRemove, 0)
    user_pokemons.splice(index,1); 
     
      
        //---replace user API list with local list
        const url = `${this.apiURL}/trainers/${userID}`;
        const headers = {
                    'X-API-Key': this.apiKey,
                    'Content-Type': 'application/json'
        }
        const body = {
	        pokemon: user_pokemons
        }
        this.http.patch(url, body, {headers} )
	    .subscribe((response) => console.log("response:", response))        
        
        //---update session storage with user pokemons
        sessionStorage.setItem("user-pokelist",JSON.stringify(user_pokemons))    
         
  }
  
}
