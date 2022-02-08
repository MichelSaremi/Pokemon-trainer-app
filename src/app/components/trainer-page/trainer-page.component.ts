import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { PokeAPIService, Pokemon } from 'src/app/services/pokeapi.service';
import { CatalogueService } from 'src/app/services/catalogue.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.component.html',
  styleUrls: ['./trainer-page.component.css']
})
export class TrainerPageComponent implements OnInit {
 
  username: string = "";
  user_id: string = "";
  user_pokemons: string[] = [];

  url=''
  pokemons: Array<Pokemon>|any = [];
  pokemonsID: string[]|any = [];
  Avatars: any= []
  constructor(private loginService:LoginService, private readonly pokemonService:PokeAPIService, private readonly catalogueService:CatalogueService, private router: Router) {}

  //---load user data and pokemons  
  ngOnInit(): void {
    if(localStorage.getItem('current-user') != null){
      let current_user = JSON.parse(localStorage.getItem('current-user') || '{}');
      this.username = current_user[0].username
      this.user_id = current_user[0].id

      this.user_pokemons = JSON.parse(sessionStorage.getItem("user-pokelist") || '{}')
      console.log(this.user_pokemons)
      this.pokemons = JSON.parse(sessionStorage.getItem("pokemons") || '{}')
    }
   
    //---extract id's
    this.pokemonsID = JSON.parse(sessionStorage.getItem("pokemonsID")|| '{}')

    //---generate image url's for the pokemons
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
    //---go to catalogue page
    onNavigate(){
      this.router.navigateByUrl('/catalogue');
    }

    //---clear all on logout
    onLogout(){
      localStorage.clear()
      sessionStorage.clear()
      this.router.navigateByUrl('/login');
  }
    //---when button is clicked, pokemon is registered and removed,
    //---page is then refreshed
    onDeleteButton(){
      let i = $("select[name='select'] option:selected").index();
      console.log(i)
      this.pokemonService.removeAPIUpdate(this.username,this.user_id, this.user_pokemons[i])

      this.reloadComponent() 
    }
    reloadComponent() {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/trainer']);
      }
    
}  