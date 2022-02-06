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
  default_pokemons: string[] = [];

  url=''
  pokemons: Array<Pokemon>|null|string|undefined|string[]|any = [];
  pokemonsID: Array<Pokemon>|null|string|undefined|string[]|any = [];
  Avatars: Array<ImageBitmap>|any|null|undefined|((error: any) => void) = []

  constructor(private loginService:LoginService, private readonly pokemonService:PokeAPIService, private readonly catalogueService:CatalogueService, private router: Router) {}

  //35
  ngOnInit(): void {
    if(sessionStorage.getItem('current-user') != null){
      let current_user = JSON.parse(sessionStorage.getItem('current-user') || '{}');
      this.username = current_user[0].username
      this.user_id = current_user[0].id
      this.user_pokemons = current_user[0].pokemon.toString().split(',')
      //console.log(this.user_pokemons)
      this.pokemons = JSON.parse(localStorage.getItem("pokemons") || '{}')
    }
    console.log(this.user_id)
     //this.pokemons = JSON.parse(pokemons)
    //console.log(this.pokemons[0].name)

    // this.pokemonsID = JSON.parse(sessionStorage.getItem('pokemonsID') || '{}')
    //console.log(this.pokemons)
    // for(let i = 0; i<this.pokemonsID.length; i++){
    //   console.log(this.pokemonsID[i]) 
    // }
    for(let id of this.pokemons){
      //console.log(id.url)
       let id2 = (id.url.toString().split('/',7))[6]
      // console.log((id.url.toString().split('/',7))[6])
       this.pokemonsID.push(id2)
    }
      
  

    for(let name of this.user_pokemons){
      for(let pokemon of this.pokemons){
        let name2 = pokemon.name 
        //console.log(name)
        //console.log(name2)
        if(name==name2){
          let index = this.pokemons.indexOf(pokemon)
          let id = this.pokemonsID[index] 
      //  console.log(index)
      //  console.log
          this.Avatars.push(this.pokemonService.getAvatars(id))
          }
        }
      }     
      for (let i=0; i<this.Avatars.length; i++){
        console.log(this.Avatars[i])
      }
    }  
  

  onPokemonDelete(){
    console.log("make maginc")
  }

  onNavigate(){
    this.router.navigateByUrl('/catalogue');
  }

}
