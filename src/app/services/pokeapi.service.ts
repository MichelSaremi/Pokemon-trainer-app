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

  //---get pokemons and push to array
  constructor(private http: HttpClient) {
    this.getListOfPokemonUrls().subscribe(
      (results: Array<Pokemon>) => {
        for(let p of results) {
          this.pokemons.push(p)
        }
      }
    )
  }
  //---get list of pokemons
  public get_pokemons(): Array<Pokemon> {
    return this.pokemons
  }


  //---get list of pokemons URLS
  public getListOfPokemonUrls(): Observable<Array<Pokemon>> {

    return this.http.get<any>(POKEAPI_URL)
      .pipe(
        map((response: PokeAPIResponse) => 
        response.results
        )
      );
  }
  public getAvatars(index: string){
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`

  }
  public removeAPIUpdate(username: string, userID: number|string, pokemonRemove: string) {
    
    //---fetch user list
    let user_pokemons = JSON.parse(sessionStorage.getItem("user-pokelist") || '{}')
    
    //---remove pokemon from list
    console.log("pokemon clicked")
    console.log(pokemonRemove)
    let index = user_pokemons.indexOf(pokemonRemove, 0)
    user_pokemons.splice(index,1); 
    console.log("upokemons after delete")
    console.log(user_pokemons)  
      
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
