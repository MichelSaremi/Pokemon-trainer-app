import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Login} from '../models/login.model'
import { Observable} from 'rxjs';

@Injectable({
providedIn: 'root'
})

export class LoginService{
  private user: Login[] = [];
  public testUser = {}

  loggedIn = false;

  private error: string = "";

  apiURL = "https://noroff-trivia-api.herokuapp.com";
  apiKEY = "1b23229d-18ca-48ec-bdeb-9c7445384f23";
  status: string | undefined;

  constructor(public readonly http: HttpClient){
  }

  public queryUser(username:string): Observable<Login[]> {
    return this.http.get<Login[]>(`${this.apiURL}/trainers?username=${username}`)
  }

  public setUserToApi(username:string): Observable<Login[]> {
    const headers = { 'X-API-Key': this.apiKEY, 'Content-Type': 'application/json' };
    const body = {username: username, pokemon: []};
    let data = this.http.post<Login[]>(`${this.apiURL}/trainers?username=${username}`, JSON.stringify(body), {'headers':headers})
    return data
  }


  public deleteSelectedUserPokemon(pokemon:string[], id:string): void {
    console.log("ok dude")
    const headers = { 'X-API-Key': this.apiKEY, 'Content-Type': 'application/json' };
    const body = {pokemon: pokemon};

    this.http.patch<Login[]>(`${this.apiURL}/trainers/${id}`, JSON.stringify(body), {'headers':headers}).subscribe({
      next: data => {
        sessionStorage.getItem("pokemons") || '{}'
        let user = JSON.parse(sessionStorage.getItem('current-user' ) || '{}');
        user = data
        sessionStorage.setItem("current-user", JSON.stringify([user]));
      },
      error: error => {
          this.error = error.message;
          console.error('There was an error!', error);
      }
  })
  }

  public isLoggedIn(){
      return this.isLoggedIn;
  }


  public getUser(): Login[]{
    return this.user
  }


}
