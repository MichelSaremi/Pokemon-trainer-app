import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { TrainerPageComponent } from './components/trainer-page/trainer-page.component';
import { CataloguePageComponent } from './components/catalogue-page/catalogue-page.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { PokemonGuardService } from './components/gaurd-service/pokemon-guard.service';


const routes: Routes = [
{path:'', redirectTo:'login', pathMatch:'full'},

{path: 'login', component: LoginPageComponent ,pathMatch:'full'},

{path: 'trainer', component: TrainerPageComponent,
canActivate: [PokemonGuardService]},

{path: 'catalogue', component: CataloguePageComponent,
canActivate: [PokemonGuardService]},

{path: 'notFound', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PokemonGuardService],
})
export class AppRoutingModule { }
