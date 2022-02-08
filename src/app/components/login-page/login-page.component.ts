import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { PokeAPIService, Pokemon } from 'src/app/services/pokeapi.service';
import { CatalogueService } from 'src/app/services/catalogue.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  username: string = "";

  @Input() login: Login | undefined;
  @Output() onUserLogin: EventEmitter<Login> = new EventEmitter()

  public users: Login[] | undefined;
  public pokemons: Array<Pokemon> = []


  constructor(private loginService: LoginService, private catalogueService: CatalogueService, private pokemonService: PokeAPIService, private router: Router) { }

  ngOnInit(): void {

    //---get pokemonlist from API
    this.pokemonService.getListOfPokemons().subscribe(
      (results: Array<Pokemon>) => {
        for (let p of results) {
          this.pokemons.push(p)
        }

        //---put in storage
        if (sessionStorage.getItem('pokemons') == null) {
            sessionStorage.setItem('pokemons', JSON.stringify(this.pokemons));

        }
        else {
          console.log("Pokemons are already set in local storage")
        }
      }
    )
    //---if user logged in -> go streight to catalogue page
    if (localStorage.getItem("current-user") != null) {
      this.catalogueService.getUserPokeList(this.username)
      this.router.navigateByUrl('/catalogue');
    }
  }

  //---when button is clicked, username is checked
  onSubmit() {
    if (this.username == "") {
      alert("Please enter a trainer name to continue...")
      return
    }
    else {
      this.onNavigate();
      }
    }
  


  onNavigate() {
    //---search for user
    //---if none is found -> add to api and register in local storage
    this.loginService.queryUser(this.username).subscribe((res: Login[]) => {
      if (res.length == 0) {
        this.loginService.setUserToApi(this.username).subscribe((res: Login[]) => {
          localStorage.setItem("current-user", JSON.stringify([res]))
          this.router.navigateByUrl('/catalogue');
        })
      }
      else {
        //---if found -> register in local storage
        this.users = res
        localStorage.setItem("current-user", JSON.stringify(this.users))
        this.catalogueService.getUserPokeList(this.username)
        this.router.navigateByUrl('/catalogue');
      }
    })

  }

}
