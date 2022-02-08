import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "src/app/services/login.service";

@Injectable()
export class PokemonGuardService implements CanActivate {

        constructor(
                    private _loginService: LoginService,
                    private _router: Router){
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean {
        
        let activeUser = localStorage.getItem("current-user");

        if (activeUser!=null){
            return true;
        }else{
            this._router.navigate(['notFound'])
            return false;
        }


        }
    
    
    }
