import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { PokeAPIService, Pokemon } from 'src/app/services/pokeapi.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  title: string = "Pokemon Trainer";
  username: string = "";
  logo: string = '../assets/images/left-poke-ball.png'

  @Input() login: Login | undefined;
  @Output() onUserLogin: EventEmitter<Login> = new EventEmitter()

  public users: Login[] | undefined;
  public pokemons: Array<Pokemon> = []


  constructor(private loginService: LoginService, private pokemonService: PokeAPIService, private router: Router) { }

  ngOnInit(): void {

    this.pokemonService.getListOfPokemonUrls().subscribe(
      (results: Array<Pokemon>) => {
        for (let p of results) {
          this.pokemons.push(p)
        }

        if (sessionStorage.getItem('pokemons') == null) {
            sessionStorage.setItem('pokemons', JSON.stringify(this.pokemons));

        }
        else {
          console.log("Pokemons are already set in local storage")
        }
      }
    )
  }

  //-- getters for user
  get user(): Login[] {

    return this.loginService.getUser()
  }

  getUser(): Login[] {
    return this.loginService.getUser();
  }

  onNavigate() {
    //---search for user
    //---if none is found add to api
    this.loginService.queryUser(this.username).subscribe((res: Login[]) => {
      if (res.length == 0) {
        this.loginService.setUserToApi(this.username).subscribe((res: Login[]) => {
          sessionStorage.setItem("current-user", JSON.stringify([res]))
          console.log("----User set to API-----")
          this.router.navigateByUrl('/trainer');
        })
      }
      else {
        //---if found register
        this.users = res
        this.username = this.users[0].username
        sessionStorage.setItem("current-user", JSON.stringify(this.users))
        console.log("----User query found -----")
        this.router.navigateByUrl('/trainer');
      }
    })

  }

  onSubmit() {
    if (this.username == "") {
      alert("Please enter a trainer name to continue...")
      return
    }
    else {
      this.onNavigate();
    }
  }

}
