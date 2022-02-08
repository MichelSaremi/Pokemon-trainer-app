import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery'

import { PokeAPIService, Pokemon } from 'src/app/services/pokeapi.service';
import { LoginService } from 'src/app/services/login.service';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { __values } from 'tslib';
import { Login } from 'src/app/models/login.model';


@Component({
  selector: 'app-catalogue-page',
  templateUrl: './catalogue-page.component.html',
  styleUrls: ['./catalogue-page.component.css']
})
export class CataloguePageComponent implements OnInit {

  username: string = "Set user here";
  userId: number|string = '';
  public users: Login[] | undefined;
  user_pokemons: string[] | undefined;
  
  url = ''
  chooseimg = ''
  pokemons: string[] | any = [];
  pokemons_names: string[] = [];
  pokemonsID: string[] | any = [];
  Avatars:  any = [];
  choosen: string = '';

  constructor(private readonly loginService: LoginService, private readonly pokemonService: PokeAPIService, private readonly catalogueService: CatalogueService, private router: Router) { }


  ngOnInit(): void {


    //---If user exists -> load user
    if(localStorage.getItem('current-user') != null){
      let current_user = JSON.parse(localStorage.getItem('current-user') || '{}');
      this.username = current_user[0].username
      this.userId = current_user[0].id
      console.log(this.userId)
    }

    //---If pokemons loaded into session storage -> retreive
    if (sessionStorage.getItem('pokemons') != null) {
      const pokemons: { name: string, url: string }[] | string | null = sessionStorage.getItem('pokemons')
      this.pokemons = pokemons
      this.pokemons = JSON.parse(this.pokemons)

      //---retreive pokemons names
      //---have list start with placeholder
      this.pokemons_names.push("Choose a pokemon")
      for (let pokemon of this.pokemons){
              this.pokemons_names.push(pokemon.name)
      }

      //--- extract id's from pokemon url's
      for (let id of this.pokemons) {
         let id2 = (id.url.toString().split('/',7))[6]
         this.pokemonsID.push(id2)

      }

      //--- put all id's in storage
      sessionStorage.setItem("pokemonsID", JSON.stringify(this.pokemonsID))

      //--- Generate urls for each avatar image 
      for(let id of this.pokemonsID){

         this.Avatars.push(this.pokemonService.getAvatars(id))
      }


    } else {
      console.log("no pokemons")
    }
  }
  //---clear all on logout
  onLogout(){
    localStorage.clear()
    sessionStorage.clear()
    this.router.navigateByUrl('/login');
  }

  //---when picking pokemon from dropdown-list display repective image
  onChange(){
    let i = $("select[name='select'] option:selected").index();
    this.url = this.Avatars[i-1];
  }

  //---when choose button pushed update user pokemon at API and set at sessionstorage 
  onChooseButton() {
    this.user_pokemons = JSON.parse(sessionStorage.getItem("user-pokelist") || '{}')
    
    let i = $("select[name='select'] option:selected").index();

    this.catalogueService.userAPIUpdate(this.username,this.userId, this.pokemons[i-1].name)
    
    //---Text appears depending on if you have pokemon or not
    if (this.user_pokemons?.includes(this.pokemons_names[i])){
      this.choosen="You have allready collected this pokemon"
      this.chooseimg='/assets/images/pokeball.png'
    }else{
      this.choosen= "you have collected "+this.pokemons[i-1].name
      this.chooseimg=''
    }

    
  }
  //---take you to trainer
  onNavigate(){
    this.router.navigateByUrl('/trainer');
  }
  //---reload catalogue page
  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/catalogue']);
}
}
