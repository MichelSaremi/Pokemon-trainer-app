import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { PokeAPIService, Pokemon } from 'src/app/services/pokeapi.service';
import { CatalogueService } from 'src/app/services/catalogue.service';
@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.component.html',
  styleUrls: ['./trainer-page.component.css']
})
export class TrainerPageComponent implements OnInit {
  title: string = "Trainer";
  username: string = "";
  user_id: string = "";
  user_pokemons: string[] = [];
  //default_pokemons: string[] = [];
  url=''
  pokemons: Array<Pokemon>|any = [];
  pokemonsID: string[]|any = [];
  Avatars: any= []
  constructor(private loginService:LoginService, private readonly pokemonService:PokeAPIService, private readonly catalogueService:CatalogueService, private router: Router) {}

  //---load user data and pokemons from sessionstorage 
  ngOnInit(): void {
    if(sessionStorage.getItem('current-user') != null){
      let current_user = JSON.parse(sessionStorage.getItem('current-user') || '{}');
      this.username = current_user[0].username
      this.user_id = current_user[0].id
      this.user_pokemons = JSON.parse(sessionStorage.getItem("user-pokelist") || '{}')
      this.pokemons = JSON.parse(sessionStorage.getItem("pokemons") || '{}')
    }
   
    //---extract id's
    this.pokemonsID = JSON.parse(sessionStorage.getItem("pokemonsID")|| '{}')

    //---extract id and generate image url's
    for(let name of this.user_pokemons){
      for(let pokemon of this.pokemons){
        let name2 = pokemon.name 
        if(name==name2){
          let index = this.pokemons.indexOf(pokemon)
          let id = this.pokemonsID[index]
          this.Avatars.push(this.pokemonService.getAvatars(id))
          }
        }
      }     
    }
    onNavigate(){
      this.router.navigateByUrl('/catalogue');
    }
}  