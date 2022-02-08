import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { TrainerPageComponent } from './components/trainer-page/trainer-page.component';
import { CataloguePageComponent } from './components/catalogue-page/catalogue-page.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { PokemonGuardService } from './components/gaurd-service/pokemon-guard.service';
import { CatalogueService } from './services/catalogue.service';
import { LoginService } from './services/login.service';
import { PokeAPIService } from './services/pokeapi.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    TrainerPageComponent,
    CataloguePageComponent,
    PageNotFoundComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [CatalogueService, LoginService, PokeAPIService, PokemonGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
