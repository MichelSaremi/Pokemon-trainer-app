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

  // @Input() Avatar?: Avatar;
  // @Output() complete: EventEmitter<number> = new EventEmitter();
  title: string = "Catalogue";
  username: string = "Set user here";
  userId: number|string = '';
  public users: Login[] | undefined;
  
  url = ''
  pokemons: string[] | any = [];
  pokemonsID: string[] | any = [];
  Avatars:  any = []


  constructor(private readonly loginService: LoginService, private readonly pokemonService: PokeAPIService, private readonly catalogueService: CatalogueService, private router: Router) { }


  ngOnInit(): void {

    //---If user exists -> load user
    if(sessionStorage.getItem('current-user') != null){
      let current_user = JSON.parse(sessionStorage.getItem('current-user') || '{}');
      this.username = current_user[0].username
      this.userId = current_user[0].id
      console.log(this.userId)
    }

    //---If pokemons loaded into local storage -> retreive
    if (sessionStorage.getItem('pokemons') != null) {
      const pokemons: { name: string, url: string }[] | string | null = sessionStorage.getItem('pokemons')
      this.pokemons = pokemons
      this.pokemons = JSON.parse(this.pokemons)

      //--- extract id's from pokemon url's
      for (let id of this.pokemons) {
         let id2 = (id.url.toString().split('/',7))[6]
         this.pokemonsID.push(id2)

      }
      //--- put all id's in local storage
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

  //---when picking pokemon from dropdown-list display repctive image
  onChange(){
    let i = $("select[name='select'] option:selected").index();
    this.url = this.Avatars[i];
  }

  //---when choose button pushed update user pokemon at API and set at sessionstorage 
  onChooseButton() {
    
    let i = $("select[name='select'] option:selected").index();
    
    this.catalogueService.userAPIUpdate(this.username,this.userId, this.pokemons[i].name)
  }
  
  onNavigate(){
    this.router.navigateByUrl('/trainer');
  }
}//npm i --save-dev @types/jquery
